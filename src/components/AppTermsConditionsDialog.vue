<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-register-dialog">
    <div class="title">
      {{ t('register') }}
    </div>
    <AppRegisterTermsConditions />
  </div>
</template>

<style lang='scss' scoped>
.app-register-dialog {
  padding: 0 var(--tg-spacing-button-padding-horizontal-sm);
  .title {
    color: var(--tg-text-white);
    text-align: center;
    font-size: var(--tg-font-size-md);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: var(--tg-spacing-16);
    margin-bottom: 4px;
  }
}
</style>
