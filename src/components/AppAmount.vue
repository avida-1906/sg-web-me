<script setup lang='ts'>
import type { EnumCurrency } from '~/utils/enums'

interface Props {
  amount: string | number
  currencyType: EnumCurrency
  showName?: boolean
}
const props = defineProps<Props>()

const _amount = computed(() => {
  return application.numberToCurrency(+props.amount, props.currencyType)
})
</script>

<template>
  <div class="app-amount">
    <span class="amount" :title="String(_amount)">{{ _amount }}</span>
    <AppCurrencyIcon :show-name="showName" :currency-type="currencyType" />
  </div>
</template>

<style lang='scss'>
:root{
  --tg-app-amount-width: auto
}
</style>

<style lang='scss' scoped>
.app-amount {
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center;
}

.amount {
  width: var(--tg-app-amount-width);
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
  margin-right: var(--tg-spacing-4);
}
</style>
