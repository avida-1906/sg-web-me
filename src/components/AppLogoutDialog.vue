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
      size="lg"
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
    font-size: var(--tg-font-size-default);
    line-height: 1.5;
    color: var(--tg-text-lightgrey);
  }

  &-btn {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-base);
    background: var(--tg-button-secondary-main);
  }
}
</style>
