<script setup lang='ts'>
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  activeTab?: string
  initCurrency?: EnumCurrencyKey
}
const props = withDefaults(defineProps<Props>(), {
  activeTab: 'deposit',
})

const { t } = useI18n()
const {
  brandBaseDetail, runAsyncBrandBaseDetail,
} = useBrandBaseDetail()
const { getComponent, isEmailVerify } = useUserVerify()
const { bool: loadFirst, setFalse: setLoadFirstFalse } = useBoolean(true)
const {
  currentCurrency: currentCur,
} = useCurrencyData()

const currencyType = ref(props.initCurrency ?? currentCur.value)
const currentTab = ref(props.activeTab)

const tabList = computed(() => {
  const arr = [
    { label: t('pop_up_wallet_tap_card_deposit'), value: 'deposit' },
    { label: t('menu_title_settings_withdrawals'), value: 'withdraw' },
    { label: t('card_wallet'), value: 'cardHolder' },
  ]
  if (brandBaseDetail.value?.exchange === 1)
    arr.push({ label: t('money_exchange'), value: 'exchange' })

  return arr
})
const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
const isCardHolder = computed(() => currentTab.value === 'cardHolder')
const isExchange = computed(() => currentTab.value === 'exchange')

// function awaitHandle() {
//   return new Promise((resolve) => {
//     const timer = setInterval(() => {
//       if (!loadingAuthConfig.value) {
//         clearInterval(timer)
//         return resolve(true)
//       }
//     }, 3000)
//   })
// }

await application.allSettled([runAsyncBrandBaseDetail({ tag: 'base' })])
</script>

<template>
  <div class="app-wallet-dialog">
    <div class="content">
      <BaseTab v-model="currentTab" :list="tabList" @change="setLoadFirstFalse()" />
    </div>
    <template v-if="isWithdraw || isCardHolder">
      <template v-if="!getComponent">
        <!-- 提款 -->
        <template v-if="isWithdraw">
          <Suspense timeout="0">
            <AppWalletWithdraw v-model="currencyType" @to-holder="currentTab = 'cardHolder'" />
            <template #fallback>
              <div class="center dialog-loading-height">
                <BaseLoading />
              </div>
            </template>
          </Suspense>
        </template>
        <!-- 卡包 -->
        <template v-else-if="isCardHolder">
          <Suspense timeout="0">
            <AppCardHolder v-model="currencyType" :init-currency="initCurrency" />
            <template #fallback>
              <div class="center dialog-loading-height">
                <BaseLoading />
              </div>
            </template>
          </Suspense>
        </template>
      </template>
      <template v-else>
        <Suspense timeout="0">
          <component :is="getComponent" :tip-text="$t('menu_title_settings_withdrawals')" />
          <template #fallback>
            <div class="center dialog-loading-height">
              <BaseLoading />
            </div>
          </template>
        </Suspense>
      </template>
    </template>
    <template v-else>
      <!-- 存款 -->
      <template v-if="isDeposit">
        <template v-if="loadFirst">
          <AppWalletDeposit v-model="currencyType" />
        </template>
        <template v-else>
          <Suspense timeout="0">
            <AppWalletDeposit v-model="currencyType" />
            <template #fallback>
              <div class="center dialog-loading-height">
                <BaseLoading />
              </div>
            </template>
          </Suspense>
        </template>
      </template>
      <!-- 转换 -->
      <AppMoneyExchange v-else-if="isExchange" />
    </template>
  </div>
  <AppAuthWarp v-if="isEmailVerify" />
  <!-- <div
    v-if="(isWithdraw || isDeposit || isExchange) && isOpenVerify && !isSetAuth"
    class="safe-bottom"
  >
    <div>{{ t('improve_safe_level') }}</div>
    <BaseButton
      bg-style="primary" size="md"
      @click="router.push('/settings/security-safe-check'); closeDialog()"
    >
      {{ t('turn_on_double_check') }}
    </BaseButton>
  </div> -->
</template>

<style lang='scss' scoped>
.app-wallet-dialog {
  --tg-base-input-style-placeholder-color: var(--tg-text-lightgrey);
  --tg-base-input-style-placeholder-opacity: 1;
  padding: 0 16px 16px;
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-lightgrey);
  .content {
    // padding-right: var(--tg-spacing-16);
    // padding-left: var(--tg-spacing-16);
    padding-bottom: var(--tg-spacing-16);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
  }
}
  .safe-bottom{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #0f212e;
    padding: 20px 16px;
    gap: var(--tg-spacing-14);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
  }
</style>
