<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const registerFormRef = ref()
const {
  run: runAgencyInsert,
  loading: loadingAgencyInsert,
} = useRequest(ApiAgencyInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: t('success_register'),
    })
    registerFormRef.value?.resetForm()
  },
})

async function submitRegister() {
  if (!isLogin.value)
    return openLoginDialog()
  registerFormRef.value?.getMemberReg((paramsReg: {
    username: string
    password: string
    email: string
    birthday: string
  }) => {
    if (paramsReg) {
      runAgencyInsert({
        username: paramsReg.username,
        password: paramsReg.password,
        email: paramsReg.email,
        birthday: paramsReg.birthday,
      })
    }
  })
}
</script>

<template>
  <div class="layout-spacing reset page-new-subagent">
    <AppRegisterForm ref="registerFormRef" />
    <BaseButton
      bg-style="secondary" size="md"
      :loading="loadingAgencyInsert" @click="submitRegister"
    >
      {{ t('reg') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.page-new-subagent{
  gap: var(--tg-spacing-20);
  max-width: 420px;
  margin: 0 auto;
}
</style>
