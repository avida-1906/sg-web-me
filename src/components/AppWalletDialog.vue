<script setup lang='ts'>
const currentTab = ref('deposit')
const tabList = [
  { label: '存款', value: 'deposit' },
  { label: '取款', value: 'withdraw' },
  { label: '购买加密货币', value: 'buy' },
]
const isDeposit = computed(() => currentTab.value === 'deposit')
const isWithdraw = computed(() => currentTab.value === 'withdraw')
</script>

<template>
  <div class="app-wallet-dialog">
    <BaseTab v-model="currentTab" shape="square" :list="tabList" />

    <AppDeposit v-if="isDeposit" />
    <AppWithdraw v-else-if="isWithdraw" />
  </div>
</template>

<style lang='scss' scoped>
.app-wallet-dialog {
  padding-right: var(--tg-spacing-16);
  padding-left: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  padding-bottom: var(--tg-spacing-16);
  gap: var(--tg-spacing-16);
}
</style>
