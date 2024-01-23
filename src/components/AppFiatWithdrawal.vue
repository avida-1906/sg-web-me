<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  /** 货币对象 */
  activeCurrency: CurrencyData
  maxWithdrawBalance?: string
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['toHolder'])

const amountRef = ref()
const passwordRef = ref()
const payPassword = ref('')
const { t } = useI18n()
// const { isLessThanXs } = storeToRefs(useWindowStore())
const { openNotify } = useNotify()
// const { exchangeRateData } = storeToRefs(useAppStore())
/** '1' 银行卡， '2' pix 除了巴西其他国家都是银行卡 */
const currentType = computed<'1' | '2'>(() =>
  props.activeCurrency.cur === '702' ? '2' : '1',
)
const {
  value: selectBank,
  errorMessage: selectBankError,
  validate: selectBankValidate,
  resetField: selectBankReset,
} = useField<string>('selectBank', (value) => {
  if (!value)
    return currentType.value === '1' ? t('choose_draw_bank') : t('pls_select_pix')
  return ''
})
const {
  value: amount,
  errorMessage: amountError,
  validate: amountValidate,
  setValue: setAmount,
  resetField: amountReset,
} = useField<string>('amount', (value) => {
  if (!value)
    return t('input_amount')
  else if (Number(value) === 0)
    return `${t('validate_amount')}0`
  else if (Number(value) < 0)
    return t('validate_deposit_amount_pos')
  else if (value && Number(value) > Number(props.activeCurrency.balance))
    maxNumber()
    // return t('validate_deposit_amount_max')
  return ''
})
// const {
//   value: payPassword,
//   errorMessage: payPasswordError,
//   validate: payPasswordValidate,
//   resetField: payPasswordReset,
// } = useField<string>('payPassword', (value) => {
//   if (!value)
//     return t('validate_msg_input_pay_pwd')
//   return ''
// })

const {
  runAsync: runAsyncWithdrawMethodList,
  data: withdrawMethodList,
} = useRequest(ApiFinanceWithdrawMethodList)
const {
  runAsync: runAsyncWithdrawBankcardList,
  data: withdrawBankcardList,
} = useRequest(ApiFinanceWithdrawBankcard, {
  onSuccess(data) {
    const temp = data.d.find(i => i.is_default === 1 && i.state !== 2)?.bank_account
    if (temp)
      selectBank.value = temp
    else
      selectBankReset()
  },
})
const {
  run: runWithdraw,
} = useRequest(ApiFinanceWithdraw, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: t('withdraw_apply_success'),
    })
    selectBankReset()
    amountReset()
    passwordRef.value.resetPassword()
  },
})
// const withdrawMethodData = computed(() => {
//   if (withdrawMethodList.value) {
//     currentWithdrawMethod.value = withdrawMethodList.value[0].id
//     return withdrawMethodList.value.map((item) => {
//       return {
//         label: item.name,
//         value: item.id,
//       }
//     })
//   }
//   currentWithdrawMethod.value = ''
//   return []
// })

const bindBanks = computed(() => {
  if (withdrawBankcardList.value && withdrawBankcardList.value.d) {
    return withdrawBankcardList.value.d.map((item) => {
      // if (item.is_default === 1)
      //   selectBank.value = item.bank_account
      return {
        label: item.bank_name,
        value: item.bank_account,
        icon: 'fiat-bank',
        name: item.open_name,
        fullName: `${item.bank_name} ${item.bank_account}`,
        id: item.id,
        state: item.state,
      }
    })
  }
  return []
})
const defaultBank = computed(() =>
  bindBanks.value.find(a => a.value === selectBank.value)?.fullName ?? '',
)
const bankcardId = computed(() =>
  bindBanks.value.find(a => a.value === selectBank.value)?.id ?? '',
)
// const getUsRate = computed(() => {
//   const str: CurrencyCode = props.activeCurrency.cur
//   if (str === '706')
//     return Number(amount.value).toFixed(2)
//   return str
//     ? (Number(exchangeRateData.value?.rates[str]['706']) * Number(amount.value ?? 0)).toFixed(2)
//     : 0.00
// })

function maxNumber() {
  setAmount(props.maxWithdrawBalance ?? '0.00')
}
// function updateBank() {
//   runAsyncWithdrawBankcardList({ currency_id: props.activeCurrency.cur })
// }
async function withDrawSubmit() {
  if (amountRef.value)
    amountRef.value.setTouchTrue()
  await selectBankValidate()
  await amountValidate()
  await passwordRef.value.validatePassword()
  if (!selectBankError.value && !amountError.value && !passwordRef.value.errPassword) {
    runWithdraw({
      currency_id: Number(props.activeCurrency.cur),
      // method_id: currentWithdrawMethod.value,
      method_id: withdrawMethodList.value ? withdrawMethodList.value[0].id : '',
      amount: amount.value,
      pay_password: payPassword.value,
      bankcard_id: bankcardId.value,
      auth_type: Number(passwordRef.value.authType),
      auth_code: payPassword.value,
    })
  }
}
function formatAmount() {
  if (amount.value)
    setAmount(Number.parseInt(amount.value).toString())
}

watch(() => props.activeCurrency, (newValue) => {
  runAsyncWithdrawBankcardList({ currency_id: newValue.cur })
  runAsyncWithdrawMethodList({ currency_id: newValue.cur })
  selectBankReset()
  amountReset()
  passwordRef.value?.resetPassword()
})

await application.allSettled(
  [
    runAsyncWithdrawBankcardList({ currency_id: props.activeCurrency.cur }),
    runAsyncWithdrawMethodList({ currency_id: props.activeCurrency.cur }),
  ],
)
</script>

<template>
  <div class="app-fiat-withdrawal">
    <template v-if="withdrawMethodList?.length">
      <!-- 绑定银行卡/三方账户 -->
      <div v-if="!withdrawBankcardList?.d?.length" class="bank-bind">
        <div class="layout-spacing not-payment-msg">
          <div class="msg-warp">
            <BaseIcon style="font-size: var(--tg-font-size-base);" name="uni-warning-color" class="search-icon" />
            <div>
              <div style="margin-bottom: 4px;">
                {{ t('no_withdraw_information_about_the_currency') }}
              </div>
              <div>{{ t('please_go_card_wallet_bind_withdraw_information') }}</div>
            </div>
          </div>
          <BaseButton bg-style="secondary" size="md" @click="emit('toHolder')">
            {{ t('go_card_wallet') }}
          </BaseButton>
        </div>
        <!-- <AppAddBankcards
          :is-first="true"
          :is-withdraw="true"
          :container="false"
          :active-currency="activeCurrency"
          :current-type="currentType"
          @added="updateBank"
        /> -->
      </div>
      <!-- 出款信息 -->
      <div v-else class="withdrawal-wrap">
        <!-- <AppWithdrawalDepositType
        v-model="currentWithdrawMethod"
        :current-type="withdrawMethodData"
      /> -->
        <div class="withdrawal-info">
          <BaseLabel
            :label="currentType === '1' ? t('withdraw_bank') : t('pix_account')"
            must
          >
            <BaseSelect
              v-model="selectBank"
              :options="bindBanks"
              :msg="selectBankError"
              must popper border
              :style="{
                '--tg-base-select-popper-style-padding-y':
                  'var(--tg-spacing-9)',
              }"
              @focus="selectBankError && selectBankReset()"
            >
              <template #label>
                <div style="min-height: 18px;">
                  <!-- <BaseIcon
                    v-if="defaultBank"
                    :name="currentType === '1' ? 'fiat-bank' : 'fiat-pix-title'"
                  /> -->
                  {{ defaultBank }}
                </div>
              </template>
              <template #option="{ data: { item, parentWidth } }">
                <div :style="{ width: `${parentWidth}px` }">
                  {{ `${item.label} ${item.value}` }}{{ }}
                  <!-- <div class="option-row"> -->
                  <!-- <BaseIcon
                      font-size="40px"
                      :name="currentType === '1'
                        ? 'fiat-bank' : 'fiat-pix-title'"
                    /> -->
                  <!-- <div class="bank-info" :class="{ 'is-mobile': isLessThanXs }">
                      <p>{{ item.label }}</p>
                      <p>{{ item.value }}</p>
                    </div> -->
                  <!-- </div> -->
                </div>
              </template>
            </BaseSelect>
          </BaseLabel>
          <div class="amount">
            <div class="top">
              <span class="label">{{ t('amount') }}
                <span style="color: var(--tg-text-error);">*</span></span>
            </div>
            <BaseInput
              ref="amountRef"
              v-model="amount"
              :msg="amountError"
              type="number"
              msg-after-touched
              @on-right-button="maxNumber"
              @blur="formatAmount"
            >
              <template #right-icon>
                <AppCurrencyIcon :currency-type="activeCurrency?.type" />
              </template>
              <template #right-button>
                <span>{{ t('max') }}</span>
              </template>
            </BaseInput>
          </div>
          <AppPasswordInput ref="passwordRef" v-model="payPassword" />
          <!-- </BaseLabel> -->
          <!-- <BaseLabel :label="t('menu_title_settings_update_safepwd')" must>
            <BaseInput
              v-model="payPassword"
              :msg="payPasswordError"
              type="password"
              max="6"
            />
          </BaseLabel> -->
          <BaseButton bg-style="secondary" size="md" @click="withDrawSubmit">
            {{ t('menu_title_settings_withdrawals') }}
          </BaseButton>
        </div>
      </div>
    </template>
    <template v-else>
      <BaseEmpty :description="t('data_empty')" icon="uni-empty-betslip" />
    </template>
  </div>
</template>

<style>
/* .app-with.v-popper--theme-tg-popper-outer.v-popper--theme-dropdown .v-popper__arrow-inner,
.app-with.v-popper--theme-tg-popper-outer.v-popper--theme-dropdown .v-popper__arrow-outer,
.app-with.v-popper--theme-tg-popper-outer-deep.v-popper--theme-dropdown
.v-popper__arrow-inner,
.app-with.v-popper--theme-tg-popper-outer-deep.v-popper--theme-dropdown
.v-popper__arrow-outer {
  border-color: var(--tg-secondary-main);
} */
</style>

<style lang='scss' scoped>
.app-fiat-withdrawal{
  .bind-identity{
    display: flex;
    flex-direction: column;
    gap:.75rem;
    .bind-tips{
      text-align: center;
      color: var(--tg-text-warn);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .25rem;
      margin-bottom: var(--tg-spacing-5);
    }
    .base-select{
      --tg-base-select-style-padding-y: var(--tg-spacing-8);
    }
    .checkbox-wrap{
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
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
  .withdrawal-wrap{
    display: flex;
    flex-direction: column;
    gap:  var(--tg-spacing-16);
    .withdrawal-info{
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-16);
      .popper-label{
        display: flex;
        align-items: center;
        gap: .25rem;
      }
    }
  }
  .not-payment-msg{
    gap: 16px;
    .msg-warp{
      display: flex;
      width: 100%;
      gap: 4px;
      justify-content: center;
      padding: 27px 0;
      border: var(--tg-border-width-sm) dashed var(--tg-secondary-light);
      border-radius: 2px;
      background-color: #0F212E;
      font-size: var(--tg-font-size-default);
    }
  }

}
// .bank-options{
//   .option-row {
//     display: flex;
//     align-items: center;
//     gap: 0.75rem;
//     color: var(--tg-text-white);
//     cursor: pointer;
//     .bank-info{
//       display: flex;
//       align-items: center;
//       :nth-child(1){
//         margin-right: var(--tg-spacing-5);
//       }
//       p{
//         margin: var(--tg-spacing-2) 0;
//       }
//       &.is-mobile{
//         flex-direction: column;
//         align-items: self-start;
//       }
//       user-select: none;
//       -webkit-user-select: none;
//     }
//   }
// }
</style>
