<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  modelValue: EnumCurrencyKey
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const activeCurrency = ref<CurrencyData | null>()
const currentNetwork = ref('')
const { bool: showWallet, setBool: setShowWalletBool } = useBoolean(true)
const { bool: loadFirst, setFalse: setLoadFirstFalse } = useBoolean(true)
const {
  renderFinanceCurrencyList,
  getVirtualCurrencyContractType,
} = useCurrencyData()
const {
  data: depositCurrency,
  runAsync: runAsyncDepositCurrency,
} = useRequest(ApiFinanceDepositCurrency, {
  onSuccess(data) {
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
  if (isHand) {
    setLoadFirstFalse()
    emit('update:modelValue', item.type)
  }
}
function handleShow(val: boolean) {
  setShowWalletBool(val)
}

await application.allSettled(
  [runAsyncDepositCurrency()],
)
</script>

<template>
  <div class="app-wallet-deposit">
    <AppSelectCurrency
      v-show="showWallet"
      class="mb-16"
      :type="4"
      :active-type="modelValue"
      :active-currency-list="depositCurrency"
      :show-balance="false"
      :network="isVirCurrency"
      placeholder="search"
      @change="changeCurrency"
    />
    <template v-if="activeCurrency">
      <template v-if="loadFirst">
        <AppVirtualDeposit
          v-if="isVirCurrency"
          :active-currency="activeCurrency"
          :current-network="currentNetwork"
          @show="handleShow"
        />
        <AppFiatDeposit
          v-else
          :active-currency="activeCurrency"
          @show="handleShow"
        />
      </template>
      <template v-else>
        <Suspense timeout="0">
          <AppVirtualDeposit
            v-if="isVirCurrency"
            :active-currency="activeCurrency"
            :current-network="currentNetwork"
            @show="handleShow"
          />
          <AppFiatDeposit
            v-else
            :active-currency="activeCurrency"
            @show="handleShow"
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

<style lang="scss" scoped>

</style>
