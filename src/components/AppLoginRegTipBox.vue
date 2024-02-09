<script lang="ts" setup>
const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()

function openLogin() {
  closeDialog()
  setTimeout(() => {
    openLoginDialog()
  }, 0)
}

function openRegister() {
  closeDialog()
  setTimeout(() => {
    openRegisterDialog()
  }, 0)
}
</script>

<template>
  <div class="app-btn-login-reg">
    <span>{{ t('need_login_tip') }}……</span>
    <div class="buttons">
      <BaseButton size="md" @click.stop="openLogin">
        {{ t('login') }}
      </BaseButton>
      <BaseButton bg-style="primary" size="md" @click.stop="openRegister">
        {{ t('reg') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-btn-login-reg {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-light);
  line-height: 1.5;
  .buttons {
    display: flex;
    width: 100%;
    gap: var(--tg-spacing-16);
    button {
      flex: 1;
    }
  }
}
</style>
