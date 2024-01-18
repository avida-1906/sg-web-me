<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  activeCurrency: CurrencyData
  currentNetwork: string
}

const props = defineProps<Props>()

const emit = defineEmits(['show'])
const amountRef = ref()
const currentAisle = ref()
const aisleId = ref()
const depositStep = ref('1')
const backDepositInfo: {
  address: string
  amount: string
  id?: string
} = reactive({
  address: '',
  amount: '',
})
const { t } = useI18n()
const {
  getVirContractName,
} = useCurrencyData()
const {
  value: amount,
  errorMessage: amountError,
  validate: amountValidate,
  resetField: amountReset,
} = useField<string>('amount', (value) => {
  const Value = Number(value)
  if (!Value)
    return currentAisle.value?.amount_type === 1 ? t('select_amount') : t('input_amount')
  else if (currentAisle.value?.amount_min && Value < Number(currentAisle.value?.amount_min))
    return `${t('min_amount_is')}${currentAisle.value?.amount_min}`
  else if (currentAisle.value?.amount_max && Value > Number(currentAisle.value?.amount_max))
    return `${t('max_amount_is')}${currentAisle.value?.amount_max}`

  return ''
})
const {
  run: runFinanceThirdCoinDeposit,
  loading: financeThirdCoinDepositLoading,
} = useRequest(ApiFinanceThirdCoinDeposit, {
  onSuccess(data) {
    backDepositInfo.address = data.address
    backDepositInit(data)
  },
})
const {
  runAsync: runAsyncFinanceMerchantCoinList,
  data: paymentMethodCoinList,
  loading: financeMerchantCoinListLoad,
} = useRequest(ApiFinanceMerchantCoinList, {
  onSuccess(data) {
    paymentMethodCoinList.value = data.map((item) => {
      return {
        ...item,
        label: item.name,
        value: item.id,
      }
    })
    aisleId.value = data[0].id
    currentAisle.value = data[0]
  },
})
const {
  run: runPaymentDepositCoinApplication,
  loading: paymentDepositCoinInfoLoading,
} = useRequest(ApiPaymentDepositCoinApplication, {
  onSuccess(data) {
    backDepositInfo.address = data.deposit_coin.wallet_address
    backDepositInit(data)
  },
})
const {
  run: runPaymentDepositCoinConfirm,
  loading: paymentDepositCoinConfirmLoading,
} = useRequest(ApiPaymentDepositCoinConfirm, {
  onSuccess() {
    cancelPayment()
  },
})
const {
  run: runPaymentDepositCoinCancel,
  loading: paymentDepositCoinCancelLoading,
} = useRequest(ApiPaymentDepositCoinCancel, {
  onSuccess() {
    cancelPayment()
  },
})

const oftenAmount = computed(() => {
  const arr = currentAisle.value.often_amount.split(',')
  return arr.map((item: string) => {
    return {
      value: item,
      label: item,
    }
  })
})
const getFinanceMerchantCoinParam = computed(() => {
  return {
    currency_id: props.activeCurrency.cur,
    contract_id: props.currentNetwork,
  }
})
const getAmountLimit = computed(() => {
  return currentAisle.value ? `${currentAisle.value.amount_min}-${currentAisle.value.amount_max}` : ''
})

async function confirmPayment() {
  if (amountRef.value)
    amountRef.value.setTouchTrue()
  await amountValidate()
  if (!amountError.value) {
    if (currentAisle.value.payment_type === 1) { // 三方支付存款
      runFinanceThirdCoinDeposit({
        amount: amount.value,
        bank_code: '',
        cid: currentAisle.value.id,
        mid: currentAisle.value.method_id,
        currency_id: props.activeCurrency.cur,
        currency_name: props.activeCurrency.type,
        bankcard_id: currentAisle.value.bankcard_id,
      })
    }
    else if (currentAisle.value.payment_type === 2) { // 虚拟币存款(公司入款)
      runPaymentDepositCoinApplication({
        amount: amount.value,
        cid: currentAisle.value.id,
        currency_id: props.activeCurrency.cur,
        currency_name: props.activeCurrency.type,
        mid: currentAisle.value.method_id,
        bankcard_id: currentAisle.value.bankcard_id,
      })
    }
  }
}
function cancelPayment() {
  amountReset()
  depositStep.value = '1'
  emit('show', true)
}
function toCopy(item: string) {
  application.copy(item)
}
function backDepositInit(data: { amount: string; id?: string }) {
  backDepositInfo.amount = data.amount
  backDepositInfo.id = data.id
  depositStep.value = '2'
  emit('show', false)
}
function payMethodCoinselect(val: string) {
  currentAisle.value = paymentMethodCoinList.value?.find(item => item.id === val)
}

watch(() => props.activeCurrency, (newValue) => {
  if (newValue)
    (!financeMerchantCoinListLoad.value) && runAsyncFinanceMerchantCoinList(getFinanceMerchantCoinParam.value)
})
watch(() => props.currentNetwork, (newValue) => {
  if (newValue)
    runAsyncFinanceMerchantCoinList(getFinanceMerchantCoinParam.value)
})
watch(() => currentAisle.value, () => {
  amountReset()
})

await application.allSettled([
  runAsyncFinanceMerchantCoinList(getFinanceMerchantCoinParam.value),
])
</script>

<template>
  <div class="app-virtual-deposit">
    <template v-if="depositStep === '1'">
      <template v-if="paymentMethodCoinList?.length">
        <BaseLabel v-show="paymentMethodCoinList?.length > 1" :label="t('channel_choose')" must-small>
          <BaseSelect
            v-model="aisleId"
            :options="paymentMethodCoinList"
            :msg="amountError"
            small
            :show-placeholder="false"
            @select="payMethodCoinselect"
          />
          <!-- <div class="other-aisles scroll-x">
            <div
              v-for="item in paymentMethodCoinList"
              :id="item.id"
              :key="item.id"
              class="aisle"
              :class="currentAisle.id === item.id ? 'active' : ''"
              @click="currentAisle = item"
            >
              <span>{{ item.name }}</span>
              <span>{{ item.amount_min }}-{{ item.amount_max }}</span>
            </div>
          </div> -->
        </BaseLabel>
        <BaseLabel v-if="currentAisle.amount_type === 2" :label="t('deposit_amount')" must-small>
          <BaseInput
            ref="amountRef"
            v-model="amount"
            :msg="amountError"
            :placeholder="getAmountLimit"
            msg-after-touched
          />
        </BaseLabel>
        <BaseLabel v-else :label="t('deposit_amount')" must-small>
          <BaseSelect
            v-if="oftenAmount && oftenAmount.length"
            v-model="amount"
            :placeholder="t('select_deposit_amount')"
            :options="oftenAmount"
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
          :loading="paymentDepositCoinInfoLoading || financeThirdCoinDepositLoading"
          @click="confirmPayment"
        >
          {{ t('confirm_pay') }}
        </BaseButton>
      </template>
      <template v-else>
        <BaseEmpty :description="t('data_empty')" icon="uni-empty-betslip" />
      </template>
    </template>
    <template v-if="depositStep === '2'">
      <div class="center">
        <AppCurrencyIcon
          :show-name="true"
          :currency-type="activeCurrency.type"
          icon-align="right"
        >
          <template #network>
            <span style="padding-right: var(--tg-spacing-4);">
              {{ getVirContractName(currentNetwork) }}
            </span>
          </template>
        </AppCurrencyIcon>
      </div>
      <BaseQrcode :url="backDepositInfo.address" />
      <div>
        <p class="second-title">
          {{ t('transfer_in_addr') }}
        </p>
        <p
          class="copy-row"
          @click="application.copy(backDepositInfo.address)"
        >
          <span>{{ backDepositInfo.address }}</span>
          <AppTooltip
            :text="t('copy_addr_suc')" icon-name="uni-doc" :triggers="['click']"
          />
        </p>
        <div class="warn-msg">
          {{ t('confirm_pls_addr_tip', { type: activeCurrency.type }) }}
        </div>
      </div>
      <div>
        <p class="second-title">
          {{ t('transfer_in_amount') }}：{{ activeCurrency.type }}
        </p>
        <p
          class="copy-row"
          @click="toCopy(backDepositInfo.amount)"
        >
          <span>{{ backDepositInfo.amount }}</span>
          <AppTooltip
            :text="t('copy_addr_suc')" icon-name="uni-doc" :triggers="['click']"
          />
        </p>
        <div class="warn-msg">
          {{ t('pls_confirm_deposit_addr') }}
        </div>
      </div>
      <div v-if="backDepositInfo.id" class="box-btn">
        <BaseButton
          type="line"
          style="border-color: var(--tg-text-blue);
          color: var(--tg-text-blue);"
          size="sm"
          :loading="paymentDepositCoinCancelLoading"
          @click="runPaymentDepositCoinCancel({ id: backDepositInfo.id ?? '' })"
        >
          {{ t('cancel_deposit') }}
        </BaseButton>
        <BaseButton
          bg-style="primary"
          size="md"
          :loading="paymentDepositCoinConfirmLoading"
          @click="runPaymentDepositCoinConfirm({ id: backDepositInfo.id ?? '' })"
        >
          {{ t('already_deposit') }}
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.app-virtual-deposit {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
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
    .warn-msg {
        line-height: 1;
        color: var(--tg-text-error);
        font-size: var(--tg-font-size-xs);
        font-weight: 500;
        margin-top: var(--tg-spacing-4);
    }
    .box-btn {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap:  var(--tg-spacing-12);
    }
}
</style>
