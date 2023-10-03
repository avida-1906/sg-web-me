<script setup lang='ts'>
const { t } = useI18n()
const { bool: showWallet, setBool: setShowWalletBool } = useBoolean(true)

const activeCurrency = ref()
const currentTab = ref('deposit')
const tabList = [
  { label: t('deposit'), value: 'deposit' },
  { label: t('withdraw'), value: 'withdraw' },
]

const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')

function changeCurrency(item: any) {
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
      <AppWallet v-show="showWallet" :wallet-btn="false" :show-balance="false" :network="true" @change="changeCurrency" />
      <template v-if="isDeposit">
        <AppFiatDeposit v-if="activeCurrency?.legalTender" :active-currency="activeCurrency" @show="handleShow" />
        <AppVirtualDeposit v-else :active-currency="activeCurrency" @show="handleShow" />
      </template>
      <template v-else-if="isWithdraw">
        <AppFiatWithdrawal v-if="activeCurrency?.legalTender" :active-currency="activeCurrency" />
        <AppWithdraw v-else :active-currency="activeCurrency" />
      </template>
    </div>
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
