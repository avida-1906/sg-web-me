<script lang="ts" setup>
const { t } = useI18n()
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
</script>

<template>
  <div class="btn-box">
    <BaseButton type="text" custom-padding @click.stop="openLoginDialog()">
      {{ t('login') }}
    </BaseButton>
    <BaseButton
      custom-padding
      bg-style="primary"
      @click.stop="openRegisterDialog()"
    >
      {{ t('reg') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.btn-box{
  --tg-base-button-padding-y: var(--tg-spacing-button-padding-vertical-md);
  --tg-base-button-padding-x: var(--tg-spacing-button-padding-horizontal-md);
  --tg-base-button-text-default-color: var(--tg-text-white);
}
</style>
