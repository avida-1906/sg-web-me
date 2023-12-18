<script setup lang='ts'>
import type { CurrencyData } from '~/composables/useCurrencyData'

interface Props {
  activeTab?: string
}
const props = withDefaults(defineProps<Props>(), {
  activeTab: 'deposit',
})

const closeDialog = inject('closeDialog', () => { })
const { userInfo } = storeToRefs(useAppStore())
const { t } = useI18n()
const { bool: showWallet, setBool: setShowWalletBool } = useBoolean(true)
const router = useRouter()

const currentNetwork = ref('')
const contentRef = ref()
const distance = ref(6)
const activeCurrency = ref<CurrencyData | null>()
const currentTab = ref(props.activeTab)
const tabList = computed(() => [
  { label: t('deposit'), value: 'deposit' },
  { label: t('menu_title_settings_withdrawals'), value: 'withdraw' },
  { label: t('card_wallet'), value: 'cardHolder' },
])

const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
const isCardHolder = computed(() => currentTab.value === 'cardHolder')
const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return application.isVirtualCurrency(activeCurrency.value.type)

  return false
})
const isEmailVerify = computed(() => userInfo.value?.email_check_state === 1)

function changeCurrency(item: CurrencyData, network: string) {
  activeCurrency.value = item
  currentNetwork.value = network
}
function handleShow(val: boolean) {
  setShowWalletBool(val)
}

watch(() => currentTab.value, () => {
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
</script>

<template>
  <div class="app-wallet-dialog">
    <div ref="contentRef" class="content">
      <BaseTab v-model="currentTab" :list="tabList" />
      <template v-if="isEmailVerify">
        <AppSelectCurrency
          v-show="showWallet && !isCardHolder"
          :show-balance="isWithdraw"
          :network="isVirCurrency"
          :popper-clazz="isDeposit ? 'app-wallet-cur' : 'app-wallet-cur-with'"
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
        <!-- 取款 -->
        <template v-else-if="isWithdraw && activeCurrency">
          <Suspense timeout="0">
            <AppWithdraw
              v-if="isVirCurrency"
              :active-currency="activeCurrency"
              :current-network="currentNetwork"
            />
            <AppFiatWithdrawal v-else :active-currency="activeCurrency" />
            <template #fallback>
              <div class="center dialog-loading-height">
                <BaseLoading />
              </div>
            </template>
          </Suspense>
        </template>
      </template>
    </div>
    <AppEmailVerify
      v-if="!isEmailVerify && !isCardHolder"
      :tip-text="tabList.find((item) => item.value === currentTab)?.label"
    />
    <!-- 卡包 -->
    <!-- <KeepAlive> -->
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
    <!-- </KeepAlive> -->
  </div>
  <div
    v-if="(isWithdraw || isDeposit)
      && userInfo && userInfo.google_verify !== 2 && isEmailVerify"
    class="safe-bottom"
  >
    <div>
      {{ t('improve_safe_level') }}
    </div>
    <BaseButton
      bg-style="primary"
      size="md"
      @click="router.push('/settings/security-safe-check'); closeDialog()"
    >
      {{ t('turn_on_double_check') }}
    </BaseButton>
  </div>
</template>

<style>
.app-wallet-cur {
  --tg-app-select-currency-poptop-width: 136px;
}
.app-wallet-cur-with {
  --tg-app-select-currency-poptop-width: 218px;
}
</style>

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
