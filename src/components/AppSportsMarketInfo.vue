<script setup lang='ts'>
import type { ISportEventInfo } from '~/apis/types'

interface Props {
  index: number
  isStandard: boolean // 标准盘或三项投注
  isLast?: boolean // 是否列表最后一个
  showBreadcrumb?: boolean // 始终展示联赛数据
  data: ISportEventInfo
  baseType: string
}
const props = defineProps<Props>()

const { t } = useI18n()
const router = useRouter()
const { width } = storeToRefs(useWindowStore())
const { isLogin, currentGlobalCurrency } = storeToRefs(useAppStore())
const { checkDragDialog } = useDragDialogList()
const sportsStore = useSportsStore()
const { sportsFavoriteData } = storeToRefs(sportsStore)
/** 是否收藏 */
const { bool: isFavorite } = useBoolean(false)

/** 添加收藏 */
const { run: runAddFavorite } = useRequest(() =>
  ApiSportAddFavorite({
    si: props.data.si,
    eis: [props.data.ei],
    cur: currencyConfig[currentGlobalCurrency.value].cur,
  }),
{
  onSuccess() {
    isFavorite.value = true
    sportsStore.refreshSportsFavList()
  },
})
/** 删除收藏 */
const { run: runDelFavorite } = useRequest(() =>
  ApiSportDelFavorite({
    si: props.data.si,
    eis: [props.data.ei],
    cur: currencyConfig[currentGlobalCurrency.value].cur,
  }),
{
  onSuccess() {
    isFavorite.value = false
    sportsStore.refreshSportsFavList()
  },
})

const isH5Layout = computed(() => width.value < 575)
const baseGridAreaClass = computed(() => {
  if (props.showBreadcrumb) {
    if (props.isStandard)
      return isH5Layout.value ? 'grid-standard-574-coming' : 'grid-standard-normal-coming'

    return isH5Layout.value ? 'grid-three-option-574-coming' : 'grid-three-option-normal-coming'
  }
  if (props.isStandard)
    return isH5Layout.value ? 'grid-standard-574' : 'grid-standard-normal'

  return isH5Layout.value ? 'grid-three-option-574' : 'grid-three-option-normal'
})
const baseGridClass = computed(() => isH5Layout.value ? 'grid-setup-574' : 'grid-setup')
// 当前的盘口类型
const isHandicap = computed(() => props.baseType === EnumSportMarketType.HANDICAP)
const isTotal = computed(() => props.baseType === EnumSportMarketType.TOTAL)
// 需要展示的盘口分类
const standardMarketFiltered = computed(() => {
  if (isHandicap.value)
    return props.data.ml.filter(a => a.bt === 1)

  else if (isTotal.value)
    return props.data.ml.filter(a => a.bt === 2)

  else
    return props.data.ml.filter(a => a.bt !== 1 && a.bt !== 2)
})
const standardMarketName = computed(() => standardMarketFiltered.value[0]?.btn)
const standardMarketBtns = computed(() => {
  if (isHandicap.value) {
    return standardMarketFiltered.value[0]?.ms.map((a) => {
      return {
        title: `${a.sn} (${a.hdp})`,
        ...a,
        disabled: standardMarketFiltered.value[0].mls !== 1,
        cartInfo: getCartObject(standardMarketFiltered.value[0], a, props.data),
      }
    })
  }
  else if (isTotal.value) {
    return standardMarketFiltered.value[0]?.ms.map((a) => {
      return {
        title: `${a.sn} ${a.hdp}`,
        ...a,
        disabled: standardMarketFiltered.value[0].mls !== 1,
        cartInfo: getCartObject(standardMarketFiltered.value[0], a, props.data),
      }
    })
  }
  else {
    return standardMarketFiltered.value[0]?.ms.map((a) => {
      return {
        title: a.sn,
        ...a,
        disabled: standardMarketFiltered.value[0].mls !== 1,
        cartInfo: getCartObject(standardMarketFiltered.value[0], a, props.data),
      }
    })
  }
})
// 面包屑
const breadcrumbs = computed(() => sportsDataBreadcrumbs(props.data))
// 详情路径
const eventDetailPath = computed(() => {
  const data = props.data
  return `/sports/${SPORTS_PLAT_ID}/${data.si}/${data.pgid}/${data.ci}/${data.ei}`
})
// 一小时倒计时
const isCountdown = computed(() => {
  const startsTime = dayjs(props.data.ed * 1000)
  const resTime = startsTime.diff(dayjs(), 'minute')
  return resTime <= 60 && resTime >= 1
})
const countdownMins = computed(() => {
  const startsTime = dayjs(props.data.ed * 1000)
  return startsTime.diff(dayjs(), 'minute')
})
// 是否已经开赛
const isStarted = computed(() => dayjs().isAfter((props.data.ed * 1000)))
// 时间格式化
const timeText = computed(() => timeToSportsTimeFormat(props.data.ed))
// 正在滚球
const isOnAir = computed(() => props.data.m === 3)
// 是否有直播
const isHasliveStream = computed(() => props.data.ls === 1)

// 打开实时数据或直播
function openDragDialog(type: 'trend' | 'live') {
  const dialogId = props.data.ei + type
  useDragDialog({ type, url: '', dialogId })
}
// 联赛跳转
function onBreadcrumbsClick({ list, index }: { list: ISelectOption[]; index: number }) {
  let path = ''
  if (isH5Layout.value)
    path = `/sports/${getSportsPlatId()}/${list.map(a => a.value).join('/')}`

  else
    // eslint-disable-next-line max-len
    path = `/sports/${getSportsPlatId()}/${list.slice(0, index + 1).map(a => a.value).join('/')}`
  router.push(path)
}
// 操作收藏
function favHandler() {
  if (isFavorite.value)
    runDelFavorite()

  else
    runAddFavorite()
}
function goEventDetailPage() {
  router.push(replaceSportsPlatId(eventDetailPath.value))
}

const stop = watch(sportsFavoriteData, (a) => {
  if (a && a.list)
    isFavorite.value = a.list.findIndex(a => a.ei === props.data.ei) > -1
})

onMounted(() => {
  if (sportsFavoriteData.value && sportsFavoriteData.value.list) {
    const fl = sportsFavoriteData.value.list
    isFavorite.value = fl.findIndex(a => a.ei === props.data.ei) > -1
  }
})
onBeforeUnmount(() => {
  stop()
})
</script>

<template>
  <div
    class="app-sports-market-info" :class="[
      baseGridAreaClass, baseGridClass,
      { 'is-last': isLast },
    ]"
  >
    <!-- 盘口状态 -->
    <div class="misc">
      <div class="wrapper">
        <div class="fixture-details">
          <!-- 状态 -->
          <template v-if="isCountdown">
            <div>
              <svg height="12" width="12" viewBox="0 0 20 20" class="svelte-l8nfzs">
                <circle r="10" cx="10" cy="10" fill="#72ACED" />
                <circle
                  r="5" cx="10" cy="10" fill="transparent" stroke="#105EB4"
                  stroke-width="10.5"
                  stroke-dasharray="calc(42 * 31.4 / 100) 31.4"
                  transform="rotate(-90) translate(-20)"
                />
              </svg>
            </div>
            <span class="text">
              {{ t('sports_starts_in', { minutes: countdownMins }) }}
            </span>
          </template>
          <template v-if="isOnAir">
            <div
              class="status"
              :class="{ live: isOnAir }"
            >
              {{ t('sports_status_live') }}
            </div>
            <span class="text">{{ data.rbt }}</span>
          </template>
          <span v-if="!isStarted && !isCountdown" class="text">{{ timeText }}</span>
          <span v-else-if="isStarted && !isOnAir" class="text">
            {{ t('sports_tab_starting_soon') }}
          </span>

          <!-- H5时比分显示在这里 -->
          <div v-if="isH5Layout" class="fixture-score-h5">
            <!-- 总分 -->
            <span v-if="isOnAir" class="total">{{ data.hp }}-{{ data.ap }}</span>
          </div>
        </div>
      </div>
    </div>

    <template v-if="isH5Layout">
      <!-- 队名 -->
      <div class="fixture">
        <!-- 主队名称 -->
        <div class="teams-name">
          <BaseButton
            type="text" size="none"
            style="--tg-base-button-text-default-color:var(--tg-text-white);"
            @click="goEventDetailPage"
          >
            <span>{{ data.htn }}</span>
          </BaseButton>
        </div>
        <span> - </span>
        <!-- 客队名称 -->
        <div class="teams-name">
          <BaseButton
            type="text" size="none"
            style="--tg-base-button-text-default-color:var(--tg-text-white);"
            @click="goEventDetailPage"
          >
            <span>{{ data.atn }}</span>
          </BaseButton>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 横线 -->
      <div class="line" :class="{ 'line-bg': index > 0 }" style="grid-area: line" />
      <div class="line" :class="{ 'line-bg': index > 0 }" style=" grid-area: line2" />

      <!-- 队名 -->
      <div class="teams">
        <!-- 主队名称 -->
        <div class="teams-name">
          <BaseButton
            type="text" size="none"
            style="--tg-base-button-text-default-color:var(--tg-text-white);"
            @click="goEventDetailPage"
          >
            <span>{{ data.htn }}</span>
          </BaseButton>
        </div>
        <!-- 客队名称 -->
        <div class="teams-name">
          <BaseButton
            type="text" size="none"
            style="--tg-base-button-text-default-color:var(--tg-text-white);"
            @click="goEventDetailPage"
          >
            <span>{{ data.atn }}</span>
          </BaseButton>
        </div>
      </div>

      <!-- 滚球比分 -->
      <div class="fixture-score">
        <div class="fixture-score-wrapper">
          <!-- 总分 -->
          <div v-if="isOnAir" class="total score-wrapper">
            <span>{{ data.hp }}</span>
            <span>{{ data.ap }}</span>
          </div>
        </div>
        <div class="options-wrapper">
          <!-- <VTooltip placement="top">
            <BaseButton
              type="text" size="none"
              :disabled="checkDragDialog(`${fakeDragDialogId}trend`)"
              @click="openDragDialog('trend')"
            >
              <BaseIcon name="uni-trend" />
            </BaseButton>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ t('sports_live_trend') }}
              </div>
            </template>
          </VTooltip> -->
          <VTooltip v-if="isHasliveStream" placement="top">
            <BaseButton
              type="text" size="none"
              :disabled="checkDragDialog(`${data.ei}live`)"
              @click="openDragDialog('live')"
            >
              <BaseIcon name="spt-live" />
            </BaseButton>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ t('sports_live_tv') }}
              </div>
            </template>
          </VTooltip>
        </div>
      </div>
    </template>

    <!-- 标准盘 -->
    <template v-if="isStandard">
      <div class="market-name" style="--area: marketName0;">
        <span>{{ standardMarketName }}</span>
      </div>
      <div class="outcomes" style="--area: outcomes0;">
        <template v-if="standardMarketBtns">
          <AppSportsBetButton
            v-for="market in standardMarketBtns" :key="market.wid"
            :title="market.title" :odds="market.ov" :disabled="market.disabled"
            :cart-info="market.cartInfo"
          />
        </template>
        <AppSportsOutcomeLocked v-else />
      </div>
    </template>
    <!-- 三项投注 -->
    <!-- <template v-else>
      <div class="market-name" style="--area: marketName0;">
        <span>获胜</span>
      </div>
      <div
        class="outcomes-three" :class="{ 'outcomes-three-h5': isH5Layout }"
        style="--area: outcomes0;"
      >
        <AppSportsBetButton layout="horizontal" />
        <AppSportsBetButton layout="horizontal" />
      </div>
      <div class="market-name" style="--area: marketName1;">
        <span>2nd 盘 - 胜利</span>
      </div>
      <div
        class="outcomes-three" :class="{ 'outcomes-three-h5': isH5Layout }"
        style="--area: outcomes1;"
      >
        <AppSportsBetButton layout="horizontal" />
        <AppSportsBetButton layout="horizontal" />
      </div>
      <div class="market-name" style="--area: marketName2;">
        <span>比赛总数</span>
      </div>
      <div
        class="outcomes-three" :class="{ 'outcomes-three-h5': isH5Layout }"
        style="--area: outcomes2;"
      >
        <AppSportsOutcomeLocked />
      </div>
    </template> -->

    <!-- 联赛分类 -->
    <div v-if="showBreadcrumb || (!isStandard && !isH5Layout)" class="breadcrumb">
      <BaseBreadcrumbs
        :list="breadcrumbs" :only-last="isH5Layout"
        @item-click="onBreadcrumbsClick"
      />
    </div>

    <!-- 更多盘口 -->
    <div class="market-count" :class="{ 'market-count-h5': isH5Layout }">
      <div v-if="isH5Layout" class="options-wrapper">
        <!-- <VTooltip placement="top">
          <BaseButton
            type="text" size="none"
            :disabled="checkDragDialog(`${fakeDragDialogId}trend`)"
            @click="openDragDialog('trend')"
          >
            <BaseIcon name="uni-trend" />
          </BaseButton>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ t('sports_live_trend') }}
            </div>
          </template>
        </VTooltip> -->
        <VTooltip v-if="isHasliveStream" placement="top">
          <BaseButton
            type="text" size="none"
            :disabled="checkDragDialog(`${data.ei}live`)"
            @click="openDragDialog('live')"
          >
            <BaseIcon name="spt-live" />
          </BaseButton>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ t('sports_live_tv') }}
            </div>
          </template>
        </VTooltip>
      </div>
      <BaseButton
        class="text-btn" type="text" size="none"
        @click="goEventDetailPage"
      >
        <span>+{{ data.mc }}</span>
      </BaseButton>
      <BaseButton v-if="isLogin" type="text" size="none" @click="favHandler">
        <BaseIcon
          :name="`${isFavorite ? 'uni-favorites' : 'chess-star'}`"
        />
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-market-info {
  display: grid;
  grid-column-gap: var(--tg-spacing-8);
  grid-template-areas: var(--areas);
  align-items: center;
  width: 100%;
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);
}

.misc {
  grid-area: misc;
  display: flex;
  position: relative;
  z-index: 2;
  font-size: var(--tg-font-size-xs);

  .wrapper {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    justify-content: space-between;
    width: 100%;
    line-height: 1.3;
    white-space: nowrap;
    padding-right: var(--tg-spacing-4);

    .fixture-details {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);

      .status {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: var(--tg-font-size-xs);
        border-radius: 3px;
        padding: 0 var(--tg-spacing-4);
        font-feature-settings: "tnum";
        white-space: nowrap;
        line-height: 1.5;

        &.live {
          background: var(--tg-button-secondary-main);
          color: var(--tg-text-white);
        }

        &.end {
          color: var(--tg-text-lightgrey);
          background: var(--tg-secondary-deepdark);
        }
      }

      .fixture-score-h5 {
        display: flex;
        align-items: center;
        font-weight: var(--tg-font-weight-semibold);
        line-height: 1.5;

        .total {
          color: var(--tg-text-warn);
          margin-left: var(--tg-spacing-8);
        }
      }
    }
  }
}

.line {
  width: 100%;
  height: 2px;
}

.line-bg {
  background: var(--tg-secondary-main);
}

.teams {
  grid-area: teams;
  white-space: nowrap;
  overflow: hidden;
  display: grid;
  gap: var(--tg-spacing-8);
  align-self: center;

  .teams-name {
    color: var(--tg-text-white);
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    align-items: center;

    .icon {
      margin: 0 var(--tg-spacing-8);
      --tg-icon-color: var(--tg-text-lightblue);
    }

    span {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }
}

.fixture {
  grid-area: fixture;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  display: inline;

  .teams-name {
    display: inline-flex;
    position: relative;
    align-items: center;

    span {
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
      line-height: 1.3;
      font-size: var(--tg-font-size-default);
      cursor: pointer;
    }

    .icon {
      font-size: var(--tg-font-size-xs);
      display: flex;
      align-items: center;
      --tg-icon-color: var(--tg-text-lightblue);
    }

    .left {
      margin-right: var(--tg-spacing-8);
    }

    .right {
      margin-left: var(--tg-spacing-8);
    }
  }
}

.fixture-score {
  grid-area: fixtureScore;
  display: flex;
  justify-content: flex-end;
  margin-right: var(--tg-spacing-8);

  .fixture-score-wrapper {
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    justify-content: flex-end;

    .score-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 2ch;
      padding-top: 1px;
      gap: var(--tg-spacing-12);
    }

    .total {
      color: var(--tg-text-warn);
      margin-left: var(--tg-spacing-8);
    }
  }

  .options-wrapper {
    margin-left: var(--tg-spacing-16);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--tg-spacing-12);
  }
}

.market-name {
  width: 100%;
  grid-area: var(--area);
  z-index: 2;
  position: relative;
  padding: 0 var(--tg-spacing-8);
  align-items: center;
  background: var(--tg-secondary-gre);
  text-align: center;
  line-height: 1.5;
  font-size: var(--tg-font-size-xs);

  span {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inherit;
  }
}

.outcomes {
  place-items: center;
  width: 100%;
  grid-area: var(--area);
  display: grid;
  grid-gap: var(--tg-spacing-8) var(--tg-spacing-8);
  grid-template-rows: 1fr;
  align-self: stretch;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

.outcomes-three {
  place-items: center;
  width: 100%;
  height: 100%;
  grid-area: var(--area);
  grid-gap: var(--tg-spacing-8) var(--tg-spacing-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.outcomes-three-h5 {
  place-items: center;
  width: 100%;
  grid-area: var(--area);
  display: grid;
  grid-gap: var(--tg-spacing-8) var(--tg-spacing-8);
  grid-template-rows: 1fr;
  align-self: stretch;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

.breadcrumb {
  grid-area: breadcrumb;
  overflow: hidden;
}

.market-count {
  grid-area: marketCount;
  justify-self: center;
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-12);
}

.market-count-h5 {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: flex-end;

  .text-btn {
    margin-left: var(--tg-spacing-12);
  }

  .options-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--tg-spacing-12);
  }
}

.grid-setup-574 {
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-template-rows: 1fr auto;
  grid-row-gap: var(--tg-spacing-4);
  border-bottom: 2px solid var(--tg-secondary-main);
  padding: var(--tg-spacing-12) var(--tg-spacing-20);

  &.is-last {
    border: none;
  }
}

.grid-setup {
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
  row-gap: var(--tg-spacing-8);
}

// 滚球
.grid-standard-574 {
  --areas:
    'misc misc marketCount marketCount marketCount marketCount'
    'fixture fixture fixture fixture fixture fixture'
    'marketName0 marketName0 marketName0 marketName0 marketName0 marketName0'
    'outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
    'outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0';
  --column-count: 6;
}

.grid-three-option-574 {
  --areas:
    'misc misc marketCount marketCount marketCount marketCount'
    'fixture fixture fixture fixture fixture fixture'
    'marketName0 marketName0 marketName0 marketName0 marketName0 marketName0'
    'outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
    'outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
    'marketName1 marketName1 marketName1 marketName1 marketName1 marketName1'
    'outcomes1 outcomes1 outcomes1 outcomes1 outcomes1 outcomes1'
    'outcomes1 outcomes1 outcomes1 outcomes1 outcomes1 outcomes1'
    'marketName2 marketName2 marketName2 marketName2 marketName2 marketName2'
    'outcomes2 outcomes2 outcomes2 outcomes2 outcomes2 outcomes2'
    'outcomes2 outcomes2 outcomes2 outcomes2 outcomes2 outcomes2';
  --column-count: 6;
}

.grid-standard-normal {
  --areas:
    'misc misc line line line line marketName0 marketName0 marketName0 marketName0 line2 line2'
    'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount'
    'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount';
  --column-count: 12;
}

.grid-three-option-normal {
  --areas:
    'misc misc line line line line line marketName0 marketName0 marketName0 marketName1 marketName1 marketName1 marketName2 marketName2 marketName2 line2'
    'teams teams teams teams fixtureScore fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes1 outcomes1 outcomes1 outcomes2 outcomes2 outcomes2 marketCount'
    'teams teams teams teams fixtureScore fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes1 outcomes1 outcomes1 outcomes2 outcomes2 outcomes2 marketCount'
    'breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb outcomes0 outcomes0 outcomes0 outcomes1 outcomes1 outcomes1 outcomes2 outcomes2 outcomes2 marketCount';
  --column-count: 17;
}

// 即将开赛
.grid-standard-574-coming {
  --areas:
    'misc misc marketCount marketCount marketCount marketCount'
    'fixture fixture fixture fixture fixture fixture'
    'breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb'
    ' marketName0 marketName0 marketName0 marketName0 marketName0 marketName0'
    ' outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
    ' outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0';
  --column-count: 6;
}

.grid-standard-normal-coming {
  --areas:
    'misc misc line line line line marketName0 marketName0 marketName0 marketName0 line2 line2'
    'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount'
    'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount'
    'breadcrumb breadcrumb breadcrumb fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount';
  --column-count: 12;
}

.grid-three-option-574-coming {
  --areas:
    'misc misc marketCount marketCount marketCount marketCount'
    'fixture fixture fixture fixture fixture fixture'
    'breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb'
    ' marketName0 marketName0 marketName0 marketName0 marketName0 marketName0'
    ' outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
    ' outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
    ' marketName1 marketName1 marketName1 marketName1 marketName1 marketName1'
    ' outcomes1 outcomes1 outcomes1 outcomes1 outcomes1 outcomes1'
    ' outcomes1 outcomes1 outcomes1 outcomes1 outcomes1 outcomes1'
    ' marketName2 marketName2 marketName2 marketName2 marketName2 marketName2'
    ' outcomes2 outcomes2 outcomes2 outcomes2 outcomes2 outcomes2'
    ' outcomes2 outcomes2 outcomes2 outcomes2 outcomes2 outcomes2';
  --column-count: 6;
}

.grid-three-option-normal-coming {
  --areas:
    'misc misc line line line line line marketName0 marketName0 marketName0 marketName1 marketName1 marketName1 marketName2 marketName2 marketName2 line2'
    'teams teams teams teams fixtureScore fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes1 outcomes1 outcomes1 outcomes2 outcomes2 outcomes2 marketCount'
    'teams teams teams teams fixtureScore fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes1 outcomes1 outcomes1 outcomes2 outcomes2 outcomes2 marketCount'
    'breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb outcomes0 outcomes0 outcomes0 outcomes1 outcomes1 outcomes1 outcomes2 outcomes2 outcomes2 marketCount';
  --column-count: 17;
}
</style>
