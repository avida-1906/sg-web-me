<script setup lang='ts'>
import type { ICartInfoData } from '~/types'
import type {
  EnumsBetSlipBetSlipTabStatus as EnumsBetSlipBetSlipTabStatusType,
} from '~/utils/enums'

interface Props {
  index: number
  /**
   * 下注类型
   *
   * 单项：EnumsBetSlipBetSlipTabStatus.single
   *
   * 组合：EnumsBetSlipBetSlipTabStatus.multi
   */
  betSlipType: EnumsBetSlipBetSlipTabStatusType
  /** 错误 */
  error?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 是否已结算 */
  isClosed?: boolean
  /** 是否是滚球 */
  isLive?: boolean
  /** 渲染的List数据 */
  cartInfoData: ICartInfoData
}
const props = withDefaults(defineProps<Props>(), {
  index: 0,
  betSlipType: EnumsBetSlipBetSlipTabStatus.single,
})
const { t } = useI18n()
const appStore = useAppStore()
const { currentGlobalCurrency } = storeToRefs(appStore)
const sportStore = useSportsStore()

const amount = ref(0)

const isBetSingle = computed(() =>
  props.betSlipType === EnumsBetSlipBetSlipTabStatus.single)
const isBetMulti = computed(
  () => props.betSlipType === EnumsBetSlipBetSlipTabStatus.multi,
)
const isFirst = computed(() => props.index === 0)

watch(currentGlobalCurrency, () => {
  amount.value = 0
})
</script>

<template>
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
          {{ t('sports_status_live') }}
        </div>
        <div class="text">
          {{ cartInfoData.homeTeamName }} - {{ cartInfoData.awayTeamName }}
        </div>
      </div>
      <BaseButton
        type="text" size="none"
        @click="sportStore.cart.removeItem(index)"
      >
        <BaseIcon
          name="uni-close"
        />
      </BaseButton>
    </div>
    <div class="content">
      <!-- 盘口类型 -->
      <div class="market-name">
        {{ cartInfoData.btn }}
      </div>
      <!-- 最大下注金额 -->
      <div class="max-bet" />
      <!-- 下注盘口 -->
      <div class="outcome-name">
        <span>{{ cartInfoData.sn }}</span>
      </div>
      <!-- 状态或赔率 -->
      <div v-if="isClosed" class="closed">
        {{ t('sports_settled') }}
      </div>
      <AppSportsOdds v-else :odds="cartInfoData.ov" arrow="left" />
      <!-- 单式金额输入框 -->
      <div v-show="isBetSingle" class="footer">
        <div class="bet-amount">
          <BaseInput
            v-model="amount"
            type="number"
            placeholder="0.00000000"
            mb0
            :disabled="disabled"
          >
            <template #right-icon>
              <AppCurrencyIcon :currency-type="currentGlobalCurrency" />
            </template>
          </BaseInput>
        </div>
        <div class="estimated-label">
          <span>{{ t('sports_estimated_payment_amount') }}</span>
        </div>
        <div class="estimated-amount">
          <AppAmount
            :amount="mul(amount, Number(cartInfoData.ov))"
            :currency-type="currentGlobalCurrency"
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
