<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
}

defineProps<Props>()

const { isVirtualCurrency } = useCurrencyData()

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
    return isVirtualCurrency(activeCurrency.value.type)

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
    <div class="money">
      {{ '1000' }}<BaseIcon name="coin-usdt" />
    </div>
    <div class="choose-label">
      <span>{{ $t('current_wait_receive_label') }}：</span>
      <span class="orange-text">{{ '1000' }}<BaseIcon name="coin-usdt" /></span>
      <span>{{ $t('current_wait_receive_desc') }}</span>
    </div>
    <div class="currency-wrap">
      <AppSelectCurrency
        :show-balance="false"
        :network="isVirCurrency"
        @change="changeCurrency"
      />
      <div class="orange-text about-receive">
        <span class="label">{{ $t('bonus_receive_expect') }}：</span>
        <AppAmount amount="99999900" currency-type="BNB" />
      </div>
    </div>
    <div class="records">
      <ul class="wrap">
        <li class="item title">
          <div>{{ $t('commission_wallet_money_label') }}</div>
          <div>{{ $t('currency_exchange_rate') }}</div>
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
        {{ $t('confirm_receive') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.orange-text {
  color: var(--tg-text-warn);
}
.app-agent-commission-draw-bonus {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--tg-spacing-16);
  text-align: center;
  padding: var(--tg-spacing-4) var(--tg-spacing-16) var(--tg-spacing-16);
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  .money {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-lg);
    font-weight: var(--tg-font-weight-semibold);
  }
  .choose-label {
    color: var(--tg-secondary-light);
    line-height: var(--tg-spacing-20);
    font-weight: var(--tg-font-weight-semibold);
  }
  .currency-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--tg-spacing-8);
    .rate {
      font-weight: var(--tg-font-weight-semibold);
    }
  }
  .about-receive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--tg-font-weight-semibold);
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
        padding: 0 var(--tg-spacing-12);
        font-size: var(--tg-font-size-default);
        color: var(--tg-text-white);
        line-height: var(--tg-spacing-54);
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
