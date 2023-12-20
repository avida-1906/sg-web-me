<script lang="ts" setup>
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
</script>

<template>
  <div class="app-terms">
    <AppPoliciesTerms />
    <div v-if="!isLogin" class="p buttons">
      <BaseButton type="text" size="none" @click="openLoginDialog()">
        登录
      </BaseButton>
      <span>或</span>
      <BaseButton type="text" size="none" @click="openRegisterDialog()">
        注册
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  text-align: center;
  --tg-base-button-text-default-color: var(--tg-text-white);
  --tg-base-button-font-size: 16px;
  margin-top: 20px !important;
  :deep(button) {
    padding: 0 8px;
  }
}
.app-terms {
  --app-terms-theme-size: var(--tg-font-size-xl);
  --app-terms-title-size: var(--tg-font-size-base);
  --app-terms-desc-size: var(--tg-font-size-base);
  padding: 24px;
}
</style>
