<script lang="ts" setup>
const { t } = useI18n()

const closeDialog = inject('closeDialog', () => {})

const { runMemberLogout, logoutLoading } = useLogout(() => {
  closeDialog()
})
</script>

<template>
  <div class="dialog">
    <div class="dialog-text">
      {{ t('logout_dont_foget') }}
    </div>
    <BaseButton
      class="dialog-btn"
      type="text"
      :loading="logoutLoading"
      @click.stop="runMemberLogout"
    >
      {{ t('logout') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  padding: var(--tg-spacing-16) var(--tg-spacing-16);

  &-text {
    font-size: var(--tg-font-size-xs);
    color: var(--tg-text-lightgrey);
  }

  &-btn {
    color: var(--tg-text-white);
    background: var(--tg-button-secondary-main);
  }
}
</style>
