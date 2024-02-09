<script setup lang='ts'>
import type { ICasinoBetRecordItem, ISportsMyBetSlipItem } from '~/apis/types'

interface ISportsDialogMyBetSlipItem extends ISportsMyBetSlipItem {
  username: string
}

interface Props {
  type: 'casino' | 'sports'
  sportsData: ISportsDialogMyBetSlipItem
  casinoData: ICasinoBetRecordItem
}
const props = defineProps<Props>()
const closeDialog = inject('closeDialog', () => { })
const betList = ref<any>([])

const { t } = useI18n()
const { openRightSidebar, rightIsExpand, currentRightSidebarContent } = useRightSidebar()
const windowStore = useWindowStore()
const { isMobile } = storeToRefs(windowStore)
const router = useLocalRouter()
const sportStore = useSportsStore()

const isCasino = computed(() => props.type === 'casino')
const isSports = computed(() => props.type === 'sports')
const betTime = computed(() => isCasino.value
  ? props.casinoData.bet_time
  : props.sportsData.bt)
const isSettled = computed(() => {
  return props.sportsData.os === 1 || betList.value.length === 0
})

function clickHandler() {
  if (!rightIsExpand.value && !isMobile.value)
    openRightSidebar(EnumRightSidebarContent.BETTING)

  else if (currentRightSidebarContent.value !== EnumRightSidebarContent.BETTING && !isMobile.value)
    openRightSidebar(EnumRightSidebarContent.BETTING)

  closeDialog()

  betList.value.forEach((item: any) => {
    if (!sportStore.cart.checkWid(item.wid))
      sportStore.cart.add(item)
  })
}

/**
 * 初始化投注列表，组合数据，过滤不可以投注的
 */
function initBetList() {
  for (const item of props.sportsData.bi) {
    const _o = item
    const infoObject: any = {
      ic: _o.ic,
      pgid: _o.pgid,
      ci: _o.ci,
      ap: _o.ap,
      hp: _o.hp,
      ed: _o.ed,
      m: _o.m,
      ei: _o.ei,
      si: _o.si,
      htn: _o.htn,
      atn: _o.atn,
    }

    const mlObject: any = {
      bt: _o.bt,
      mlid: _o.mlid,
      mll: _o.mll,
      pid: _o.pid,
      btn: _o.btn,
    }

    const msObject: any = {
      sn: _o.sn,
      hdp: _o.hdp,
      wid: _o.wid,
      ov: _o.ov,
      sid: _o.sid,
    }

    if (_o.reb === 1)
      betList.value.push(getCartObject(mlObject, msObject, infoObject))
  }
}

function openCasinoGame() {
  const { game_code, platform_id, platform_name, game_name } = props.casinoData
  router.push(`/casino/games?name=${game_name}&pn=${platform_name}&pid=${platform_id}&game_id=${game_code}`)
  closeDialog()
}

onMounted(() => {
  initBetList()
})
</script>

<template>
  <div
    class="dialog-bet-slip"
    :style="{ paddingBottom: isCasino ? 'var(--tg-spacing-16)' : '' }"
  >
    <template v-if="isSports">
      <div class="top">
        <div class="game-type">
          {{ t(type) }}
        </div>
        <!-- <div class="order-id">
        <span>ID 93,425,567</span>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-doc" />
        </BaseButton>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-link" />
        </BaseButton>
      </div> -->
        <div class="des">
          <span>{{ t('investor') }}：{{ sportsData.username }}</span><br>
          <span class="time">{{ t('on') }} {{ timeToCustomizeFormat(betTime) }}</span>
        </div>
      </div>
      <div class="sports-bottom">
        <AppSportsMyBetSlip :data="sportsData" is-dialog disable-result />
        <BaseButton v-if="!isSettled" size="md" @click="clickHandler">
          {{ t('add_one_bet', { num: betList.length }) }}
        </BaseButton>
      </div>
    </template>
    <template v-else-if="isCasino">
      <div class="top">
        <BaseButton
          type="text" size="none"
          @click="openCasinoGame"
        >
          <div class="game-type">
            {{ casinoData.game_name }}
          </div>
        </BaseButton>
        <!-- <div class="order-id">
        <span>ID 93,425,567</span>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-doc" />
        </BaseButton>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-link" />
        </BaseButton>
      </div> -->
        <div class="des">
          <span>{{ t('investor') }}：{{ casinoData.username }}</span><br>
          <span class="time">{{ t('on') }} {{ timeToCustomizeFormat(betTime) }}</span>
        </div>
      </div>
      <div class="casino-bottom">
        <div class="item">
          <label>{{ t('menu_title_settings_bets') }}:</label>
          <span>
            {{ casinoData.bet_amount }}
            <AppCurrencyIcon
              :currency-type="getCurrencyConfigByCode(casinoData.currency_id)?.name"
            />
          </span>
        </div>
        <!-- <div class="item">
        <label>{{ t('multiple_count') }}:</label>
        <span>1.00x</span>
      </div> -->
        <div class="item">
          <label>{{ t('sports_payment_amount') }}:</label>
          <span :class="{ win: +casinoData.net_amount > 0 }">
            {{ casinoData.net_amount }}
            <AppCurrencyIcon
              :currency-type="getCurrencyConfigByCode(casinoData.currency_id)?.name"
            />
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.dialog-bet-slip {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.5;

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--tg-spacing-16);

    .game-type,
    .order-id {
      font-size: var(--tg-font-size-base);
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
    }

    .order-id {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      margin-bottom: var(--tg-spacing-20);
    }

    .des {
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      text-align: center;
      font-weight: var(--tg-font-weight-semibold);

      .time {
        font-weight: var(--tg-font-weight-normal);
      }
    }
  }
}

.casino-bottom {
  width: 100%;
  background-color: var(--tg-secondary-dark);
  padding: var(--tg-spacing-12)var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    font-weight: var(--tg-font-weight-semibold);

    span {
      color: var(--tg-text-white);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--tg-spacing-4);

      &.win {
        color: var(--tg-text-green);
      }
    }
  }
}

.sports-bottom {
  width: 100%;
  background-color: var(--tg-secondary-dark);
  padding: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tg-spacing-16);
}
</style>
