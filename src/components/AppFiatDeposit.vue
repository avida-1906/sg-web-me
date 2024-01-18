<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface IPaymentMerchantData {
  label: string
  value: string
  type: number
  amount_fixed: string
  often_amount: string
  amount_min: string
  amount_max: string
}
type TOftenAmount = Pick<IPaymentMerchantData, 'label' | 'value'>
interface Props {
  activeCurrency: CurrencyData
}
const props = defineProps<Props>()
const emit = defineEmits(['show'])

const { t } = useI18n()

const amountRef = ref()
const currentType = ref('')
const currentAisle = ref('')
const currentAisleItem = ref<IPaymentMerchantData>()
const oftenAmount = ref<TOftenAmount[]>()
const fixedAmount = ref<TOftenAmount[]>()

const { bool: isConfirmPayment, setBool: setConfirmPayment } = useBoolean(false)
const {
  value: amount,
  errorMessage: amountError,
  validate: amountValidate,
  resetField: amountReset,
  setValue: setAmount,
} = useField<string>('amount', (value) => {
  const Value = Number(value)
  if (!value)
    return currentAisleItem.value?.type === 1 ? t('select_amount') : t('input_amount')
  else if (currentAisleItem.value?.amount_min && Value < Number(currentAisleItem.value?.amount_min))
    return `${t('min_amount_is')}${currentAisleItem.value?.amount_min}`
  else if (currentAisleItem.value?.amount_max && Value > Number(currentAisleItem.value?.amount_max))
    return `${t('max_amount_is')}${currentAisleItem.value?.amount_max}`

  return ''
})
const {
  value: depositName,
  errorMessage: depositNameError,
  validate: depositNameValidate,
  resetField: depositNameReset,
} = useField<string>('depositName', (value) => {
  if (!value)
    return t('pls_enter_savor_name')
  return ''
})
const {
  value: selectValue,
  errorMessage: selectValueError,
  validate: selectValueValidate,
  resetField: selectValueReset,
} = useField<string>('selectValue', (value) => {
  if (!value)
    return t('validate_msg_choose_bank')
  return ''
})

const {
  runAsync: runAsyncPaymentMethodList,
  data: paymentMethodList,
} = useRequest(ApiFinanceMethodList, {
  onSuccess(data) {
    currentType.value = data[0].id
  },
})
const {
  runAsync: runPaymentMerchantList,
  data: paymentMerchantList,
} = useRequest(ApiFinanceMerchantList)
const {
  run: runThirdDeposit,
  loading: thirdDepositLoading,
} = useRequest(ApiFinanceThirdDeposit, {
  onSuccess(data) {
    location.href = data
  },
})
const nextStep = function () {
  emit('show', false)
  setConfirmPayment(true)
}
const previous = function () {
  emit('show', true)
  amountReset()
  depositNameReset()
  setConfirmPayment(false)
}
const {
  run: runPaymentDepositBankList,
  data: paymentDepositBankList,
} = useRequest(ApiPaymentDepositBankList)
const {
  run: runPaymentDepositBankApplication,
  data: paymentDepositBankInfo,
  loading: paymentDepositBankInfoLoading,
} = useRequest(ApiPaymentDepositBankApplication, {
  onSuccess() {
    nextStep()
  },
})
const {
  run: runPaymentDepositBankConfirm,
  loading: paymentDepositBankConfirmLoading,
} = useRequest(ApiPaymentDepositBankConfirm, {
  onSuccess() {
    previous()
  },
})
const {
  run: runPaymentDepositBankCancel,
  loading: paymentDepositBankCancelLoading,
} = useRequest(ApiPaymentDepositBankCancel, {
  onSuccess() {
    previous()
  },
})

const paymentMethodData = computed(() => {
  if (paymentMethodList.value) {
    // currentType.value = paymentMethodList.value[0].id
    return paymentMethodList.value.map((i) => {
      return {
        label: i.name,
        value: i.id,
        promo: i.promo,
        pname: i.pname,
        ptype: i.ptype,
        icon: i.alias,
      }
    })
  }
  else {
    currentType.value = ''
    paymentMerchantList.value = undefined
    oftenAmount.value = []
    fixedAmount.value = []
  }
  return []
})

const strToArray = function (amounts: string) {
  const temp = amounts.split(',').filter(str => str.trim() !== '')
  return temp.map((i) => {
    return {
      label: i,
      value: i,
    }
  })
}

const paymentMerchantData = computed(() => {
  const firstMerchant = paymentMerchantList.value?.[0]
  if (firstMerchant && paymentMerchantList.value) {
    currentAisle.value = firstMerchant.id
    currentAisleItem.value = {
      label: firstMerchant.name,
      value: firstMerchant.id,
      type: firstMerchant.amount_type,
      amount_fixed: firstMerchant.amount_fixed,
      often_amount: firstMerchant.often_amount,
      amount_min: firstMerchant.amount_min,
      amount_max: firstMerchant.amount_max,
    }
    oftenAmount.value = strToArray(firstMerchant.often_amount)
    fixedAmount.value = strToArray(firstMerchant.amount_fixed)
    return paymentMerchantList.value.map((i) => {
      return {
        label: i.name,
        value: i.id,
        type: i.amount_type,
        amount_fixed: i.amount_fixed,
        often_amount: i.often_amount,
        amount_min: i.amount_min,
        amount_max: i.amount_max,
      }
    })
  }
  return []
})
const havePaymentMethod = computed(() => {
  return paymentMethodList.value && paymentMethodList.value.length
})
const havePaymentMerchant = computed(() => {
  return paymentMerchantList.value && paymentMerchantList.value.length > 1
})
const currentTypeItem = computed(() => {
  if (paymentMethodList.value)
    return paymentMethodList.value?.find(i => i.id === currentType.value)
})
const paymentDepositBankData = computed(() => {
  if (paymentDepositBankList.value) {
    return paymentDepositBankList.value.map((i) => {
      return {
        label: i.name,
        value: i.id,
      }
    })
  }
  return []
})
const isPaymentDepositBank = computed(() => {
  return currentTypeItem.value?.payment_type === 2
})
const getAmountLimit = computed(() => {
  return (paymentMerchantList.value?.length ?? 0) > 1
    ? ''
    : `${currentAisleItem.value?.amount_min}-${currentAisleItem.value?.amount_max}`
})

function formatAmount() {
  if (amount.value)
    setAmount(Number.parseInt(amount.value).toString())
}
const toCopy = function (item: string) {
  application.copy(item)
}
const changeAisle = function (item: IPaymentMerchantData) {
  const ref: HTMLElement | null = document.querySelector(`#id${item.value}`)
  const parentRef = ref?.parentElement
  if (parentRef && ref) {
    const parentHalfWidth = parentRef?.offsetWidth / 2
    const refHalfWidth = ref?.offsetWidth / 2
    const left = ref.offsetLeft - parentHalfWidth + refHalfWidth
    // parentRef.scrollLeft = ref.offsetLeft - parentHalfWidth + refHalfWidth
    parentRef.scrollTo({ left, behavior: 'smooth' })
  }

  currentAisle.value = item.value
  currentAisleItem.value = item
  oftenAmount.value = strToArray(item.often_amount)
  fixedAmount.value = strToArray(item.amount_fixed)
  amountReset()
}
async function depositSubmit() {
  if (amountRef.value)
    amountRef.value.setTouchTrue()
  await amountValidate()
  await selectValueValidate()
  await depositNameValidate()
  if (!amountError.value
    && (currentTypeItem.value?.bank ? !selectValueError.value : true)
  ) {
    if (isPaymentDepositBank.value) { // 公司入款存款
      !depositNameError.value && runPaymentDepositBankApplication({
        amount: amount.value,
        cid: currentAisle.value,
        mid: currentType.value,
        currency_id: props.activeCurrency.cur,
        currency_name: props.activeCurrency.type,
        realname: depositName.value,
        bankcard_id: currentTypeItem.value?.bankcard_id,
      })
    }
    else { // 三方支付存款
      runThirdDeposit({
        amount: amount.value,
        cid: currentAisle.value,
        mid: currentType.value,
        bank_code: selectValue.value ?? '',
        currency_id: props.activeCurrency.cur,
        currency_name: props.activeCurrency.type,
      })
    }
  }
}
function formatBankAccount(s: string) {
  if (s.length > 10)
    return s.replace(/(\d{4})(?=\d)/g, '$1 ')

  else
    return s.replace(/(\d{4})(?=\d)/, '$1 ').replace(/(.{8})(?=.)/, '$1 ')
}
function awaitHandle() {
  return new Promise((resolve) => {
    runAsyncPaymentMethodList({ currency_id: props.activeCurrency.cur }).then(() => {
      runPaymentMerchantList({ id: currentType.value }).then(() => {
        resolve(true)
      })
    })
  })
}

watch(() => props.activeCurrency, (newValue) => {
  if (newValue)
    runAsyncPaymentMethodList({ currency_id: newValue.cur })
})
watch(() => currentType.value, (newValue, oldValue) => {
  oldValue && runPaymentMerchantList({ id: currentType.value })
  amountReset()
  depositNameReset()
  selectValueReset()
  if (currentTypeItem.value?.bank)
    runPaymentDepositBankList({ id: currentTypeItem.value.zkId })
})

await application.allSettled([awaitHandle()])
</script>

<template>
  <div class="app-fiat-currency-deposit">
    <div class="deposit-wrap">
      <template v-if="havePaymentMethod">
        <!-- 公司入款存款 -->
        <div v-if="isConfirmPayment" class="type-online-bank">
          <div class="bank-second">
            <div>
              <p class="second-title">
                {{ t('savor_name') }}
              </p>
              <p
                class="copy-row"
                @click="toCopy(paymentDepositBankInfo?.bankcard.open_name ?? '')"
              >
                <span>{{ paymentDepositBankInfo?.bankcard.open_name }}</span>
                <AppTooltip
                  :text="t('copy_addr_suc')" icon-name="uni-doc" :triggers="['click']"
                />
              </p>
            </div>
            <p
              class="copy-row"
              @click="toCopy(paymentDepositBankInfo?.bankcard.bank_account ?? '')"
            >
              <span>{{
                formatBankAccount(paymentDepositBankInfo?.bankcard.bank_account ?? '')
              }}</span>
              <AppTooltip
                :text="t('copy_addr_suc')" icon-name="uni-doc" :triggers="['click']"
              />
            </p>
            <p class="copy-row">
              <span class="center" style="gap: 8px;">
                <BaseIcon name="fiat-bank" />
                {{ paymentDepositBankInfo?.bankcard.bank_id }}
              </span>
            </p>
            <p
              v-if="activeCurrency.type === 'CNY'"
              class="copy-row"
              @click="toCopy(paymentDepositBankInfo?.bankcard.bank_area_cpf ?? '')"
            >
              <span>
                {{ t('open_addr') }}：{{ paymentDepositBankInfo?.bankcard.bank_area_cpf }}
              </span>
              <AppTooltip
                :text="t('copy_addr_suc')" icon-name="uni-doc" :triggers="['click']"
              />
            </p>
            <div>
              <p class="copy-row" @click="toCopy(paymentDepositBankInfo?.amount ?? '')">
                <span>{{ t('transfer_amount') }}：{{
                  `${paymentDepositBankInfo?.amount} ${activeCurrency.prefix}` }}</span>
                <AppTooltip
                  :text="t('copy_addr_suc')" icon-name="uni-doc" :triggers="['click']"
                />
              </p>
              <p class="second-tips">
                {{ t('transfer_amount_equal_order') }}
              </p>
            </div>
            <div class="second-btns">
              <BaseButton
                type="line"
                style="border-color: var(--tg-text-blue);
                color: var(--tg-text-blue);"
                size="sm"
                :loading="paymentDepositBankCancelLoading"
                @click="runPaymentDepositBankCancel(
                  { id: paymentDepositBankInfo?.id ?? '' })"
              >
                {{ t('cancel_deposit') }}
              </BaseButton>
              <BaseButton
                bg-style="primary"
                size="md"
                :loading="paymentDepositBankConfirmLoading"
                @click="runPaymentDepositBankConfirm(
                  { id: paymentDepositBankInfo?.id ?? '' })"
              >
                {{ t('already_deposit') }}
              </BaseButton>
            </div>
            <div class="second-tips2">
              <BaseIcon name="uni-error" />
              {{ t('confirm_transfer_ontime') }}
            </div>
          </div>
        </div>
        <!-- 三方支付存款 -->
        <div v-else class="type-other">
          <BaseLabel label="支付方式" must-small>
            <AppWithdrawalDepositType
              v-if="havePaymentMethod"
              v-model="currentType"
              :current-type="paymentMethodData"
              style="margin-bottom: 12px;"
            />
          </BaseLabel>
          <div class="other-first">
            <BaseLabel
              v-if="currentTypeItem && currentTypeItem.bank"
              :label="t('bank_choose')"
              must-small
            >
              <BaseSelect
                v-model="selectValue"
                :options="paymentDepositBankData"
                :msg="selectValueError"
                small
              />
            </BaseLabel>
            <BaseLabel
              v-show="havePaymentMerchant && !isPaymentDepositBank"
              :label="t('channel_choose')"
            >
              <div class="scroll-x other-aisles">
                <div
                  v-for="item in paymentMerchantData"
                  :id="`id${item.value}`"
                  :key="item.value"
                  class="aisle"
                  :class="currentAisle === item.value ? 'active' : ''"
                  @click="changeAisle(item)"
                >
                  <span>{{ item.label }}</span>
                  <span>{{ item.amount_min }}-{{ item.amount_max }}</span>
                </div>
              </div>
            </BaseLabel>
            <BaseLabel v-if="isPaymentDepositBank" must-small :label="t('deposit_name')">
              <BaseInput v-model="depositName" :msg="depositNameError" />
            </BaseLabel>
            <BaseLabel
              v-if="currentAisleItem?.type === 2"
              :label="`${t('deposit_amount')} ${activeCurrency.prefix}`"
            >
              <BaseInput
                ref="amountRef"
                v-model="amount"
                :placeholder="getAmountLimit"
                :msg="amountError"
                msg-after-touched
                @blur="formatAmount"
              />
            </BaseLabel>
            <BaseLabel v-else :label="t('deposit_amount')" must-small>
              <BaseSelect
                v-if="fixedAmount && fixedAmount.length"
                v-model="amount"
                :placeholder="t('select_deposit_amount')"
                :options="fixedAmount"
                :msg="amountError"
                small
                show-placeholder
              />
            </BaseLabel>
            <BaseMoneyKeyboard
              v-if="oftenAmount && oftenAmount.length"
              v-model="amount"
              :options="oftenAmount"
            />
            <BaseButton
              bg-style="secondary"
              size="md"
              :loading="thirdDepositLoading || paymentDepositBankInfoLoading"
              @click="depositSubmit"
            >
              {{ t('confirm_pay') }}
            </BaseButton>
          </div>
        </div>
      </template>
      <template v-else>
        <BaseEmpty :description="t('data_empty')" icon="uni-empty-betslip" />
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-fiat-currency-deposit{
  --tg-select-placeholder-color: var(--tg-secondary-light);
  .deposit-wrap{
    display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-16);
    .type-online-bank{
      .bank-second{
        display: flex;
        flex-direction: column;
        gap: var(--tg-spacing-16);
      }
      .bank-second{
        .second-title{
          margin-bottom: var(--tg-spacing-4);
          color: var(--tg-text-lightgrey);
        }
        .copy-row{
          max-width: 100%;
          border-radius: var(--tg-radius-default);
          border: 1px solid var(--tg-secondary-main);
          padding: var(--tg-spacing-12) var(--tg-spacing-12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--tg-text-white);
          cursor: pointer;
          background-color: var(--tg-secondary-dark);
        }
        .second-tips{
          color:var(--tg-text-error);
          font-size: var(--tg-font-size-xs);
          margin-top: var(--tg-spacing-4);
        }
        .second-btns{
          display: flex;
          gap: var(--tg-spacing-12);
          button{
            width: 100%;
          }
        }
        .second-tips2{
          display: flex;
          justify-content: left;
          align-items: center;
          color:var(--tg-text-error);
          font-size: var(--tg-font-size-xs);
          gap: .25rem;
        }
      }
    }
    .type-other{
      .other-first{
        display: flex;
        flex-direction: column;
        gap: 16px;
        .other-aisles{
          display: flex;
          justify-content: left;
          align-items: center;
          gap: var(--tg-spacing-12);
          // overflow: hidden;
          &::-webkit-scrollbar-thumb{
              display: none;
            }
          .aisle{
            flex-shrink: 0;
            padding: var(--tg-spacing-4) var(--tg-spacing-8);
            background-color: var(--tg-secondary-dark);
            border-radius: var(--tg-radius-default);
            box-shadow: var(--tg-box-shadow);
            cursor: pointer;
            font-size: var(--tg-font-size-xs);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            // gap: .75rem;
            flex-direction: column;
            line-height: 17px;
            &:hover{
              opacity: .9;
            }
            &.active{
              background: var(--tg-text-blue);
              color: var(--tg-text-white);
            }
            &:active{
                span{
                  transform: scale(.96);
                }
            }
          }
        }
      }
    }
  }
}
</style>
