<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="app-register-dialog">
    <div class="title">
      {{ t('pop_up_create_account_header_register') }}
    </div>
    <AppRegister />
  </div>
</template>

<style lang='scss' scoped>
.app-register-dialog {
  padding:  var(--tg-spacing-button-padding-horizontal-sm) var(--tg-spacing-button-padding-horizontal-sm);
  .title {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-md);
    font-weight: 600;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 4px;
  }
}
</style>
