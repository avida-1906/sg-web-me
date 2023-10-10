<script setup lang='ts'>
const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const appStore = useAppStore()
const { bool: isShowPasswordVerify, setTrue: setShowPasswordVerifyTrue, setBool: setShowPasswordVerifyBool } = useBoolean(false)
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
const { run: runMemberLogin, loading: isLoading } = useRequest(() => ApiMemberLogin({
  username: username.value,
  password: password.value,
  device_number: application.getDeviceNumber(),
}), {
  manual: true,
  onSuccess: (res: string) => {
    closeDialog()
    appStore.setToken(res)
  },
  onError: (err: Error) => {
    console.log(err)
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
function passwordVerifyPass(status: boolean) {
  setShowPasswordVerifyBool(!status)
}
</script>

<template>
  <div class="app-login">
    <div class="app-login-input-box">
      <BaseLabel :label="t('email_or_username')" must-small>
        <BaseInput v-model="username" :msg="usernameErrorMsg" :placeholder="t('pls_enter_email_or_username')" />
      </BaseLabel>
      <BaseLabel :label="t('password')" must-small>
        <BaseInput
          v-model="password" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password"
          autocomplete="current-password"
          :password="password"
          @focus="onFocus"
        />
      </BaseLabel>
      <AppPasswordVerify v-show="isShowPasswordVerify" :password="password" @pass="passwordVerifyPass" />
      <BaseButton class="app-login-btn" bg-style="secondary" :loading="isLoading" size="xl" @click.stop="getMemberLogin">
        <span class="login-text">
          {{ t('login') }}
        </span>
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
  .login-text{
    font-size: var(--tg-font-size-base);
  }
}
</style>
