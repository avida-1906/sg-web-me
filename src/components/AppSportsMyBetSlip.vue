<script setup lang='ts'>
const list = [1, 2, 3]
const data = {
  startTime: '',
  homeTeamName: '',
  awayTeamName: '',
  remark: '',
  homeTeamScore: 0,
  awayTeamScore: 0,
}
</script>

<template>
  <div class="sports-my-bet-slip">
    <div class="record">
      <div class="header">
        <span>15:40 2023/11/20</span>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-share-slip" />
        </BaseButton>
      </div>

      <div class="content">
        <!-- 盘口信息 -->
        <div class="bet-outcome-list">
          <div
            v-for="item, i in list" :key="i" class="ticket"
            :class="{ 'is-multi': list.length > 1 }"
          >
            <div class="overview">
              <div class="title-wrapper">
                <BaseButton
                  type="text" size="none"
                  style="--tg-base-button-text-default-color:var(--tg-text-white)"
                >
                  <span>华盛顿奇才 - 密尔沃基雄鹿</span>
                </BaseButton>
                <span>总得分 (包含加时)</span>
              </div>
              <div class="odds-wrapper">
                <div class="outcome-name">
                  低于242.5
                </div>
                <div class="odds">
                  2.12
                </div>
              </div>
              <div class="wrapper">
                <div class="fixture-details">
                  11月21日周二 08:00
                </div>
                <div class="icons">
                  <BaseButton type="text" size="none">
                    <BaseIcon name="uni-trend" />
                  </BaseButton>
                  <BaseButton type="text" size="none">
                    <BaseIcon name="spt-live" />
                  </BaseButton>
                  <BaseButton type="text" size="none">
                    <BaseIcon name="uni-score-board" />
                  </BaseButton>
                </div>
              </div>
            </div>
            <!-- <div class="score">
              <AppMatchStatistics :round="false" :data="data" />
            </div> -->
          </div>
        </div>
        <!-- logo分割线 -->
        <div class="hr">
          <img class="logo" draggable="false" src="https://stake.com/_app/immutable/assets/stake-dark.0aaa7847.svg">
        </div>

        <!-- 总计 -->
        <div class="total-box">
          <div class="item">
            <label>赔率</label>
            <span class="odds">2.12</span>
          </div>
          <div class="item">
            <label>投注额</label>
            <AppAmount :amount="0.000001" currency-type="BNB" />
          </div>
          <div class="item">
            <label>预计支付额</label>
            <AppAmount :amount="0.000001" currency-type="BNB" />
          </div>
        </div>
        <!-- 兑现按钮 -->
        <div class="cashout">
          <BaseButton size="md" shadow>
            提前兑现
          </BaseButton>
        </div>
      </div>
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

  &::after {
    content: "";
    position: absolute;
    left: 0;
    height: 6px;
    width: 100%;
    bottom: -4px;
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
    .score{
      margin-top: var(--tg-spacing-8);
      margin-bottom: var(--tg-spacing-2);
    }

    &.is-multi {
      &::before{
        display: flex;
        content: "";
        height: 3px;
        width: 100%;
        background: radial-gradient(circle,
            var(--tg-secondary-dark), var(--tg-secondary-dark) 50%,
            var(--tg-secondary-grey) 50%, var(--tg-secondary-grey) 100%) 1px -6px/0.7rem 0.7rem repeat-x;
      }

      &::after{
        display: flex;
        content: "";
        height: 6px;
        width: 100%;
        background: radial-gradient(circle,
        var(--tg-secondary-dark), var(--tg-secondary-dark) 50%,
        var(--tg-secondary-grey) 50%, var(--tg-secondary-grey) 100%) 1px 1px/0.7rem 0.7rem repeat-x;
      }
      &:first-of-type::before{
        display: flex;
        content: "";
        height: 0;
        width: 100%;
      }
      &:last-of-type::after{
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
  padding: var(--tg-spacing-12);

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--tg-text-white);

    .odds {
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-lightblue);
    }
  }
}

.cashout {
  grid-area: cashoutButton;
  display: flex;
  flex-direction: column;
  padding: 0 var(--tg-spacing-12);
}
</style>
