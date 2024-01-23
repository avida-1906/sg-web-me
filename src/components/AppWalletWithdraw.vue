<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  modelValue: EnumCurrencyKey
}

const props = defineProps<Props>()
const emit = defineEmits(['toHolder', 'update:modelValue'])
const activeCurrency = ref<CurrencyData | null>()
const currentNetwork = ref('')
const { bool: loadFirst, setFalse: setLoadFirstFalse } = useBoolean(true)
const {
  renderFinanceCurrencyList,
  getVirtualCurrencyContractType,
} = useCurrencyData()
const {
  data: withdrawBalance,
  run: runWithdrawBalance,
  loading: loadingWithdrawBalance,
} = useRequest(ApiFinanceWithdrawBalance)
const {
  data: withdrawCurrency,
  runAsync: runAsyncWithdrawCurrency,
} = useRequest(ApiFinanceWithdrawCurrency, {
  onSuccess(data) {
    console.log(props.modelValue)
    const list = renderFinanceCurrencyList.value(data)
    activeCurrency.value = list.find(item => item.type === props.modelValue) ?? list[0]
    emit('update:modelValue', activeCurrency.value.type)
    currentNetwork.value = getVirtualCurrencyContractType(activeCurrency.value.type)[0].value
  },
})

const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return application.isVirtualCurrency(activeCurrency.value.type)

  return false
})

function changeCurrency(item: CurrencyData, network: string, isHand: boolean) {
  activeCurrency.value = item
  currentNetwork.value = network
  !loadingWithdrawBalance.value && runWithdrawBalance({
    currency_id: item.cur,
  })
  if (isHand) {
    setLoadFirstFalse()
    emit('update:modelValue', item.type)
  }
}

await application.allSettled(
  [runAsyncWithdrawCurrency()],
)
</script>

<template>
  <div class="app-wallet-withdraw">
    <AppSelectCurrency
      class="mb-16"
      :type="4"
      :active-currency-list="withdrawCurrency"
      :active-type="modelValue"
      :show-balance="true"
      :network="isVirCurrency"
      placeholder="search"
      @change="changeCurrency"
    />
    <template v-if="activeCurrency">
      <template v-if="loadFirst">
        <AppWithdraw
          v-if="isVirCurrency"
          :max-withdraw-balance="withdrawBalance?.withdraw_balance"
          :active-currency="activeCurrency"
          :current-network="currentNetwork"
          @to-holder="emit('toHolder')"
        />
        <!-- @to-holder="emit('toHolder')'" -->
        <AppFiatWithdrawal
          v-else
          :max-withdraw-balance="withdrawBalance?.withdraw_balance"
          :active-currency="activeCurrency"
          @to-holder="emit('toHolder')"
        />
      </template>
      <template v-else>
        <Suspense timeout="0">
          <AppWithdraw
            v-if="isVirCurrency"
            :max-withdraw-balance="withdrawBalance?.withdraw_balance"
            :active-currency="activeCurrency"
            :current-network="currentNetwork"
            @to-holder="emit('toHolder')"
          />
          <AppFiatWithdrawal
            v-else
            :max-withdraw-balance="withdrawBalance?.withdraw_balance"
            :active-currency="activeCurrency"
            @to-holder="emit('toHolder')"
          />
          <template #fallback>
            <div class="center dialog-loading-height">
              <BaseLoading />
            </div>
          </template>
        </Suspense>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
