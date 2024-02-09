<script setup lang='ts'>
import type { CurrencyCode, CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  modelValue?: string
  activeCurrency: CurrencyData
  maxWithdrawBalance: string
}

const props = withDefaults(defineProps<Props>(), {

})

const emit = defineEmits(['update:modelValue'])
const { t } = useI18n()
const { exchangeRateData } = storeToRefs(useAppStore())
const {
  value: amount,
  setValue: setAmount,
  errorMessage: amountMsg,
  // validate: valiAmount,
  // resetField: amountReset,
} = useField<string>('amount', (value) => {
  if (!value)
    // return t('validate_require')
    return t('input_amount')
  else if (Number(value) === 0)
    return t('validate_deposit_amount_zero')
  else if (Number(value) < 0)
    return t('validate_deposit_amount_pos')
  else if (value && Number(value) > Number(props.activeCurrency.balance))
    maxNumber()
  // return t('validate_deposit_amount_max')
  return ''
})

const amountRef = ref()

function maxNumber() {
  setAmount(props.maxWithdrawBalance ?? '0.00000000')
}
function handleBlur() {
  const decimalPart = amount.value.match(/\.(\d+)/)
  if (decimalPart && decimalPart[1].length > 8)
    setAmount(`${Number.parseInt(amount.value)}.${decimalPart[1].slice(0, 8)}`)
}
const getUsRate = computed(() => {
  const str: CurrencyCode = props.activeCurrency.cur
  if (str === '706')
    return Number(amount.value).toFixed(2)
  return str
    ? (Number(exchangeRateData.value?.rates[str]['706']) * Number(amount.value ?? 0)).toFixed(2)
    : 0.00
})
</script>

<template>
  <div class="app-amount-input">
    <div class="top">
      <span class="label">{{ $t('amount') }}
        <span style="color: var(--tg-text-error);">*</span></span>
      <span class="us">US${{ getUsRate }}</span>
    </div>
    <BaseInput
      ref="amountRef"
      v-model="amount"
      type="number"
      :msg="amountMsg"
      msg-after-touched
      @blur="handleBlur"
      @on-right-button="maxNumber"
    >
      <template #right-icon>
        <AppCurrencyIcon currency-type="BTC" />
      </template>
      <template #right-button>
        <span>{{ $t('max') }}</span>
      </template>
    </BaseInput>
  </div>
</template>

<style lang='scss' scoped>
.app-amount-input{
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      justify-content: space-between;
      font-weight: var(--tg-font-weight-semibold);
      margin-bottom: var(--tg-spacing-4);

      .us {
        font-size: var(--tg-font-size-xs);
      }
    }
}
</style>
