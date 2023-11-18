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
const activeCurrency = ref<CurrencyData | null>()
const currentTab = ref(props.activeTab)
const tabList = [
  { label: t('deposit'), value: 'deposit' },
  { label: '提款', value: 'withdraw' },
  { label: '卡包', value: 'cardHolder' },
]

const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
const isCardHolder = computed(() => currentTab.value === 'cardHolder')
const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return application.isVirtualCurrency(activeCurrency.value.type)

  return false
})

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
</script>

<template>
  <div class="app-wallet-dialog">
    <div class="content">
      <BaseTab v-model="currentTab" :list="tabList" />
      <AppSelectCurrency
        v-show="showWallet && !isCardHolder"
        :show-balance="isWithdraw"
        :network="isVirCurrency"
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
    </div>
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
    v-if="(isWithdraw || isDeposit) && userInfo && userInfo.google_verify !== 2"
    class="safe-bottom"
  >
    <div>
      通过双重验证提高您的账户安全性
    </div>
    <BaseButton
      bg-style="primary"
      size="md"
      @click="router.push('/settings/security-safe-check'); closeDialog()"
    >
      开启双重验证
    </BaseButton>
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
  .safe-bottom{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #0f212e;
    padding:1rem;
    gap: 1rem;
    color: var(--tg-text-lightgrey);
  }
</style>
