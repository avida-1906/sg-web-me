<script setup lang='ts'>
withDefaults(defineProps<Props>(), {
  activeCurrency: () => { },
})

const { t } = useI18n()

interface Props {
  activeCurrency: any
}
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

// const currentNetwork = ref('1')
// const networkList = [
//   { label: '网络1', value: '1' },
//   { label: '网络2', value: '2' },
//   { label: '网络3', value: '3' },
//   { label: '网络4', value: '4' },
// ]
</script>

<template>
  <div class="app-withdraw">
    <!-- <div class="currency">
      <div class="c-option">
        <AppWallet :wallet-btn="false" />
      </div>
      <div class="c-option">
        <BaseSelect v-model="currentNetwork" :options="networkList" popper />
      </div>
    </div> -->
    <!-- <div class="address">
      <span class="label">
        <AppCurrencyIcon :currency-type="EnumCurrency.BTC" />
        <span>BTC地址</span>
      </span>
      <BaseInput v-model="address" :msg="addressMsg" />
    </div> -->
    <BaseLabel label="BTC地址" :icon="activeCurrency?.icon" must>
      <BaseInput v-model="address" :msg="addressMsg" />
    </BaseLabel>
    <div class="amount">
      <div class="top">
        <span class="label">金额<span style="color: var(--tg-text-error);">*</span></span>
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
    <BaseLabel label="双重验证" must>
      <BaseInput v-model="address" label="" must />
    </BaseLabel>
    <BaseButton bg-style="primary" size="md">
      提款
    </BaseButton>
    <div class="tips">
      <span>最低提款金额为 0.00020000</span>
      <AppCurrencyIcon class="currency-icon" :currency-type="EnumCurrency.BTC" />
      <span>。我们将从您的余额扣除0.00007000</span>
      <AppCurrencyIcon class="currency-icon" :currency-type="EnumCurrency.BTC" />
      <span>作为您提款的交易费用。</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-withdraw {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);

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
  .tips{
    font-size: var(--tg-font-size-xs);
    .currency-icon{
      display: inline-block;
      vertical-align: middle;
      padding:0 4px;
    }
  }
}
</style>
