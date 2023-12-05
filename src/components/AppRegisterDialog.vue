<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-register-dialog">
    <div class="title">
      {{ t('register') }}
    </div>
    <AppRegister />
  </div>
</template>

<style lang='scss' scoped>
.app-register-dialog {
  padding:  var(--tg-spacing-button-padding-horizontal-sm) var(--tg-spacing-button-padding-horizontal-sm);
  .title {
    color: var(--tg-text-white);
    font-family: PingFang SC;
    font-size: var(--tg-font-size-md);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    line-height: 1.5;
  }
}
</style>
