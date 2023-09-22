<script setup lang='ts'>
const { t } = useI18n()
const appStore = useAppStore()
const { value: username, errorMessage: usernameErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_or_username')

  if (!emailReg.test(value) && !usernameReg.test(value))
    return t('email_or_username_incorrect')

  return ''
})
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  if (!passwordReg.test(value))
    return t('password_incorrect')

  return ''
})

const closeDialog = inject('closeDialog', () => {})

const { run: runMemberLogin, loading: isLoading } = useRequest(() => ApiMemberLogin({
  username: username.value,
  password: password.value,
  device_number: application.getDeviceNumber(),
}), {
  manual: true,
  onSuccess: (res: any) => {
    // toast(res)
    closeDialog()
    appStore.setToken(res)
  },
  onError: (err: any) => {
    toast(err)
  },
})

// const isDisabled = computed(() => { })
</script>

<template>
  <div class="app-login">
    <!-- <form></form> -->
    <div class="app-login-input-box">
      <BaseInput v-model="username" :label="t('email_or_username')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_email_or_username')" must />
      <BaseInput v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must autocomplete="current-password" />
      <!-- <BaseInput v-model="username" :label="t('two-step_verification')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_two-step_verification')" must /> -->
      <!-- :disabled="isDisabled" -->
      <BaseButton class="app-login-btn" bg-style="secondary" :loading="isLoading" @click="runMemberLogin">
        {{ t('login') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-login {
  &-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
  }
  &-btn {
    width: 100%;
  }
}
</style>
