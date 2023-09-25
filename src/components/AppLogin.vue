<script setup lang='ts'>
const { t } = useI18n()
const appStore = useAppStore()
const { value: username, errorMessage: usernameErrorMsg, validate: valiUsername } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_or_username')

  if (!emailReg.test(value) && !usernameReg.test(value))
    return t('email_or_username_incorrect')

  return ''
})
const { value: password, errorMessage: pwdErrorMsg, validate: valiPassword } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  if (value.length < 8)
    return t('password_least_8_characters')

  if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')

  if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')

  return ''
})

const closeDialog = inject('closeDialog', () => {})

const { bool: isShowPasswordVerify, setTrue: setShowPasswordVerifyTrue, setFalse: setShowPasswordVerifyFalse } = useBoolean(false)

const { run: runMemberLogin, loading: isLoading } = useRequest(() => ApiMemberLogin({
  username: username.value,
  password: password.value,
  device_number: application.getDeviceNumber(),
}), {
  manual: true,
  onSuccess: (res: any) => {
    closeDialog()
    appStore.setToken(res)
  },
  onError: (err: any) => {
    toast(err)
  },
})

async function getMemberLogin() {
  await valiUsername()
  await valiPassword()
  if (!usernameErrorMsg.value && !pwdErrorMsg.value)
    runMemberLogin()
}
function onFocus() {
  setShowPasswordVerifyTrue()
}
function onBlur() {
  setShowPasswordVerifyFalse()
}
</script>

<template>
  <div class="app-login">
    <!-- <form></form> -->
    <div class="app-login-input-box">
      <BaseInput v-model="username" :label="t('email_or_username')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_email_or_username')" must />
      <BaseInput
        v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must
        autocomplete="current-password"
        :password="password"
        @focus="onFocus" @blur="onBlur"
      />
      <AppPasswordVerify v-show="isShowPasswordVerify" :password="password" />
      <!-- <BaseInput v-model="username" :label="t('two-step_verification')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_two-step_verification')" must /> -->
      <BaseButton class="app-login-btn" bg-style="secondary" :loading="isLoading" @click.stop="getMemberLogin">
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
