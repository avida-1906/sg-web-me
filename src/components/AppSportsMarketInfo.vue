<script setup lang='ts'>
interface Props {
  index: number
}
defineProps<Props>()

const { width } = storeToRefs(useWindowStore())
const isStandard = ref(true) // 标准盘或三项投注
const isUpcoming = ref(true)

const isH5Layout = computed(() => width.value < 575)
const baseGridAreaClass = computed(() => {
  if (isStandard.value)
    return isH5Layout.value ? 'grid-standard-574' : 'grid-standard-normal'

  return isH5Layout.value ? 'grid-three-option-574' : 'grid-three-option-normal'
})
const baseGridClass = computed(() => isH5Layout.value ? 'grid-setup-574' : 'grid-setup')
</script>

<template>
  <div class="app-sports-market-info" :class="[baseGridAreaClass, baseGridClass]">
    <!-- 盘口状态 -->
    <div class="misc">
      <div class="wrapper">
        <div class="fixture-details">
          <!-- TODO：有5种状态 -->
          <div class="status live">
            滚球
          </div>
          <span class="text">第二盘</span>
        </div>
      </div>
    </div>
    <!-- 横线 -->
    <div class="line" style="grid-area: line" />
    <div class="line" style=" grid-area: line2" />
    <!-- 队名 -->
    <div class="teams">
      <!-- 主队名称 -->
      <div class="teams-name">
        <span>洛杉矶湖人</span>
        <div class="icon">
          <BaseIcon name="spt-tennis" />
        </div>
      </div>
      <!-- 客队名称 -->
      <div class="teams-name">
        <span>波士顿凯尔特人</span>
        <div class="icon">
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
        <BaseButton type="text" padding0>
          <BaseIcon name="uni-trend" />
        </BaseButton>
        <BaseButton type="text" padding0>
          <BaseIcon name="spt-live" />
        </BaseButton>
      </div>
    </div>
    <!-- 盘口名称 -->
    <div class="market-name" style="--area: marketName0;">
      <span>获胜</span>
    </div>
    <!-- 下注按钮 -->
    <div class="outcomes">
      <AppSportsBetButton />
      <AppSportsBetButton />
    </div>
    <!-- 更多盘口 -->
    <div class="market-count">
      <BaseButton type="text">
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
      }

      .live {
        background: var(--tg-button-secondary-main);
        color: var(--tg-text-white);
      }

      .end {
        color: var(--tg-text-lightgrey);
        background: var(--tg-secondary-deepdark);
      }
    }
  }
}

.line {
  background: var(--tg-secondary-main);
  width: 100%;
  height: 2px;
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
  --area: outcomes0;
}

.market-count {
  grid-area: marketCount;
  justify-self: center;
}

.grid-setup-574 {
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-template-rows: 1fr auto;
  grid-row-gap: var(--tg-spacing-4);
  border-bottom: 2px solid var(--tg-secondary-main);
  padding: var(--tg-spacing-12) var(--tg-spacing-20);
}

.grid-setup {
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
  row-gap: var(--tg-spacing-8);
}

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
</style>
