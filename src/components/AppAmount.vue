<script setup lang='ts'>
import { EnumCurrency } from '~/utils/enums'

interface Props {
  amount: string | number
  currencyType: EnumCurrency
}
const props = defineProps<Props>()

const legalCurrencyList = [
  EnumCurrency.EUR,
  EnumCurrency.JPY,
  EnumCurrency.BRL,
  EnumCurrency.CAD,
  EnumCurrency.INR,
]

const _amount = computed(() => {
  if (legalCurrencyList.includes(props.currencyType))
    return numberToCurrency(+props.amount, CurrencyConfig.get(props.currencyType))

  return props.amount
})
</script>

<template>
  <div class="app-amount">
    <span class="amount" :title="String(_amount)">{{ _amount }}</span>
    <AppCurrencyIcon :currency-type="currencyType" />
  </div>
</template>

<style lang='scss' scoped>
.app-amount {
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center;
}

.amount {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
  margin-right: var(--tg-spacing-4);
}
</style>
