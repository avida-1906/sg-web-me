<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
}

defineProps<Props>()

const { isVirtualCurrency } = useCurrencyData()

const currentNetwork = ref('')
const activeCurrency = ref<CurrencyData | null>()

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
      {{ '1000' }}USDT
    </div>
    <div class="choose-label">
      <span>{{ $t('current_wait_receive_label') }}：</span>
      <span class="orange-text">{{ '1000' }}USDT</span>
      <span>{{ $t('current_wait_receive_desc') }}</span>
    </div>
    <div class="currency-wrap">
      <AppSelectCurrency
        :show-balance="false"
        :network="isVirCurrency"
        @change="changeCurrency"
      />
    </div>
    <div class="about-receive">
      {{ $t('bonus_receive_expect') }}：<AppAmount amount="99999900" currency-type="BNB" />
    </div>
    <div class="buttons">
      <BaseButton bg-style="primary" size="md" @click="receiveBonus">
        {{ $t('confirm_receive') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
}
</style>
