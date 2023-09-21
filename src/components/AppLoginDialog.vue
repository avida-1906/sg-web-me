<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-login-dialog">
    <div class="title">
      {{ t('login') }}
    </div>
    <AppLogin />
    <AppLoginRegisterBottom type="login" />
  </div>
</template>

<style lang='scss' scoped>
.app-login-dialog {
  padding: 0 var(--tg-spacing-button-padding-horizontal-xs);
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
