<script setup lang='ts'>
import type { IBasePanelType } from '~/types'
import type { ISportsMyBetSlipItem } from '~/apis/types'

type ISportsMyBetSlipItemWithShowRe = {
  [K in keyof ISportsMyBetSlipItem]: K extends 'bi' ? Array<{
    showResult: boolean
    result: IBasePanelType
    betMarketName: string
  } & ISportsMyBetSlipItem['bi'][number]> : ISportsMyBetSlipItem[K];
}
type ISportsMyBetSlipItemBi = ISportsMyBetSlipItemWithShowRe['bi'][number]
interface Props {
  data: ISportsMyBetSlipItem
  isDialog?: boolean
  /**
   * @description 是否隐藏赛果
   */
  disableResult?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disableResult: false,
})

const { t } = useI18n()
const { currentGlobalCurrency } = storeToRefs(useAppStore())
const { userInfo } = storeToRefs(useAppStore())
const sportsStore = useSportsStore()
const { openBetSlipDialog } = useDialogBetSlip()
// const router = useLocalRouter()

const betSlipStatusText: { [t: number]: string } = {
  2: t('dealing'),
  3: t('reject'),
  4: t('cancel'),
}
const settledStatus: { [t: number]: string } = {
  0: t('sports_active'),
  1: t('win_label'),
  2: t('lose'),
  3: t('sports_status_tie'),
  4: t('sports_status_win_half'),
  5: t('sports_status_lose_half'),
  6: t('sports_status_lose_part'),
}
/** 添加开关赛果 */
const slipData = ref<ISportsMyBetSlipItemWithShowRe>(addShowResult(props.data))

const list = computed(() => slipData.value.bi)
const isNotSettled = computed(() => slipData.value.os === 0) // 未结算
const isSettled = computed(() => slipData.value.os === 1) // 已结算
const statusText = computed(() => {
  if (isSettled.value)
    return settledStatus[slipData.value.oc]
  return betSlipStatusText[slipData.value.os]
})
const statusClass = computed(() => {
  if (isSettled.value)
    return slipData.value.oc === 1 || slipData.value.oc === 3 ? 'green' : 'grey'
  return 'grey'
})

/**
 * 跳转详情，先不要，等后端关盘的赛事查询详情再说
 */
function goEventDetailPage(data: ISportsMyBetSlipItemBi) {
  // router.push(replaceSportsPlatId(`/sports/${SPORTS_PLAT_ID}/${data.si}/${data.pgid ?? 0}/${data.ci ?? 0}/${data.ei}`))
}

// 是否已经开赛
function checkIsStarted(ts: number) {
  return dayjs().isAfter((ts * 1000))
}

function addShowResult(origin: ISportsMyBetSlipItem) {
  const copyData = cloneDeep(origin)
  copyData.bi = copyData.bi.map((a: ISportsMyBetSlipItemBi) => {
    return {
      ...a,
      showResult: false,
      result: {
        startTime: timeToDateWithDayFormat(a.ed),
        homeTeamName: a.htn,
        awayTeamName: a.atn,
        remark: '',
        homeTeamScore: a.hp,
        awayTeamScore: a.ap,
        atpic: a.atpic,
        htpic: a.htpic,
        spic: a.spic,
        si: a.si,
        pol: a.pol,
      },
      betMarketName: makeMarketInfo(a),
    }
  })
  return copyData
}
function makeMarketInfo(item: ISportsMyBetSlipItemBi) {
  switch (item.bt) {
    case 1:
      return item.sn.includes(item.hdp) ? item.sn : `${item.sn} (${item.hdp})`
    case 2:
      return item.sn.includes(item.hdp) ? item.sn : `${item.sn} ${item.hdp}`
    default:
      return item.sn
  }
}
function showDetail() {
  openBetSlipDialog({ type: 'sports', data: { ...props.data, username: userInfo.value?.username } })
}
</script>

<template>
  <div class="sports-my-bet-slip">
    <div class="record">
      <div class="header">
        <div class="left">
          <div v-if="!isNotSettled" class="status" :class="[statusClass]">
            {{ statusText }}
          </div>
          <span>{{ timeToCustomizeFormat(slipData.bt) }}</span>
        </div>
        <BaseButton v-if="!isDialog" type="text" size="none" @click="showDetail">
          <BaseIcon name="uni-share-slip" />
        </BaseButton>
      </div>

      <!-- <pre>
        {{ data }}
      </pre> -->

      <div class="content">
        <!-- 盘口信息 -->
        <div class="bet-outcome-list">
          <div
            v-for="item in list"
            :key="item.sn + item.hdp + item.ov" class="ticket"
            :class="{ 'is-multi': list.length > 1 }"
          >
            <div class="overview">
              <div class="title-wrapper">
                <BaseButton
                  type="text" size="none"
                  style="--tg-base-button-text-default-color:var(--tg-text-white)"
                  @click="goEventDetailPage(item)"
                >
                  <div v-if="isDialog" class="icon">
                    <AppImage
                      is-cloud
                      :url="sportsStore.getSportsIconBySi(item.si)"
                    />
                  </div>
                  <div class="team-name-wrap">
                    <span v-if="item.et === 1" class="team-name">
                      {{ item.htn }} - {{ item.atn }}
                    </span>
                    <span v-else-if="item.et === 2" class="team-name">{{ item.cn }}</span>
                  </div>
                </BaseButton>
                <span>{{ item.btn }}</span>
              </div>
              <div class="odds-wrapper">
                <div class="outcome-name">
                  {{ item.betMarketName }}
                </div>
                <div class="odds">
                  {{ item.ov }}
                </div>
              </div>
              <div class="wrapper">
                <div class="fixture-details">
                  <span v-if="isSettled" style="color:var( --tg-text-warn)">
                    {{ item.hp }} - {{ item.ap }}
                  </span>
                  <span v-else-if="!checkIsStarted(item.ed)">
                    {{ timeToDateWithDayFormat(item.ed) }}
                  </span>
                </div>
                <div class="icons">
                  <!-- <BaseButton type="text" size="none">
                    <BaseIcon name="uni-trend" />
                  </BaseButton>
                  <BaseButton type="text" size="none">
                    <BaseIcon name="spt-live" />
                  </BaseButton> -->
                  <VTooltip placement="top" :triggers="['hover']">
                    <BaseButton
                      v-if="!props.disableResult"
                      type="text"
                      size="none" @click="item.showResult = !item.showResult"
                    >
                      <BaseIcon name="uni-score-board" />
                    </BaseButton>
                    <template #popper>
                      <div class="tiny-menu-item-title">
                        {{ t('score') }}
                      </div>
                    </template>
                  </VTooltip>
                </div>
              </div>
            </div>

            <div class="score">
              <AppMatchStatistics
                v-show="item.showResult" :round="false"
                :data="item.result" :show-skeleton="item.m === 100"
                style="--tg-app-match-statistics-max-width:100%;"
              />
            </div>
          </div>
        </div>
        <!-- logo分割线 -->
        <div class="hr">
          <BaseLogo :mode="!isDialog ? 'dark' : 'light'" />
        </div>
        <!-- 总计 -->
        <div class="total-box">
          <div class="item">
            <label>{{ t('sports_odds_title') }}</label>
            <span class="odds">{{ slipData.ov }}</span>
          </div>
          <div class="item">
            <label>{{ t('bet_amount') }}</label>
            <AppAmount
              :amount="application.sliceOrPad(
                slipData.a,
                application.getCurrencySuffixLength(currentGlobalCurrency),
              )"
              :currency-type="currentGlobalCurrency"
            />
          </div>
          <div class="item">
            <label>
              {{ isSettled ? t('sports_payment_amount')
                : t('sports_estimated_payment_amount') }}
            </label>
            <AppAmount
              :amount="application.sliceOrPad(
                isSettled ? slipData.pa > 0 ? slipData.pa : 0 : slipData.mwa,
                application.getCurrencySuffixLength(currentGlobalCurrency),
              )"
              :currency-type="currentGlobalCurrency"
            />
          </div>
        </div>
      </div>
      <div class="decorate" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sports-my-bet-slip {
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
}

.record {
  position: relative;
  color: var(--tg-text-lightgrey);
  flex-shrink: 0;
  display: flex;
  background: var(--tg-primary-main);
  border-radius: var(--tg-radius-default);
  font-size: var(--tg-font-size-default);
  flex-direction: column;
  width: 100%;
  .decorate{
    transform: translateY(-1px);
    height: 6px;
    width: 100%;
    background:
      radial-gradient(circle, transparent, transparent 50%,
        var(--tg-secondary-grey) 50%,
        var(--tg-secondary-grey) 100%) 0px 1px/0.7rem 0.7rem repeat-x;
  }

}

.header {
  position: relative;
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--tg-secondary-main);
  padding: var(--tg-spacing-8) var(--tg-spacing-12);
  border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;

  .left {
    .status {
      font-size: var(--tg-font-size-xs);
      display: inline-flex;
      font-weight: 600;
      align-items: center;
      justify-content: center;
      color: var(--tg-text-lightgrey);
      border-radius: 3px;
      padding: 0 var(--tg-spacing-4);
      font-feature-settings: "tnum";
      white-space: nowrap;
      line-height: 1.5;
      margin-right: var(--tg-spacing-8);
      color: var(--tg-text-grey-deep);
      &.green{
        background-color: var(--tg-text-green);
      }
      &.grey{
        background-color: var(--tg-secondary-light);
      }
    }
  }
}

.content {
  display: grid;
  width: 100%;
  grid-auto-rows: auto;
  color: var(--tg-text-lightgrey);
  align-items: center;
  box-shadow: var(--tg-header-shadow);
  background: var(--tg-secondary-grey);
  padding: 0;
  padding-bottom: var(--tg-spacing-8);
  border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);
  z-index: 1;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
    'betOutcomeList betOutcomeList betOutcomeList betOutcomeList betOutcomeList betOutcomeList'
    "line line line line line line"
    "total total total total total total"
    "total total total total total total"
    "total total total total total total"
    "cashoutButton cashoutButton cashoutButton cashoutButton cashoutButton cashoutButton";
}

.bet-outcome-list {
  display: flex;
  flex-direction: column;
  grid-area: betOutcomeList;
  width: 100%;

  .ticket {
    position: relative;
    background: var(--tg-secondary-grey);

    .overview {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: var(--tg-spacing-8) var(--tg-spacing-12);

      .title-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--tg-spacing-4);
        max-width: 100%;
        .team-name-wrap{
          flex: 1;
          display: flex;
          justify-content: flex-start;
          .team-name{
            text-align: left;
            word-break: break-all;
          }
        }
        .icon{
          width: 14px;
          height: 14px;
          margin-right: var(--tg-spacing-8);
        }
      }

      .odds-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-weight: var(--tg-font-weight-semibold);
        color: var(--tg-text-white);
      }

      .wrapper {
        display: flex;
        align-items: center;
        text-transform: capitalize;
        justify-content: space-between;
        width: 100%;
        line-height: 1.3;

        .icons {
          margin-left: var(--tg-spacing-8);
          display: flex;
          gap: var(--tg-spacing-16);
          align-items: center;
        }
      }
    }

    .score {
      margin-top: var(--tg-spacing-8);
      margin-bottom: var(--tg-spacing-2);
    }

    &.is-multi {
      &::before {
        display: flex;
        content: "";
        height: 3px;
        width: 100%;
        background: radial-gradient(circle,
            var(--tg-secondary-dark), var(--tg-secondary-dark) 50%,
            var(--tg-secondary-grey) 50%, var(--tg-secondary-grey) 100%) 1px -6px/0.7rem 0.7rem repeat-x;
      }

      &::after {
        display: flex;
        content: "";
        height: 6px;
        width: 100%;
        background: radial-gradient(circle,
            var(--tg-secondary-dark), var(--tg-secondary-dark) 50%,
            var(--tg-secondary-grey) 50%, var(--tg-secondary-grey) 100%) 1px 1px/0.7rem 0.7rem repeat-x;
      }

      &:first-of-type::before {
        display: flex;
        content: "";
        height: 0;
        width: 100%;
      }

      &:last-of-type::after {
        display: flex;
        content: "";
        height: 0;
        width: 100%;
      }
    }
  }
}

.hr {
  width: 100%;
  grid-area: line;
  padding: var(--tg-spacing-12) 0;
  position: relative;
  overflow: visible;
  display: flex;
  justify-items: space-between;
  align-items: center;
  gap: var(--tg-spacing-16);

  .logo {
    max-width: 70px;
  }

  &::before {
    content: "";
    height: 3px;
    flex-grow: 1;
    background: var(--tg-secondary-main);
  }

  &::after {
    content: "";
    height: 3px;
    flex-grow: 1;
    background: var(--tg-secondary-main);
  }
}

.total-box {
  grid-area: total;
  width: 100%;
  padding: 0 var(--tg-spacing-12);

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--tg-text-white);
    label{
      color: var(--tg-text-lightgrey);
    }

    .odds {
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-lightblue);
    }
  }
}
</style>
