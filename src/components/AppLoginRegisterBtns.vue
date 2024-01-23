<script lang="ts" setup>
const { t } = useI18n()
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
const { leftIsExpand, closeLeftSidebar } = useLeftSidebar()
const { isMobile } = storeToRefs(useWindowStore())

function handleLogin() {
  isMobile.value && leftIsExpand.value && closeLeftSidebar()
  openLoginDialog()
}

function handleRegister() {
  isMobile.value && leftIsExpand.value && closeLeftSidebar()
  openRegisterDialog()
}
</script>

<template>
  <div class="center btn-box">
    <BaseButton
      type="text" custom-padding
      style="--tg-base-button-padding-y: var(--tg-spacing-button-padding-vertical-md);
        --tg-base-button-padding-x: var(--tg-spacing-button-padding-horizontal-md);
        --tg-base-button-text-default-color: var(--tg-text-white);"
      @click.stop="handleLogin"
    >
      {{ t('top_bar_login_button') }}
    </BaseButton>
    <BaseButton
      custom-padding
      bg-style="primary"
      style="--tg-base-button-font-size: calc(var(--tg-font-size-default) + 1px);
      --tg-base-button-padding-y: calc(var(--tg-spacing-button-padding-vertical-md) - 0.5px);
      --tg-base-button-padding-x:
      calc(var(--tg-spacing-button-padding-horizontal-md) - 1px);"
      @click.stop="handleRegister"
    >
      {{ t('reg') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
</style>
