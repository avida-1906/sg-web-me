<script setup lang='ts'>
const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const appStore = useAppStore()
const {
  bool: isShowPasswordVerify,
  setTrue: setShowPasswordVerifyTrue,
  setBool: setShowPasswordVerifyBool,
} = useBoolean(false)
const { openNotify } = useNotify()
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: valiUsername,
} = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_or_username')
  else if (!emailReg.test(value) && !usernameReg.test(value))
    return '请输入正确的电邮地址或 3 - 14 个小写英文和数字组成的用户名'

  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: valiPassword,
} = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')
  else if (value.length < 8)
    return t('password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  return ''
})
const {
  run: runMemberLogin,
  loading: isLoading,
} = useRequest(() => ApiMemberLogin({
  username: username.value,
  password: password.value,
  device_number: application.getDeviceNumber(),
}), {
  manual: true,
  onSuccess: (res: string) => {
    closeDialog()
    appStore.setToken(res)
    openNotify({ type: 'user', message: `欢迎${username.value}！` })
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
        <BaseInput
          v-model="username"
          :msg="usernameErrorMsg"
          :placeholder="t('pls_enter_email_or_username')"
        />
      </BaseLabel>
      <BaseLabel :label="t('password')" must-small>
        <BaseInput
          v-model="password"
          :msg="pwdErrorMsg"
          :placeholder="t('pls_enter_password')"
          type="password"
          autocomplete="current-password"
          :password="password"
          @focus="onFocus"
        />
      </BaseLabel>
      <AppPasswordVerify
        v-show="isShowPasswordVerify"
        :password="password"
        @pass="passwordVerifyPass"
      />
      <BaseButton
        class="app-login-btn"
        bg-style="secondary"
        :loading="isLoading"
        size="xl"
        @click.stop="getMemberLogin"
      >
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
