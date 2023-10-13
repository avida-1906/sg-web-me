<script setup lang='ts'>
interface Props {
  index: number
  isStandard: boolean // 标准盘或三项投注
  isLast?: boolean // 是否列表最后一个
  type: 'live' | 'upcoming' // 滚球或即将开赛
}
const props = defineProps<Props>()

const router = useRouter()
const { width } = storeToRefs(useWindowStore())
const { checkDragDialog } = useDragDialogList()
const fakeDragDialogId = Math.ceil(Math.random() * 100000)

const isH5Layout = computed(() => width.value < 575)
const isUpcoming = computed(() => props.type === 'upcoming') // 即将开赛
const baseGridAreaClass = computed(() => {
  if (isUpcoming.value) {
    if (props.isStandard)
      return isH5Layout.value ? 'grid-standard-574-coming' : 'grid-standard-normal-coming'

    return isH5Layout.value ? 'grid-three-option-574-coming' : 'grid-three-option-normal-coming'
  }
  // 滚球
  if (props.isStandard)
    return isH5Layout.value ? 'grid-standard-574' : 'grid-standard-normal'

  return isH5Layout.value ? 'grid-three-option-574' : 'grid-three-option-normal'
})
const baseGridClass = computed(() => isH5Layout.value ? 'grid-setup-574' : 'grid-setup')

// 打开实时数据或直播
function openDragDialog(type: 'trend' | 'live') {
  const dialogId = fakeDragDialogId + type
  useDragDialog({ type, url: '', dialogId })
}

// TODO: 假状态
const statusIndex = ref(Math.ceil(Math.random() * 5))
const isCountdown = computed(() => statusIndex.value === 2)
const isOnAir = computed(() => statusIndex.value === 4)
const isFinish = computed(() => statusIndex.value === 5)
const statusText = computed(() => {
  switch (statusIndex.value) {
    case 1:
      return '10月11日周三 14:30'
    case 2:
      return '开始时间： 48分钟后'
    case 3:
      return '即将开赛'
    case 4:
      return '第一盘'
    case 5:
      return ''
    default:
      return '-'
  }
})
const onBall = ref(Math.ceil(Math.random() * 2))
const onBallHome = computed(() => onBall.value === 1)
const onBallAway = computed(() => onBall.value === 2)
</script>

<template>
  <div
    class="app-sports-market-info"
    :class="[baseGridAreaClass, baseGridClass, { 'is-last': isLast }]"
  >
    <!-- 盘口状态 -->
    <div class="misc">
      <div class="wrapper">
        <div class="fixture-details">
          <!-- 状态 -->
          <div
            v-if="isOnAir || isFinish" class="status"
            :class="{ live: isOnAir, end: isFinish }"
          >
            {{ isOnAir ? '滚球' : isFinish ? '已结束' : '' }}
          </div>
          <div v-else-if="isCountdown">
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
          <span class="text">{{ statusText }}</span>

          <!-- H5时比分显示在这里 -->
          <div v-if="isH5Layout" class="fixture-score-h5">
            <!-- 局分 -->
            <span>1-4</span>
            <!-- 总分 -->
            <span class="total">0-1</span>
          </div>
        </div>
      </div>
    </div>

    <template v-if="isH5Layout">
      <!-- 队名 -->
      <div class="fixture">
        <!-- 主队名称 -->
        <div class="teams-name">
          <div v-if="onBallHome" class="icon left">
            <BaseIcon name="spt-tennis" />
          </div>
          <span>朱卡耶夫，北比特</span>
        </div>
        <span> - </span>
        <!-- 客队名称 -->
        <div class="teams-name">
          <span>李喆</span>
          <div v-if="onBallAway" class="icon right">
            <BaseIcon name="spt-tennis" />
          </div>
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
          <span>朱卡耶夫，北比特</span>
          <div v-if="onBallHome" class="icon">
            <BaseIcon name="spt-tennis" />
          </div>
        </div>
        <!-- 客队名称 -->
        <div class="teams-name">
          <span>李喆</span>
          <div v-if="onBallAway" class="icon">
            <BaseIcon name="spt-tennis" />
          </div>
        </div>
      </div>

      <!-- 滚球比分 -->
      <div class="fixture-score">
        <div class="fixture-score-wrapper">
          <div class="score-wrapper">
            <!-- 局分 -->
            <span>0</span>
            <span>6</span>
          </div>
          <!-- 总分 -->
          <div class="score-wrapper total">
            <span>2</span>
            <span>3</span>
          </div>
        </div>
        <div class="options-wrapper">
          <BaseButton
            type="text" padding0 :disabled="checkDragDialog(`${fakeDragDialogId}trend`)"
            @click="openDragDialog('trend')"
          >
            <BaseIcon name="uni-trend" />
          </BaseButton>
          <BaseButton
            type="text" padding0 :disabled="checkDragDialog(`${fakeDragDialogId}live`)"
            @click="openDragDialog('live')"
          >
            <BaseIcon name="spt-live" />
          </BaseButton>
        </div>
      </div>
    </template>

    <!-- 标准盘 -->
    <template v-if="isStandard">
      <div class="market-name" style="--area: marketName0;">
        <span>获胜</span>
      </div>
      <div class="outcomes" style="--area: outcomes0;">
        <AppSportsBetButton />
        <AppSportsBetButton />
      </div>
    </template>
    <!-- 三项投注 -->
    <template v-else>
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
        <!-- <AppSportsBetButton layout="horizontal" />
        <AppSportsBetButton layout="horizontal" /> -->
      </div>
    </template>

    <!-- 联赛分类 -->
    <div v-if="isUpcoming || (!isStandard && !isH5Layout)" class="breadcrumb">
      <BaseBreadcrumbs :list="['网球', 'ITF女子', 'ITF China 11A, Women Singles']" />
    </div>

    <!-- 更多盘口 -->
    <div class="market-count" :class="{ 'market-count-h5': isH5Layout }">
      <div v-if="isH5Layout" class="options-wrapper">
        <BaseButton type="text" padding0>
          <BaseIcon name="uni-trend" />
        </BaseButton>
        <BaseButton type="text" padding0>
          <BaseIcon name="spt-live" />
        </BaseButton>
      </div>
      <BaseButton
        class="text-btn" type="text" padding0
        @click="router.push('/sports/a/b/c/d')"
      >
        <span>+25</span>
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
