<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  /** 货币对象 */
  activeCurrency: CurrencyData
}
const props = withDefaults(defineProps<Props>(), {})

const { isLessThanXs } = storeToRefs(useWindowStore())
const { openNotify } = useNotify()

const currentWithdrawMethod = ref('')

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
    return '请选择出款银行'
  return ''
})
const {
  value: amount,
  errorMessage: amountError,
  validate: amountValidate,
  resetField: amountReset,
} = useField<string>('amount', (value) => {
  if (!value)
    return '请输入金额'
  return ''
})
const {
  value: payPassword,
  errorMessage: payPasswordError,
  validate: payPasswordValidate,
  resetField: payPasswordReset,
} = useField<string>('payPassword', (value) => {
  if (!value)
    return '请输入资金密码'
  return ''
})

const {
  runAsync: runAsyncWithdrawMethodList,
  data: withdrawMethodList,
} = useRequest(ApiFinanceWithdrawMethodList)
const {
  runAsync: runAsyncWithdrawBankcardList,
  data: withdrawBankcardList,
} = useRequest(ApiFinanceWithdrawBankcard, {
  onSuccess(data) {
    const temp = data.d.find(i => i.is_default === 1)?.bank_account
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
      message: '出款申请成功',
    })
    selectBankReset()
    amountReset()
    payPasswordReset()
  },
})

const withdrawMethodData = computed(() => {
  if (withdrawMethodList.value) {
    currentWithdrawMethod.value = withdrawMethodList.value[0].id
    return withdrawMethodList.value.map((item) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  }
  currentWithdrawMethod.value = ''
  return []
})

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

function maxNumber() {
  amount.value = props.activeCurrency.balance
}

async function withDrawSubmit() {
  await selectBankValidate()
  await amountValidate()
  await payPasswordValidate()
  if (!selectBankError.value && !amountError.value && !payPasswordError.value) {
    runWithdraw({
      currency_id: Number(props.activeCurrency.cur),
      method_id: currentWithdrawMethod.value,
      amount: amount.value,
      pay_password: payPassword.value,
      bankcard_id: bankcardId.value,
    })
  }
}

watch(() => props.activeCurrency, (newValue) => {
  runAsyncWithdrawBankcardList({ currency_id: newValue.cur })
  runAsyncWithdrawMethodList({ currency_id: newValue.cur })
  selectBankReset()
  amountReset()
  payPasswordReset()
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
    <!-- 绑定银行卡/三方账户 -->
    <div v-if="!withdrawBankcardList?.d.length" class="bank-bind">
      <AppAddBankcards
        :is-first="true"
        :container="false"
        :active-currency="activeCurrency"
        :current-type="currentType"
      />
    </div>
    <!-- 出款信息 -->
    <div v-else class="withdrawal-wrap">
      <AppWithdrawalDepositType
        v-model="currentWithdrawMethod"
        :current-type="withdrawMethodData"
      />
      <div class="withdrawal-info">
        <BaseLabel :label="currentType === '1' ? '出款银行卡' : 'PIX账号'" must>
          <BaseSelect
            v-model="selectBank"
            :options="bindBanks"
            :msg="selectBankError"
            must theme popper border
            :style="{ '--tg-base-select-popper-style-padding-y': 'var(--tg-spacing-12)' }"
          >
            <template #label>
              <span class="popper-label">
                <BaseIcon v-if="defaultBank" name="fiat-bank" />
                {{ defaultBank }}
              </span>
            </template>
            <template #option="{ data: { item, parentWidth } }">
              <div
                class="scroll-x bank-options"
                :style="{ width: `${parentWidth + 24}px` }"
              >
                <div class="option-row">
                  <BaseIcon name="fiat-bank" />
                  <div class="bank-info" :class="{ 'is-mobile': isLessThanXs }">
                    <p>{{ item.label }}</p>
                    <p>{{ item.value }}</p>
                  </div>
                </div>
              </div>
            </template>
          </BaseSelect>
        </BaseLabel>
        <BaseLabel label="金额" must right-text="R$ 0.00">
          <BaseInput v-model="amount" :msg="amountError" @on-right-button="maxNumber">
            <template #right-button>
              <span>最大值</span>
            </template>
          </BaseInput>
        </BaseLabel>
        <BaseLabel label="资金密码" must>
          <BaseInput
            v-model="payPassword"
            :msg="payPasswordError"
            type="password"
            max="6"
          />
        </BaseLabel>
        <BaseButton bg-style="primary" size="md" @click="withDrawSubmit">
          提款
        </BaseButton>
      </div>
    </div>
  </div>
</template>

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
  .withdrawal-wrap{
    display: flex;
    flex-direction: column;
    gap: .75rem;
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
    }
  }
}
</style>
