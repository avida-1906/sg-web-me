<script setup lang='ts'>
const { t } = useI18n()

const { value: address, errorMessage: addressMsg } = useField<string>('address', (value) => {
  if (!value)
    return t('this_field_is_required')

  return ''
})
const { value: amount, setValue: setAmount, errorMessage: amountMsg } = useField<string>('amount', (value) => {
  if (!value)
    return t('this_field_is_required')

  return ''
})
function onAmountInput() {
  if (amount.value)
    setAmount(application.numberToCurrency(+amount.value))
}

const currentNetwork = ref('1')
const networkList = [
  { label: '网络1', value: '1' },
  { label: '网络2', value: '2' },
  { label: '网络3', value: '3' },
  { label: '网络4', value: '4' },
]
</script>

<template>
  <div class="app-withdraw">
    <div class="currency">
      <div class="c-option">
        <span class="semibold">{{ t('currency') }}</span>
        <AppWallet :wallet-btn="false" />
      </div>
      <div class="c-option">
        <span class="semibold">{{ t('network') }}</span>
        <BaseSelect v-model="currentNetwork" :options="networkList" popper />
      </div>
    </div>
    <div class="address">
      <span class="label">
        <AppCurrencyIcon :currency-type="EnumCurrency.BTC" />
        <span>BTC地址</span>
      </span>
      <BaseInput v-model="address" :msg="addressMsg" />
    </div>

    <div class="amount">
      <div class="top">
        <span class="label">金额 *</span>
        <span class="us">US$0.00</span>
      </div>
      <BaseInput v-model="amount" type="number" placeholder="0.00000000" :msg="amountMsg" @blur="onAmountInput">
        <template #right-icon>
          <AppCurrencyIcon :currency-type="EnumCurrency.BTC" />
        </template>
        <template #right-button>
          <span>最大值</span>
        </template>
      </BaseInput>
    </div>
    <div class="tips">
      <span>最低提款金额为 0.00020000</span>
      <AppCurrencyIcon :currency-type="EnumCurrency.BTC" />
      <span>。我们将从您的余额扣除0.00007000</span>
      <AppCurrencyIcon :currency-type="EnumCurrency.BTC" />
      作为您提款的交易费用。
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-withdraw {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);

  .address {
    display: flex;
    flex-direction: column;

    .label {
      font-weight: var(--tg-font-weight-semibold);
      display: flex;
      align-items: center;
      margin-bottom: var(--tg-spacing-4);

      span {
        margin-left: var(--tg-spacing-4);
      }
    }
  }

  .amount {
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

  .currency {
    display: flex;
    justify-content: center;
    gap: var(--tg-spacing-16);

    .c-option {
      display: flex;
      flex-direction: column;
    }
  }
  .tips{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    span{
      margin-right: var(--tg-spacing-4);
    }
  }
}
</style>
