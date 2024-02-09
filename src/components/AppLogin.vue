<script setup lang='ts'>
const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const appStore = useAppStore()
const { openNotify } = useNotify()

const userNameRef = ref()
const passwordRef = ref()
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: valiUsername,
} = useField<string>('username', (value) => {
  if (!value || value.length < 3)
    return t('min_len_char', { delta: 3 })
  else if (value.length > 30)
    return t('max_len_char', { delta: 30 })
  else if (value.match('[^@.a-z0-9]'))
    return t('name_has_invalid_char')
  else if (!emailReg.test(value) && !usernameReg.test(value))
    return t('validate_msg_user_name')
  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: valiPassword,
} = useField<string>('password', (value) => {
  if (!value || value.length < 8)
    return t('min_len_char', { delta: 8 })
  // else if (!upperLowerReg.test(value))
  //   return t('password_uppercase_lowercase_letter')
  // else if (!lastOneNumberReg.test(value))
  //   return t('password_least_1_number')
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
    openNotify({ type: 'user', message: `${t('welcome_guest')} ${username.value}！` })
  },
})

async function getMemberLogin() {
  userNameRef.value.setTouchTrue()
  passwordRef.value.setTouchTrue()
  await valiUsername()
  await valiPassword()
  if (!usernameErrorMsg.value && !pwdErrorMsg.value) {
    appStore.setMqttConnectedFalse()
    runMemberLogin()
  }
}

onMounted(() => {
  userNameRef.value?.getFocus()
})
</script>

<template>
  <div class="app-login">
    <div class="app-login-input-box">
      <BaseLabel :label="t('email_or_username')" need-focus must-small>
        <BaseInput
          ref="userNameRef" v-model="username"
          :msg="usernameErrorMsg" msg-after-touched
        />
      </BaseLabel>
      <BaseLabel :label="t('password')" must-small need-focus>
        <BaseInput
          ref="passwordRef" v-model="password"
          :msg="pwdErrorMsg"
          type="password"
          autocomplete="current-password"
          msg-after-touched
          @down-enter="getMemberLogin"
        />
      </BaseLabel>
      <BaseButton
        bg-style="secondary"
        :loading="isLoading"
        size="xl"
        @click.stop="getMemberLogin"
      >
        <span class="login-text">
          {{ t('pop_up_login_button') }}
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
    gap: var(--tg-spacing-16);
  }
  &-btn {
    width: 100%;
  }
  .login-text{
    font-size: var(--tg-font-size-base);
  }
}
</style>
