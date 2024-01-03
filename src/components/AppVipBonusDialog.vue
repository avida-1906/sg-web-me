<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  vipBonus?: string
  vipBonusId?: string
}

const props = defineProps<Props>()

const emit = defineEmits(['confirm'])

const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const appStore = useAppStore()
const { exchangeRateData } = storeToRefs(appStore)
const { openNotify } = useNotify()
const {
  value: amount,
  //   setValue: setAmount,
  errorMessage: amountMsg,
//   validate: valiAmount,
//   resetField: amountReset,
} = useField<string>('amount', (value) => {

})
const { selected: typeVal, list: options } = useSelect([
  {
    label: '日奖金',
    value: '1',
  },
  {
    label: '周奖金',
    value: '2',
  },
  {
    label: '月奖金',
    value: '3',
  },
  {
    label: t('finance_other_tab_all'),
    value: '4',
  },
])

const currentNetwork = ref('')
const activeCurrency = ref<CurrencyData | null>()

const rate = computed(() => {
  const temp = exchangeRateData.value?.rates
  if (temp && temp['706'] && activeCurrency.value)
    return temp['706'][activeCurrency.value.cur] || '1'
  return '1'
})

function changeCurrency(item: CurrencyData, network: string) {
  activeCurrency.value = item
  currentNetwork.value = network
}
function selectTypeChange(item: string) {
  typeVal.value = item
}
</script>

<template>
  <div class="app-receive-bonus">
    <!-- <div class="amount"> -->
    <BaseLabel label="活动奖金">
      <BaseInput v-model="amount" :msg="amountMsg" type="number" msg-after-touched>
        <template #right-button>
          <BaseSelect
            :model-value="typeVal" popper plain-popper-label :options="options"
            @select="selectTypeChange"
          />
        </template>
      </BaseInput>
    </BaseLabel>
    <div>
      <div class="top-label">
        <span>以 ETH 结算</span>
        <span>汇率{{ rate }}</span>
      </div>
      <BaseInput v-model="amount" :msg="amountMsg" type="number" msg-after-touched>
        <template #right-button>
          <AppSelectCurrency
            :type="3" :show-balance="false"
            popper-clazz="app-wallet-cur" placeholder="search"
            @change="changeCurrency"
          />
        </template>
      </BaseInput>
    </div>
    <BaseButton bg-style="secondary" size="md">
      领取
    </BaseButton>
    <div class="tips">
      领取说明：本活动奖金均是以USDT发放；您可以自行选择领取的货币，货币间汇率采用市场实时汇率。
    </div>
  </div>
</template>

<style>
.app-wallet-cur {
    --tg-app-select-currency-poptop-width: 136px;
}
</style>

<style lang="scss" scoped>
.app-receive-bonus {
    display: flex;
    flex-direction: column;
    --tg-app-select-currency-bg: none;
    --tg-base-input-right-button-padding: 0 0;
    --tg-base-select-hover-bg-color: none;
    // --tg-app-select-currency-padding-x: 0;
    // --tg-app-select-currency-padding-y: 0;
    gap: var(--tg-spacing-14);
    padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
    font-size: var(--tg-font-size-default);
    color: var(--tg-secondary-light);

    .top-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
    }

    .tips {
        font-size: var(--tg-font-size-xs);
        font-weight: var(--tg-font-weight-semibold);
        text-align: left;
        line-height: 1.4;
    }
}
</style>
