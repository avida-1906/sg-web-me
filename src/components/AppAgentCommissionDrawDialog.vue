<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
}

defineProps<Props>()

const currentNetwork = ref('')
const activeCurrency = ref<CurrencyData | null>()

const commissionWallet = reactive([
  { rate: '2.565656', amount: '8888888.999', currency: 'BNB' },
  { rate: '2.565656', amount: '8888888.999', currency: 'ETH' },
  { rate: '2.565656', amount: '8888888.999', currency: 'THB' },
  { rate: '2.565656', amount: '8888888.999', currency: 'CNY' },
  { rate: '2.565656', amount: '8888888.999', currency: 'BRL' },
])

const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return application.isVirtualCurrency(activeCurrency.value.type)

  return false
})

function receiveBonus() {
}

function changeCurrency(item: CurrencyData, network: string) {
  activeCurrency.value = item
  currentNetwork.value = network
}
</script>

<template>
  <div class="app-agent-commission-draw-bonus">
    <div class="choose-label">
      <div>{{ $t('commission_wallet_amount_exchange_total', { type: 'USDT' }) }}:</div>
      <span class="orange-text">{{ '1000' }}<BaseIcon name="coin-usdt" /></span>
      <span>{{ $t('choose_convert_your_desired_currency') }}</span>
    </div>
    <BaseDivider />
    <div class="currency-wrap">
      <div class="center" style="gap: var(--tg-spacing-8);">
        <span>{{ $t('converted_currency') }}</span>
        <AppSelectCurrency
          :show-balance="false"
          @change="changeCurrency"
        />
      </div>
      <div class="orange-text about-receive">
        <span class="label">{{ $t('achievable_cumulatively') }}：</span>
        <AppAmount amount="99999900" currency-type="BNB" />
      </div>

      <div class="records">
        <ul class="wrap">
          <li class="item title">
            <div>{{ $t('commission_wallet_balance') }}</div>
            <div style="text-align: right;">
              {{ $t('exchange_rate_for_currency_received') }}
            </div>
          </li>
          <li v-for="item in commissionWallet" :key="item.currency" class="item">
            <div class="level">
              <BaseIcon :name="`coin-${item.currency.toLowerCase()}`" />
              <span>{{ item.currency }}</span>
              <span>{{ item.amount }}</span>
            </div>
            <div>{{ item.rate }}</div>
          </li>
        </ul>
      </div>
      <div class="buttons">
        <BaseButton bg-style="primary" size="md" @click="receiveBonus">
          {{ $t('confirm_conversion') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.orange-text {
  color: var(--tg-text-warn);
  display: inline-flex;
  align-items: center;
  gap: var(--tg-spacing-4);
  margin-right: var(--tg-spacing-4);
}
.app-agent-commission-draw-bonus {
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  // justify-content: flex-start;
  // gap: var(--tg-spacing-16);
  // text-align: center;

  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  .choose-label {
    padding: 0 var(--tg-spacing-12) var(--tg-spacing-12);
    color: var(--tg-text-white);
    line-height: var(--tg-spacing-20);
    font-weight: var(--tg-font-weight-normal);
    text-align: left;
  }
  .currency-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--tg-spacing-12);
    padding: var(--tg-spacing-12) var(--tg-spacing-12) var(--tg-spacing-16);
  }
  .about-receive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    .label {
      color: var(--tg-text-white);
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-12);
    justify-content: center;
    width: 100%;
    button {
      width: 312px;
    }
  }
  .records {
    width: 100%;
    .wrap {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 var(--tg-spacing-16);
        font-size: var(--tg-font-size-default);
        color: var(--tg-text-white);
        line-height: var(--tg-spacing-54);
        &.title {

          line-height: var(--tg-spacing-18);
          height: 54px;
        }
        .level {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: var(--tg-spacing-4);
        }
      }
      .item:nth-child(even) {
        background-color: var(--tg-secondary-grey);
      }
    }
  }
}
</style>
