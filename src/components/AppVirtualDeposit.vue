<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  activeCurrency: CurrencyData
  currentNetwork: string
}

const props = defineProps<Props>()

const emit = defineEmits(['show'])
const currentAisle = ref()

const { t } = useI18n()
const {
  value: amount,
  errorMessage: amountError,
  validate: amountValidate,
  resetField: amountReset,
} = useField<string>('amount', (value) => {
  // const Value = Number(value)
  // if (!Value)
  //   return currentAisleItem.value?.type === 1 ? t('select_amount') : t('input_amount')
  // else if (currentAisleItem.value?.amount_min && Value < Number(currentAisleItem.value?.amount_min))
  //   return `${t('min_amount_is')}${currentAisleItem.value?.amount_min}`
  // else if (currentAisleItem.value?.amount_max && Value > Number(currentAisleItem.value?.amount_max))
  //   return `${t('max_amount_is')}${currentAisleItem.value?.amount_max}`

  return ''
})
const {
  run: runThirdDeposit,
  loading: thirdDepositLoading,
} = useRequest(ApiFinanceThirdDeposit, {
  onSuccess(data) {
    location.href = data
  },
})
const {
  runAsync: runAsyncFinanceMerchantCoinList,
  data: paymentMethodCoinList,
} = useRequest(ApiFinanceMerchantCoinList, {
  onSuccess() {
    currentAisle.value = paymentMethodCoinList.value
      ? paymentMethodCoinList.value[0]
      : null
  },
})
const {
  run: runPaymentDepositCoinApplication,
  data: paymentDepositCoinInfo,
  loading: paymentDepositCoinInfoLoading,
} = useRequest(ApiPaymentDepositCoinApplication, {
  onSuccess() {

  },
})

const currentAddress = ref('0xa9869670e7f9db1f6b916b90b2b7ebc546480e67')
const depositStep = ref('1')

const oftenAmount = computed(() => {
  const arr = currentAisle.value.often_amount.split(',')
  return arr.map((item: string) => {
    return {
      value: item,
      label: item,
    }
  })
})

function confirmPayment() {
  if (currentAisle.value.payment_type === 1) { // 三方支付存款
    runThirdDeposit({
      amount: amount.value,
      cid: currentAisle.value,
      mid: currentAisle.value.method_id,
      currency_id: props.activeCurrency.cur,
      currency_name: props.activeCurrency.type,
    })
  }
  else if (currentAisle.value.payment_type === 2) { // 虚拟币存款
    runPaymentDepositCoinApplication({
      amount: amount.value,
      cid: currentAisle.value.id,
      currency_id: props.activeCurrency.cur,
      currency_name: props.activeCurrency.type,
      mid: currentAisle.value.method_id,
    })
  }

  depositStep.value = '2'
  emit('show', false)
}
function cancelPayment() {
  depositStep.value = '1'
  emit('show', true)
}
function changeAisle(item) {
  currentAisle.value = item
}
const toCopy = function (item: string) {
  application.copy(item)
}

watch(() => props.activeCurrency, (newValue) => {
  if (newValue) {
    runAsyncFinanceMerchantCoinList({
      currency_id: props.activeCurrency.cur,
      contract_id: props.currentNetwork,
    })
  }
})
watch(() => props.currentNetwork, (newValue) => {
  if (newValue) {
    runAsyncFinanceMerchantCoinList({
      currency_id: props.activeCurrency.cur,
      contract_id: props.currentNetwork,
    })
  }
})

await application.allSettled([
  runAsyncFinanceMerchantCoinList({
    currency_id: props.activeCurrency.cur,
    contract_id: props.currentNetwork,
  }),
])
</script>

<template>
  <div class="app-virtual-deposit">
    <template v-if="depositStep === '1'">
      <template v-if="paymentMethodCoinList?.length">
        <BaseLabel :label="t('channel_choose')">
          <div class="other-aisles scroll-x">
            <div
              v-for="item in paymentMethodCoinList"
              :id="item.id"
              :key="item.id"
              class="aisle"
              :class="currentAisle.id === item.id ? 'active' : ''"
              @click="changeAisle(item)"
            >
              <span>{{ item.name }}</span>
              <span>{{ item.amount_min }}-{{ item.amount_max }}</span>
            </div>
          </div>
        </BaseLabel>
        <BaseInput
          v-model="amount" :label="`充值金额: ${activeCurrency.type}`"
          :msg="amountError"
        />
        <BaseMoneyKeyboard
          v-if="oftenAmount && oftenAmount.length"
          v-model="amount"
          :options="oftenAmount"
        />
        <BaseButton bg-style="primary" size="md" @click="confirmPayment">
          确认支付
        </BaseButton>
      </template>
      <template v-else>
        <BaseEmpty :description="t('data_empty')" icon="uni-empty-betslip" />
      </template>
    </template>
    <template v-if="depositStep === '2'">
      <AppCurrencyIcon
        :show-name="true"
        :currency-type="activeCurrency.type"
        icon-align="right"
        style="--tg-app-currency-icon-style-color:var(--tg-text-white);
        --tg-app-currency-icon-style-margin: 0 auto;
        "
      >
        <template #network>
          <span style="padding-right: var(--tg-spacing-5);">TRC20</span>
        </template>
      </AppCurrencyIcon>
      <BaseQrcode url="www.google.com" />
      <div>
        <BaseInput v-model="currentAddress" label="转入地址">
          <template #right-icon>
            <BaseIcon name="uni-doc" />
          </template>
        </BaseInput>
        <div class="warn-msg">
          请确认发送USDT到此地址，充值需要全网确认才能到账，请耐心等待！
        </div>
      </div>
      <div>
        <BaseInput v-model="amount" :label="`转入金额: ${activeCurrency.type}`">
          <template #right-icon>
            <BaseIcon name="uni-doc" />
          </template>
        </BaseInput>
        <div class="warn-msg">
          请确认收款地址存入完整金额（不含手续费），否则可能导致无法上分
        </div>
      </div>

      <div class="box-btn">
        <BaseButton
          type="line"
          style="border-color: var(--tg-text-blue);
          color: var(--tg-text-blue);"
          size="md"
          @click="cancelPayment"
        >
          取消存款申请
        </BaseButton>
        <BaseButton bg-style="primary" size="md">
          我已存款
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.app-virtual-deposit {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
    .other-aisles{
      display: flex;
      justify-content: left;
      align-items: center;
      gap: 0.75rem;
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
    .warn-msg {
        line-height: 1;
        color: var(--tg-text-error);
        font-size: var(--tg-font-size-xs);
        font-weight: 500;
    }
    .box-btn {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap:  var(--tg-spacing-12);
    }
}
</style>
