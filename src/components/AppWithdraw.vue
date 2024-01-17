<script setup lang='ts'>
import type { CurrencyCode, CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  activeCurrency: CurrencyData
  currentNetwork: string
  maxWithdrawBalance?: string
}

const props = defineProps<Props>()
const amountRef = ref()

const { t } = useI18n()
const { openNotify } = useNotify()
const { exchangeRateData } = storeToRefs(useAppStore())
const {
  value: address,
  errorMessage: addressMsg,
  validate: valiAddress,
  resetField: resetAddress,
} = useField<string>('address', (value) => {
  if (!value)
    // return t('this_field_is_required')
    return t('select_addr')
  return ''
})
const {
  value: amount,
  setValue: setAmount,
  errorMessage: amountMsg,
  validate: valiAmount,
  resetField: amountReset,
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
// const {
//   value: paypwd,
//   errorMessage: paypwdMsg,
//   validate: valiPaypwd,
//   resetField: payPasswordReset,
// } = useField<string>('paypwd', (value) => {
//   if (!value)
//     // return t('this_field_is_required')
//     return t('validate_msg_input_pay_pwd')
//   return ''
// })
const paypwd = ref('')
const passwordRef = ref()
const {
  data: walletList,
  runAsync: runAsyncWalletList,
} = useRequest(ApiFinanceWithdrawWallet, {
  onSuccess(data) {
    const temp = data?.d?.find(i => i.is_default === 1 && i.state !== 2)?.id
    if (temp)
      address.value = temp
  },
})
const {
  runAsync: runAsyncWithdrawMethodList,
  data: withdrawMethodList,
} = useRequest(ApiFinanceWithdrawMethodList)

const defaultAddress = computed(() => {
  return walletList.value?.d?.find(i => i.id === address.value)
})
const {
  runAsync: runAsyncWithdrawCoin,
} = useRequest(ApiFinanceWithdrawCoin, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: t('withdraw_apply_success'),
    })
    defaultAddress.value?.is_default !== 1 && resetAddress()
    reset()
    passwordRef.value.resetPassword()
  },
})

const addrOptions = computed(() => {
  if (walletList.value && walletList.value.d) {
    return walletList.value.d.map((i) => {
      return {
        label: i.address,
        value: i.id,
        state: i.state,
      }
    })
  }
  return []
})
const getContractId = computed(() => {
  return props.currentNetwork
})
const getUsRate = computed(() => {
  const str: CurrencyCode = props.activeCurrency.cur
  if (str === '706')
    return Number(amount.value).toFixed(2)
  return str
    ? (Number(exchangeRateData.value?.rates[str]['706']) * Number(amount.value ?? 0)).toFixed(2)
    : 0.00
})

// function onAmountInput() {
//   if (amount.value)
//     setAmount(Number.parseInt(amount.value).toString())
// }
function maxNumber() {
  setAmount(props.maxWithdrawBalance ?? '0.00000000')
}

async function handleWithdraw() {
  if (amountRef.value)
    amountRef.value.setTouchTrue()
  await valiAddress()
  await valiAmount()
  await passwordRef.value.validatePassword()
  if (!addressMsg.value && !amountMsg.value && !passwordRef.value.errPassword) {
    runAsyncWithdrawCoin({
      currency_id: Number(props.activeCurrency.cur),
      contract_id: props.currentNetwork,
      amount: amount.value,
      pay_password: paypwd.value,
      wallet_id: address.value,
      auth_type: passwordRef.value.authType,
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
function reset() {
  amountReset()
  setAmount(application.sliceOrPad(0, application.isVirtualCurrency(props.activeCurrency.type) ? 8 : 2), false)
}
function handleBlur() {
  const decimalPart = amount.value.match(/\.(\d+)/)
  if (decimalPart && decimalPart[1].length > 8)
    setAmount(`${Number.parseInt(amount.value)}.${decimalPart[1].slice(0, 8)}`)
}

watch(() => props.currentNetwork, () => {
  if (props.currentNetwork) {
    runAsyncWithdrawMethodList({ currency_id: props.activeCurrency.cur })
    resetAddress()
    passwordRef.value?.resetPassword()
    updateContract()
    reset()
  }
}, { immediate: true })

await application.allSettled(
  [
    runAsyncWithdrawMethodList({ currency_id: props.activeCurrency.cur }),
  ],
)
</script>

<template>
  <div>
    <template v-if="withdrawMethodList?.length">
      <!-- 虚拟币提款 -->
      <div v-if="addrOptions.length" class="app-withdraw">
        <BaseLabel
          :label="`${activeCurrency?.type}${t('address')}`"
          :current-currency="activeCurrency?.type"
          must
        >
          <BaseSelect
            v-model="address"
            :options="addrOptions"
            :msg="addressMsg"
            popper small border
            popper-clazz="app-with"
            style="--tg-base-select-popper-style-padding-y: var(--tg-spacing-9)"
            @focus="addressMsg && resetAddress()"
          >
            <!-- <template #label>
              <span class="popper-label">
                <AppCurrencyIcon
                  v-if="defaultAddress"
                  :currency-type="activeCurrency?.type"
                />
                {{ defaultAddress?.address }}
              </span>
            </template> -->
            <template #option="{ data: { item, parentWidth } }">
              <div :style="{ width: `${parentWidth}px` }">
                {{ item.label }}
                <!-- <div class="option-row">
                  <AppCurrencyIcon :currency-type="activeCurrency?.type" />
                  <div class="bank-info">
                    <p>{{ item.label }}</p>
                  </div>
                </div> -->
              </div>
            </template>
          </BaseSelect>
        </BaseLabel>
        <div class="amount">
          <div class="top">
            <span class="label">{{ t('amount') }}
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
              <AppCurrencyIcon :currency-type="activeCurrency?.type" />
            </template>
            <template #right-button>
              <span>{{ t('max') }}</span>
            </template>
          </BaseInput>
        </div>
        <!-- <BaseLabel :label="t('menu_title_settings_update_safepwd')" must>
          <BaseInput v-model="paypwd" :msg="paypwdMsg" type="password" max="6" />
        </BaseLabel> -->
        <AppPasswordInput ref="passwordRef" v-model="paypwd" />
        <BaseButton bg-style="secondary" size="md" @click="handleWithdraw">
          {{ t('menu_title_settings_withdrawals') }}
        </BaseButton>
        <!-- <div class="tips">
            <span>{{ t('withdrawal_min_amount') }} 0.00020000</span>
            <AppCurrencyIcon class="currency-icon"
            :currency-type="activeCurrency?.type" />
            <span>。{{ t('withdrawal_fee_tip') }}0.00007000</span>
            <AppCurrencyIcon class="currency-icon"
            :currency-type="activeCurrency?.type" />
            <span>{{ t('withdrawal_as_fee') }}。</span>
          </div> -->
      </div>
      <!-- 虚拟币地址添加 -->
      <AppVirAddressDialog
        v-else
        is-withdraw
        :currency-id="activeCurrency.cur"
        :currency-name="activeCurrency.type"
        :contract-id="getContractId"
        style="--tg-app-vir-address-style-padding: 0"
        @added="updateContract"
      />
    </template>
    <template v-else>
      <BaseEmpty :description="t('data_empty')" icon="uni-empty-betslip" />
    </template>
  </div>
</template>

<style>
/* .app-with.v-popper--theme-tg-popper-outer.v-popper--theme-dropdown .v-popper__arrow-inner,
.app-with.v-popper--theme-tg-popper-outer.v-popper--theme-dropdown .v-popper__arrow-outer,
.app-with.v-popper--theme-tg-popper-outer-deep.v-popper--theme-dropdown .v-popper__arrow-inner,
.app-with.v-popper--theme-tg-popper-outer-deep.v-popper--theme-dropdown .v-popper__arrow-outer {
  border-color: var(--tg-secondary-main);
} */
</style>

<style lang='scss' scoped>
.app-withdraw {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  .popper-label{
    display: flex;
    align-items: center;
    gap: .25rem;
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
  // .tips{
  //   font-size: var(--tg-font-size-xs);
  //   .currency-icon{
  //     display: inline-block;
  //     vertical-align: middle;
  //     padding:0  var(--tg-spacing-4);
  //   }
  // }
}
.bank-options{
  .option-row {
    display: flex;
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
