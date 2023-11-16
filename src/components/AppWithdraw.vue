<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  activeCurrency: CurrencyData
  currentNetwork: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { openNotify } = useNotify()

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

const {
  data: walletList,
  runAsync: runAsyncWalletList,
} = useRequest(ApiMemberWalletList, {
  onSuccess(data) {
    const temp = data?.d?.find(i => i.is_default === 1)?.id
    if (temp)
      address.value = temp
  },
})
const {
  runAsync: runAsyncWithdrawCoin,
} = useRequest(ApiFinanceWithdrawCoin, {
  onSuccess(data) {
    openNotify({
      type: 'success',
      message: data,
    })
  },
})

const addrOptions = computed(() => {
  if (walletList.value && walletList.value.d) {
    return walletList.value.d.map((i) => {
      return {
        label: i.address,
        value: i.id,
      }
    })
  }
  return []
})
const defaultAddress = computed(() => {
  return walletList.value?.d?.find(i => i.id === address.value)?.address ?? ''
})

function onAmountInput() {
  if (amount.value)
    setAmount(application.numberToCurrency(+amount.value))
}
function maxNumber() {
  setAmount(props.activeCurrency.balance)
}
async function handleWithdraw() {
  await valiAddress()
  await valiAmount()
  await valiPaypwd()
  if (!addressMsg.value && !amountMsg.value && !paypwdMsg.value) {
    runAsyncWithdrawCoin({
      currency_id: Number(props.activeCurrency.cur),
      contract_id: props.currentNetwork,
      amount: amount.value,
      pay_password: paypwd.value,
      wallet_id: address.value,
    })
  }
}
function updateContract() {
  runAsyncWalletList({
    contract_type: props.currentNetwork,
    currency_id: props.activeCurrency.cur,
    page: 1,
    page_size: 10,
  })
}

watch(() => props.currentNetwork, () => {
  if (props.currentNetwork)
    updateContract()
}, { immediate: true })
</script>

<template>
  <template v-if="addrOptions.length">
    <!-- 虚拟币提款 -->
    <div class="withdrawal-info app-withdraw">
      <BaseLabel
        :label="`${activeCurrency?.type}地址`"
        :current-currency="activeCurrency?.type"
        must
      >
        <BaseSelect
          v-model="address"
          :options="addrOptions"
          theme popper small border
          style="--tg-base-select-popper-style-padding-y: var(--tg-spacing-12)"
        >
          <template #label>
            <span class="popper-label">
              <AppCurrencyIcon
                v-if="defaultAddress"
                :currency-type="activeCurrency?.type"
              />
              {{ defaultAddress }}
            </span>
          </template>
          <template #option="{ data: { item, parentWidth } }">
            <div
              class="scroll-x bank-options"
              :style="{ width: `${parentWidth + 24}px` }"
            >
              <div class="option-row">
                <AppCurrencyIcon :currency-type="activeCurrency?.type" />
                <div class="bank-info">
                  <p>{{ item.label }}</p>
                </div>
              </div>
            </div>
          </template>
        </BaseSelect>
      </BaseLabel>
      <div class="amount">
        <div class="top">
          <span class="label">金额<span style="color: var(--tg-text-error);">*</span></span>
          <!-- <span class="us">US$0.00</span> -->
        </div>
        <BaseInput
          v-model="amount"
          type="number"
          placeholder="0.00000000"
          :msg="amountMsg"
          @blur="onAmountInput"
          @on-right-button="maxNumber"
        >
          <template #right-icon>
            <AppCurrencyIcon :currency-type="activeCurrency?.type" />
          </template>
          <template #right-button>
            <span>最大值</span>
          </template>
        </BaseInput>
      </div>
      <BaseLabel label="资金密码" must>
        <BaseInput v-model="paypwd" :msg="paypwdMsg" type="password" max="6" />
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
  <!-- 虚拟币地址添加 -->
  <template v-else>
    <AppVirAddressDialog
      is-withdraw
      :currency-id="activeCurrency.cur"
      :currency-name="activeCurrency.type"
      style="--tg-app-vir-address-style-padding: 0"
      @added="updateContract"
    />
  </template>
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
// select
.withdrawal-info{
      display: flex;
      flex-direction: column;
      gap: .75rem;
      .popper-label{
        display: flex;
        align-items: center;
        gap: .25rem;
      }
    }
.bank-options{
  .option-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    color: var(--tg-text-white);
    cursor: pointer;
    > svg{
      width: 40px;
      height: 40px;
    }
    .bank-info{
      display: flex;
      align-items: center;
      :nth-child(1){
        margin-right: var(--tg-spacing-5);
      }
      p{
        margin: var(--tg-spacing-2) 0;
      }
      &.is-mobile{
        flex-direction: column;
        align-items: self-start;
      }
      user-select: none;
      -webkit-user-select: none;
    }
  }
}
</style>
