<script setup lang='ts'>
import { EnumsBetSlipTabs } from '~/utils/enums'

interface Props {
  index: number
  betSlipType: EnumsBetSlipTabs.single | EnumsBetSlipTabs.multi
  error?: boolean
  disabled?: boolean
  isClosed?: boolean
  isLive?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  index: 0,
  betSlipType: EnumsBetSlipTabs.single,
})

const isBetSingle = computed(() =>
  props.betSlipType === EnumsBetSlipTabs.single)
const isBetMulti = computed(() => props.betSlipType === EnumsBetSlipTabs.multi)
const isFirst = computed(() => props.index === 0)
</script>

<template>
  <div v-if="isBetSingle && index === 1" class="duplicate-bet mt12">
    重复下注
  </div>
  <div
    class="app-sports-bet-slip" :class="{
      mt12: !isFirst && isBetSingle,
      mt8: !isFirst && isBetMulti,
      before: !isFirst && isBetMulti,
      error,
      disabled,
    }"
  >
    <div class="header" :class="{ 'round-header': isFirst || isBetSingle }">
      <div class="fixture-name">
        <div v-if="isLive" class="status live">
          滚球
        </div>
        <div class="text">
          深圳市足球俱乐部 - 长春亚泰
        </div>
      </div>
      <BaseButton type="text" padding0>
        <BaseIcon name="uni-close" />
      </BaseButton>
    </div>
    <div class="content">
      <!-- 盘口类型 -->
      <div class="market-name">
        获胜
      </div>
      <!-- 最大下注金额 -->
      <div class="max-bet" />
      <!-- 下注盘口 -->
      <div class="outcome-name">
        <span>Sprynar, Pavel</span>
      </div>
      <!-- 状态或赔率 -->
      <div v-if="isClosed" class="closed">
        已结算
      </div>
      <AppSportsOdds v-else odds="2.35" arrow="left" />
      <!-- 单式金额输入框 -->
      <div v-show="isBetSingle" class="footer">
        <div class="bet-amount">
          <BaseInput
            type="number"
            placeholder="0.00000000"
            mb0
            :disabled="disabled"
          >
            <template #right-icon>
              <BaseIcon name="coin-btc" />
            </template>
          </BaseInput>
        </div>
        <div class="estimated-label">
          <span>预计支付金额</span>
        </div>
        <div class="estimated-amount">
          <AppAmount
            style="--tg-app-amount-width:12ch;"
            amount="289339339.05000001" currency-type="BTC"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-bet-slip {
  position: relative;
  color: var(--tg-text-lightgrey);
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--tg-primary-main);
  border-radius: var(--tg-radius-default);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);

  .header {
    position: relative;
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--tg-secondary-main);
    padding: var(--tg-spacing-8) var(--tg-spacing-12);

    .fixture-name {
      width: 100%;
      max-width: calc(100% - var(--tg-spacing-48));
      display: inline-flex;
      align-items: center;
      gap: var(--tg-spacing-8);

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

        &.live {
          background: var(--tg-button-secondary-main);
          color: var(--tg-text-white);
        }
      }

      .text {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        transition: var(--tg-transition);

        &:active:not(:disabled) {
          color: var(--tg-text-white);
          transform: scale(0.96);
        }

        &:hover:not(:disabled) {
          color: var(--tg-text-white);
        }
      }
    }
  }

  .round-header {
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
  }

  .content {
    width: 100%;
    flex-shrink: 0;
    display: grid;
    align-items: flex-end;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: auto;
    position: relative;
    padding: var(--tg-spacing-8) var(--tg-spacing-12) var(--tg-spacing-12);
    box-shadow: var(--tg-header-shadow);
    background: var(--tg-secondary-grey);
    grid-template-areas:
      "market market market market maxBet maxBet"
      "outcome outcome outcome outcome outcome odds"
      "footer footer footer footer footer footer"
      "footer footer footer footer footer footer";

    .market-name {
      grid-area: market;
      line-height: 1.5;
      font-weight: var(--tg-font-weight-normal);
    }

    .max-bet {
      grid-area: maxBet;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      font-weight: var(--tg-font-weight-normal);
    }

    .outcome-name {
      font-weight: 600;
      color: var(--tg-text-white);
      display: inline-flex;
      grid-area: outcome;
      text-transform: capitalize;
      align-items: baseline;
      line-height: 1.5;

      span {
        text-align: left;
        display: inline-flex;
        align-items: center;
      }
    }

    .closed {
      justify-self: flex-end;
      color: var(--tg-text-error);
    }

    .footer {
      display: grid;
      grid-area: footer;
      grid-template-columns: repeat(6, 1fr);
      margin-top: var(--tg-spacing-4);
      grid-template-areas:
        "amount amount amount return return return"
        "amount amount amount estimatedAmount estimatedAmount estimatedAmount";

      .bet-amount {
        display: flex;
        grid-area: amount;
      }

      .estimated-label {
        grid-area: return;
        justify-self: flex-end;
        align-self: flex-start;
        font-size: var(--tg-font-size-xs);
        line-height: 1.5;
        font-weight: var(--tg-font-weight-normal);
      }

      .estimated-amount {
        font-weight: var(--tg-font-weight-normal);
        grid-area: estimatedAmount;
        justify-self: flex-end;
        align-self: flex-end;
        line-height: 1.5;
      }
    }
  }

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

.duplicate-bet {
  padding: var(--tg-spacing-13) var(--tg-spacing-16);
  color: var(--tg-text-lightgrey);
  font-weight: var(--tg-font-weight-semibold);
  cursor: not-allowed;
  opacity: 0.5;
}

.mt12 {
  margin-top: var(--tg-spacing-12);
}

.mt8 {
  margin-top: var(--tg-spacing-8);
}

.error {
  .header {
    background: var(--tg-bet-slip-error);
  }
}

.disabled {
  opacity: 0.5;
}

.before {
  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 6px;
    width: 100%;
    top: -4px;
    background:
    radial-gradient(circle, transparent, transparent 50%,
    var(--tg-secondary-main) 50%,
    var(--tg-secondary-main) 100%) 0px -6px/0.7rem 0.7rem repeat-x;
  }
}
</style>
