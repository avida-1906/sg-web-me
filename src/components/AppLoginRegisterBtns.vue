<script lang="ts" setup>
const { t } = useI18n()
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
</script>

<template>
  <BaseButton type="text" class="login" @click.stop="openLoginDialog()">
    {{ t('login') }}
  </BaseButton>
  <BaseButton
    class="reg"
    bg-style="primary"
    @click.stop="openRegisterDialog()"
  >
    {{ t('reg') }}
  </BaseButton>
</template>

<style lang="scss" scoped>
.login {
  width: 68px;
  height: 44px;
  padding:
  var(--tg-spacing-button-padding-vertical-md)
  var(--tg-spacing-button-padding-vertical-2xl) !important;
  color: var(--tg-text-white);
}

.reg {
  display: flex;
  width: 68px;
  height: 44px;
  padding:
  var(--tg-spacing-button-padding-vertical-md)
  var(--tg-spacing-button-padding-vertical-2xl) !important;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #1475E1;
}
</style>
