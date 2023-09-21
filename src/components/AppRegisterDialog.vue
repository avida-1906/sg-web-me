<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-register-dialog">
    <div class="title">
      {{ t('register') }}
    </div>
    <AppRegister />
    <!-- <AppRegisterTermsConditions /> -->
    <AppLoginRegisterBottom type="register" />
  </div>
</template>

<style lang='scss' scoped>
.app-register-dialog {
  min-width: 360px !important;
  padding: 0 var(--tg-spacing-button-padding-horizontal-sm);
  .title {
    color: var(--tg-text-white);
    text-align: center;
    font-family: PingFang SC;
    font-size: var(--tg-font-size-md);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: var(--tg-spacing-button-padding-vertical-2xl) var(--tg-spacing-button-padding-vertical-xs);
  }
}
</style>
