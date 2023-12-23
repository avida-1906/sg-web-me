<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'

// const appStore = useAppStore()
// const { userInfo } = storeToRefs(appStore)
// const { isMobile } = storeToRefs(useWindowStore())
// const { openAgentGradeDialog } = useDialogAgentGrade()
const { t } = useI18n()

const activeCurrency = ref<CurrencyData | null>()
const currentTab = ref()

const tabList = computed(() => [
  { label: t('commission_transfer'), value: 'transfer' },
  { label: t('menu_title_settings_withdrawals'), value: 'withdraw' },
])
const isTransfer = computed(() => currentTab.value === 'transfer')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return application.isVirtualCurrency(activeCurrency.value.type)

  return false
})
</script>

<template>
  <div class="app-commission-holder">
    <AppCommissionHolder />
    <!-- <BaseTab v-model="currentTab" :list="tabList" /> -->
    <!-- <template v-if="isWithdraw && activeCurrency">
      <Suspense timeout="0">
        <AppWithdraw
          v-if="isVirCurrency"
          :max-withdraw-balance="withdrawBalance?.withdraw_balance"
          :active-currency="activeCurrency"
          :current-network="currentNetwork"
        />
        <AppFiatWithdrawal
          v-else
          :max-withdraw-balance="withdrawBalance?.withdraw_balance"
          :active-currency="activeCurrency"
        />
        <template #fallback>
          <div class="center dialog-loading-height">
            <BaseLoading />
          </div>
        </template>
      </Suspense>
    </template> -->
  </div>
</template>

<style lang="scss" scoped>
</style>
