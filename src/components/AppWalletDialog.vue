<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  activeTab?: string
}
const props = withDefaults(defineProps<Props>(), {
  activeTab: 'deposit',
})

const { t } = useI18n()
const { bool: showWallet, setBool: setShowWalletBool } = useBoolean(true)
const { isVirtualCurrency } = useCurrencyData()

const activeCurrency = ref<CurrencyData | null>()
const currentTab = ref(props.activeTab)
const tabList = [
  { label: t('deposit'), value: 'deposit' },
  { label: t('withdraw'), value: 'withdraw' },
  { label: '卡包', value: 'cardHolder' },
]

const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
const isCardHolder = computed(() => currentTab.value === 'cardHolder')

function changeCurrency(item: CurrencyData) {
  activeCurrency.value = item
}
function handleShow(val: boolean) {
  setShowWalletBool(val)
}
</script>

<template>
  <div class="app-wallet-dialog">
    <div class="content">
      <BaseTab v-model="currentTab" :list="tabList" />
      <AppSelectCurrency
        v-show="showWallet && !isCardHolder"
        :show-balance="isWithdraw"
        :network="true"
        @change="changeCurrency"
      />
      <!-- 存款 -->
      <template v-if="isDeposit && activeCurrency">
        <AppVirtualDeposit
          v-if="isVirtualCurrency(activeCurrency?.type)"
          :active-currency="activeCurrency?.type"
          @show="handleShow"
        />
        <AppFiatDeposit
          v-else
          :active-currency="activeCurrency"
          @show="handleShow"
        />
      </template>
      <!-- 取款 -->
      <template v-else-if="isWithdraw && activeCurrency">
        <Suspense timeout="0">
          <AppWithdraw
            v-if="isVirtualCurrency(activeCurrency?.type)"
            :active-currency="activeCurrency"
          />
          <AppFiatWithdrawal v-else :active-currency="activeCurrency" />
          <template #fallback>
            <div class="center dialog-loading-height">
              <BaseLoading />
            </div>
          </template>
        </Suspense>
      </template>
    </div>
    <!-- 卡包 -->
    <KeepAlive>
      <template v-if="isCardHolder">
        <Suspense timeout="0">
          <AppCardHolder />
          <template #fallback>
            <div class="center dialog-loading-height">
              <BaseLoading />
            </div>
          </template>
        </Suspense>
      </template>
    </KeepAlive>
  </div>
</template>

<style lang='scss' scoped>
.app-wallet-dialog {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-lightgrey);
  .content {
    padding-right: var(--tg-spacing-16);
    padding-left: var(--tg-spacing-16);
    padding-bottom: var(--tg-spacing-16);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
  }
}
</style>
