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

const { t } = useI18n()

const numStr = computed(() => {
  if (props.num && props.num > 1)
    return `${props.num}${t('order_label')}`

  return ''
})
</script>

<template>
  <div class="app-sport-bet-success-notify">
    {{ t('bet_tip_amount_tip', { numStr }) }}
    <AppAmount
      class="amount"
      :show-name="showName"
      :amount="
        application.sliceOrPad(+amount, application.getCurrencySuffixLength(currencyType))
      "
      :currency-type="currencyType"
    />
    {{ betSlipTabValue ? `${t('de')}${betSlipTabValue}` : '' }}
  </div>
</template>

<style lang="scss" scoped>
.app-sport-bet-success-notify {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  word-break: break-all;
  padding-top: var(--tg-spacing-4);
  line-height: 1.3;
}
.amount {
  margin: 0 5px;
  flex-wrap: nowrap;
  display: flex;
}
</style>
