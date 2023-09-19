<script setup lang='ts'>
const { t } = useI18n()

const currentTab = ref('deposit')
const tabList = [
  { label: t('deposit'), value: 'deposit' },
  { label: t('withdraw'), value: 'withdraw' },
  { label: t('buy_cryptocurrency'), value: 'buy' },
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
  padding-bottom: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
}
</style>
