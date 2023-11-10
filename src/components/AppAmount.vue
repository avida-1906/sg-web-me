<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis'

interface Props {
  amount: string | number
  currencyType: EnumCurrencyKey
  showName?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <div class="app-amount">
    <span class="amount" :title="String(props.amount)">{{ props.amount }}</span>
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
  max-width: 14ch;
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
}
</style>
