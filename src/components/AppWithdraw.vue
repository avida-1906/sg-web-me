<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-withdraw">
    <div class="currency">
      {{ t('currency') }}
      <AppWallet :wallet-btn="false" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-withdraw{
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
}
</style>
