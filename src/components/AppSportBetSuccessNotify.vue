<script setup lang="ts">
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  amount: string | number
  currencyType: EnumCurrencyKey
  showName?: boolean
  betSlipTabValue: string
  /**
   * 笔数
   */
  num?: number
}
const props = defineProps<Props>()

const numStr = computed(() => {
  if (props.num && props.num > 1)
    return `${props.num}笔`

  return ''
})
</script>

<template>
  <div class="app-sport-bet-success-notify">
    已成功压下 {{ numStr }} 总值
    <AppAmount
      class="amount"
      :show-name="showName"
      :amount="amount"
      :currency-type="currencyType"
    />
    {{ betSlipTabValue ? `的${betSlipTabValue}` : '' }}
  </div>
</template>

<style lang="scss" scoped>
.app-sport-bet-success-notify {
  display: flex;
  align-items: center;
}
.amount {
  margin: 0 5px;
}
</style>
