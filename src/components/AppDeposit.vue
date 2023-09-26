<script setup lang='ts'>
// const { t } = useI18n()

const { bool: showWallet, setBool: setShowWalletBool } = useBoolean(true)
// 获取新的虚拟货币地址
// const { openDialog: openGetNewCrypto } = useDialog({
//   title: '确认更换地址',
//   icon: 'navbar-wallet',
//   maxWidth: 400,
//   showButtons: true,
//   default: () => h(AppGetNewCrypto),
// })
const activeCurrency = ref()

function changeCurrency(item: any) {
  activeCurrency.value = item
}

function handleShow(val: boolean) {
  setShowWalletBool(val)
}
</script>

<template>
  <div class="app-deposit">
    <AppWallet v-show="showWallet" :wallet-btn="false" :show-balance="false" :network="true" @change="changeCurrency" />
    <AppFiatDeposit v-if="activeCurrency?.legalTender" :active-currency="activeCurrency" />
    <AppVirtualDeposit v-else :active-currency="activeCurrency" @show="handleShow" />
  </div>
</template>

<style lang='scss' scoped>
.app-deposit {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
}
</style>
