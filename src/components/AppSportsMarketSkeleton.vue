<script setup lang='ts'>
interface Props {
  num?: number
}
withDefaults(defineProps<Props>(), {
  num: 1,
})

const { width } = storeToRefs(useWindowStore())

const isH5Layout = computed(() => width.value < 575)
const baseGridAreaClass = computed(() => {
  return isH5Layout.value ? 'grid-standard-574' : 'grid-standard-normal'
})
const baseGridClass = computed(() => isH5Layout.value ? 'grid-setup-574' : 'grid-setup')
</script>

<template>
  <div
    class="base-secondary-accordion is-open level-2"
  >
    <div class="no-active-scale header">
      <BaseSkeleton animated="ani-opacity" width="120px" height="21px" />
      <div class="arrow down">
        <BaseIcon name="uni-stake-arrow-down" />
      </div>
    </div>
    <div class="is-open content">
      <div
        v-for="i, index in num" :key="i"
        class="app-sports-market-info" :class="[
          baseGridAreaClass, baseGridClass,
        ]"
      >
        <!-- 盘口状态 -->
        <div class="misc">
          <div class="wrapper">
            <div class="fixture-details">
              <BaseSkeleton animated="ani-opacity" width="130px" height="18px" />
            </div>
          </div>
        </div>

        <template v-if="isH5Layout">
          <!-- 队名 -->
          <div class="fixture">
            <BaseSkeleton animated="ani-opacity" width="100px" height="18px" />
          </div>
        </template>
        <template v-else>
          <!-- 横线 -->
          <div class="line" :class="{ 'line-bg': index > 0 }" style="grid-area: line" />
          <div class="line" :class="{ 'line-bg': index > 0 }" style=" grid-area: line2" />

          <!-- 队名 -->
          <div class="teams">
            <!-- 主队名称 -->
            <BaseSkeleton animated="ani-opacity" width="80px" height="18px" />
            <BaseSkeleton animated="ani-opacity" width="80px" height="18px" />
          </div>

          <!-- 滚球比分 -->
          <div class="fixture-score">
            <div class="fixture-score-wrapper">
              <!-- 总分 -->
              <div class="total score-wrapper">
                <BaseSkeleton animated="ani-opacity" width="20px" height="16px" />
                <BaseSkeleton animated="ani-opacity" width="20px" height="16px" />
              </div>
            </div>
            <div class="options-wrapper">
              <BaseSkeleton animated="ani-opacity" width="20px" height="16px" />
              <BaseSkeleton animated="ani-opacity" width="20px" height="16px" />
            </div>
          </div>
        </template>

        <!-- 标准盘 -->
        <div class="market-name" style="--area: marketName0;">
          <BaseSkeleton animated="ani-opacity" width="60px" height="14px" />
        </div>
        <div class="outcomes" style="--area: outcomes0;">
          <div class="bet-button">
            <BaseSkeleton animated="ani-opacity" width="60px" height="14px" />
            <BaseSkeleton animated="ani-opacity" width="30px" height="14px" />
          </div>
          <div class="bet-button">
            <BaseSkeleton animated="ani-opacity" width="60px" height="14px" />
            <BaseSkeleton animated="ani-opacity" width="30px" height="14px" />
          </div>
        </div>

        <!-- 更多盘口 -->
        <div class="market-count" :class="{ 'market-count-h5': isH5Layout }">
          <div v-if="isH5Layout" class="options-wrapper">
            <BaseSkeleton animated="ani-opacity" width="20px" height="16px" />
            <BaseSkeleton animated="ani-opacity" width="20px" height="16px" />
          </div>
          <BaseSkeleton v-else animated="ani-opacity" width="20px" height="16px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
:root {
  --tg-secondaryAccordion-header-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-header-title-color: var(--tg-text-grey-light);
  --tg-secondaryAccordion-content-background: var(--tg-secondary-grey);
  --tg-secondaryAccordion-content-border-color: var(--tg-secondary-main);
}
</style>

<style lang="scss" scoped>
.base-secondary-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 0;
  box-shadow: var(--tg-box-shadow), var(--tg-shadow-inset);
  border-radius: var(--tg-radius-default);
  background: var(--header-background);
  --header-background: var(--tg-secondaryAccordion-header-background);
  --title-color: var(--tg-secondaryAccordion-header-title-color);
  --content-background: var(--tg-secondaryAccordion-content-background);
  --content-border: var(--tg-secondaryAccordion-content-border-color);

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-base);
    width: var(--tg-spacing-18);
    height: var(--tg-spacing-18);
    transition: all ease .25s;
    --tg-icon-color: var(--tg-text-lightgrey);
    &.down{
      transform: rotate(90deg);
    }
  }
  .header {
    width: 100%;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--tg-spacing-12) var(--tg-spacing-16);
    cursor: pointer;
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
  }
  .content {
    background: var(--content-background);
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);
    border-top: 2px solid var(--content-border);
  }
}

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
      .count-time{
        display: inline-block;
        width: 4.5ch;
        font-size: var(--tg-font-size-default);
        color: var(--tg-text-white);
      }

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
}

.fixture {
  grid-area: fixture;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  display: inline;
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

  .options-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--tg-spacing-6);
  }
}

.grid-setup-574 {
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-template-rows: 1fr auto;
  grid-row-gap: var(--tg-spacing-8);
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

.grid-standard-574 {
  --areas:
    'misc misc marketCount marketCount marketCount marketCount'
    'fixture fixture fixture fixture fixture fixture'
    'marketName0 marketName0 marketName0 marketName0 marketName0 marketName0'
    'outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0'
    'outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0';
  --column-count: 6;
}
.grid-standard-normal {
  --areas:
    'misc misc line line line line marketName0 marketName0 marketName0 marketName0 line2 line2'
    'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount'
    'teams teams teams fixtureScore fixtureScore outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 outcomes0 marketCount';
  --column-count: 12;
}

.bet-button {
  background: var(--tg-secondary-deepdark);
  border-radius: var(--tg-radius-default);
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--tg-spacing-4);
  padding: 0.5em 0.75em;
}
</style>
