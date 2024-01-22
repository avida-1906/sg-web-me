<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  activeTab?: string
  initCurrency?: EnumCurrencyKey
}
const props = withDefaults(defineProps<Props>(), {
  activeTab: 'deposit',
})

const { t } = useI18n()
const router = useLocalRouter()
const closeDialog = inject('closeDialog', () => { })
const { userInfo } = storeToRefs(useAppStore())
const { bool: showWallet, setBool: setShowWalletBool } = useBoolean(true)
const {
  isSetAuth, isOpenVerify, isSetPayPwd, brandBaseDetail,
} = useBrandBaseDetail()
const {
  data: depositCurrency,
  runAsync: runAsyncDepositCurrency,
} = useRequest(ApiFinanceDepositCurrency)
const {
  data: withdrawCurrency,
  runAsync: runAsyncWithdrawCurrency,
} = useRequest(ApiFinanceWithdrawCurrency)
const {
  data: withdrawBalance,
  run: runWithdrawBalance,
  loading: loadingWithdrawBalance,
} = useRequest(ApiFinanceWithdrawBalance)
// 获取安全验证配置
// const { isOpenVerify, isSetAuth } = useBrandBaseDetail()

const currentNetwork = ref('')
const contentRef = ref()
const distance = ref(6)
const activeCurrency = ref<CurrencyData | null>()
const currentTab = ref(props.activeTab)
const SecuritySafePwd = defineAsyncComponent(() => import('~/pages/[lang]/settings/security-safe-pwd.vue'))
const SecuritySafeCheck = defineAsyncComponent(() => import('~/pages/[lang]/settings/security-safe-check.vue'))
const AppEmailVerify = defineAsyncComponent(() => import('~/components/AppEmailVerify.vue'))

const tabList = computed(() => {
  const arr = [
    { label: t('deposit'), value: 'deposit' },
    { label: t('menu_title_settings_withdrawals'), value: 'withdraw' },
    { label: t('card_wallet'), value: 'cardHolder' },
  ]
  if (brandBaseDetail.value.exchange === 1)
    arr.push({ label: t('money_exchange'), value: 'exchange' })

  return arr
})
const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
const isCardHolder = computed(() => currentTab.value === 'cardHolder')
const isExchange = computed(() => currentTab.value === 'exchange')
const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return application.isVirtualCurrency(activeCurrency.value.type)

  return false
})
const isEmailVerify = computed(() => userInfo.value?.email_check_state === 1)
const getActiveCurrency = computed(() => {
  if (isDeposit.value)
    return depositCurrency.value
  else if (isWithdraw.value)
    return withdrawCurrency.value
  else
    return []
})

const getComponent = computed(() => {
  const check = brandBaseDetail.value?.check
  if (!isEmailVerify.value && !isCardHolder.value)
    return AppEmailVerify

  else if (check === 3 && !isSetPayPwd.value && !isSetAuth.value)
    return SecuritySafePwd

  else if (check === 1 && !isSetAuth.value)
    return SecuritySafeCheck

  else if (check === 2 && !isSetPayPwd.value)
    return SecuritySafePwd

  else
    return null
})

function changeCurrency(item: CurrencyData, network: string) {
  activeCurrency.value = item
  currentNetwork.value = network
  isWithdraw.value && !loadingWithdrawBalance.value && runWithdrawBalance({
    currency_id: item.cur,
  })
}
function handleShow(val: boolean) {
  setShowWalletBool(val)
}

watch(() => currentTab.value, () => {
  activeCurrency.value = null
  setShowWalletBool(true)
})

onMounted(() => {
  // 解决加载完毕dialog宽度变化，但是popper位置没有更新问题
  if (contentRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      distance.value += 0.000001
    })
    resizeObserver.observe(contentRef.value)
  }
})

await application.allSettled(
  [
    runAsyncDepositCurrency(),
    runAsyncWithdrawCurrency(),
  ],
)
</script>

<template>
  <div class="app-wallet-dialog">
    <div ref="contentRef" class="content">
      <BaseTab v-model="currentTab" :list="tabList" />
      <AppSelectCurrency
        v-show="showWallet && (isDeposit || (isWithdraw && !getComponent))"
        :type="4"
        :active-currency-list="getActiveCurrency"
        :show-balance="isWithdraw"
        :network="isVirCurrency"
        :placeholder="isDeposit ? 'search' : 'search_currency'"
        :distance="distance"
        @change="changeCurrency"
      />
      <!-- 存款 -->
      <template v-if="isDeposit && activeCurrency">
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
      <!-- 提款 -->
      <template v-else-if="isWithdraw && activeCurrency">
        <template v-if="!getComponent">
          <Suspense timeout="0">
            <AppWithdraw
              v-if="isVirCurrency"
              :max-withdraw-balance="withdrawBalance?.withdraw_balance"
              :active-currency="activeCurrency"
              :current-network="currentNetwork"
              @to-holder="currentTab = 'cardHolder'"
            />
            <AppFiatWithdrawal
              v-else
              :max-withdraw-balance="withdrawBalance?.withdraw_balance"
              :active-currency="activeCurrency"
              @to-holder="currentTab = 'cardHolder'"
            />
            <template #fallback>
              <div class="center dialog-loading-height">
                <BaseLoading />
              </div>
            </template>
          </Suspense>
        </template>
        <template v-else>
          <component :is="getComponent" :tip-text="tabList.find((item) => item.value === currentTab)?.label" />
        </template>
      </template>
    </div>
    <!-- 卡包 -->
    <template v-if="isCardHolder">
      <Suspense timeout="0">
        <AppCardHolder :init-currency="initCurrency" />
        <template #fallback>
          <div class="center dialog-loading-height">
            <BaseLoading />
          </div>
        </template>
      </Suspense>
    </template>
    <AppMoneyExchange v-else-if="isExchange" />
  </div>
  <div
    v-if="(isWithdraw || isDeposit || isExchange)
      && isOpenVerify && !isSetAuth"
    class="safe-bottom"
  >
    <div>
      {{ t('improve_safe_level') }}
    </div>
    <BaseButton
      bg-style="secondary"
      size="md"
      @click="router.push('/settings/security-safe-check'); closeDialog()"
    >
      {{ t('turn_on_double_check') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
.app-wallet-dialog {
  --tg-base-input-style-placeholder-color: var(--tg-text-lightgrey);
  --tg-base-input-style-placeholder-opacity: 1;
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-lightgrey);
  .content {
    padding-right: var(--tg-spacing-16);
    padding-left: var(--tg-spacing-16);
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
