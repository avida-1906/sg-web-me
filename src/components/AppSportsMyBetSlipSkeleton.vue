<script setup lang='ts'>
const props = defineProps<{
  settle: number
}>()

const { t } = useI18n()

const isSettled = computed(() => props.settle === 1) // 已结算
</script>

<template>
  <div class="sports-my-bet-slip">
    <div class="record">
      <div class="header">
        <div class="left">
          <BaseSkeleton width="128px" height="14px" />
        </div>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-share-slip" />
        </BaseButton>
      </div>

      <div class="content">
        <!-- 盘口信息 -->
        <div class="bet-outcome-list">
          <div class="ticket">
            <div class="overview">
              <div class="title-wrapper">
                <BaseSkeleton width="155px" height="14px" />
                <BaseSkeleton width="102px" height="14px" />
              </div>
              <div class="odds-wrapper">
                <div class="outcome-name">
                  <BaseSkeleton width="120px" height="14px" />
                </div>
                <div class="odds">
                  <BaseSkeleton width="34px" height="14px" />
                </div>
              </div>
              <div class="wrapper">
                <div class="fixture-details">
                  <BaseSkeleton width="51px" height="14px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- logo分割线 -->
        <div class="hr">
          <BaseLogo mode="dark" />
        </div>
        <!-- 总计 -->
        <div class="total-box">
          <div class="item">
            <label>{{ t('sports_odds_title') }}</label>
            <BaseSkeleton width="34px" height="14px" />
          </div>
          <div class="item">
            <label>{{ t('bet_amount') }}</label>
            <BaseSkeleton width="85px" height="14px" />
          </div>
          <div class="item">
            <label>
              {{ isSettled ? t('sports_payment_amount')
                : t('sports_estimated_payment_amount') }}
            </label>
            <BaseSkeleton width="85px" height="14px" />
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
