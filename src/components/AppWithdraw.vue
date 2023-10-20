<script setup lang='ts'>
import type { IUserCurrencyList } from '~/stores/app'

interface Props {
  activeCurrency: IUserCurrencyList
}

defineProps<Props>()

const { t } = useI18n()
const {
  value: address,
  errorMessage: addressMsg,
  validate: valiAddress,
} = useField<string>('address', (value) => {
  if (!value)
    return t('this_field_is_required')
  return ''
})
const {
  value: amount,
  setValue: setAmount,
  errorMessage: amountMsg,
  validate: valiAmount,
} = useField<string>('amount', (value) => {
  if (!value)
    return t('this_field_is_required')
  return ''
})
const {
  value: paypwd,
  errorMessage: paypwdMsg,
  validate: valiPaypwd,
} = useField<string>('paypwd', (value) => {
  if (!value)
    return t('this_field_is_required')
  return ''
})

function onAmountInput() {
  if (amount.value)
    setAmount(application.numberToCurrency(+amount.value))
}
async function handleWithdraw() {
  await valiAddress()
  await valiAmount()
  await valiPaypwd()
}
</script>

<template>
  <div class="app-withdraw">
    <BaseLabel
      :label="`${activeCurrency?.type}地址`"
      :current-currency="activeCurrency?.type"
      must
    >
      <BaseInput v-model="address" :msg="addressMsg" />
    </BaseLabel>
    <div class="amount">
      <div class="top">
        <span class="label">金额<span style="color: var(--tg-text-error);">*</span></span>
        <span class="us">US$0.00</span>
      </div>
      <BaseInput
        v-model="amount"
        type="number"
        placeholder="0.00000000"
        :msg="amountMsg"
        @blur="onAmountInput"
      >
        <template #right-icon>
          <AppCurrencyIcon :currency-type="activeCurrency?.type" />
        </template>
        <template #right-button>
          <span>最大值</span>
        </template>
      </BaseInput>
    </div>
    <BaseLabel label="双重验证" must>
      <BaseInput v-model="paypwd" :msg="paypwdMsg" must />
    </BaseLabel>
    <BaseButton bg-style="primary" size="md" @click="handleWithdraw">
      提款
    </BaseButton>
    <div class="tips">
      <span>最低提款金额为 0.00020000</span>
      <AppCurrencyIcon class="currency-icon" :currency-type="activeCurrency?.type" />
      <span>。我们将从您的余额扣除0.00007000</span>
      <AppCurrencyIcon class="currency-icon" :currency-type="activeCurrency?.type" />
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
      padding:0  var(--tg-spacing-4);
    }
  }
}
</style>
