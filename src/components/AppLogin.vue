<script setup lang='ts'>
const { t } = useI18n()
const { value: username, errorMessage: usernameErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_or_username')

  return ''
})
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  return ''
})

const { run } = useRequest(() => ApiMemberLogin({
  username: 'test00211',
  password: '123456',
  device_number: application.getDeviceNumber(),
}), {
  manual: true,
})
</script>

<template>
  <div class="app-login">
    <button @click="run">
      {{ t('login') }}
    </button>
    <form>
      <div class="app-login-input-box">
        <BaseInput v-model="username" :label="t('email_or_username')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_email_or_username')" must />
        <BaseInput v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must autocomplete="current-password" />
        <!-- <BaseInput v-model="username" :label="t('two-step_verification')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_two-step_verification')" must /> -->
        <BaseButton class="app-login-btn" bg-style="secondary">
          {{ t('login') }}
        </BaseButton>
      </div>
    </form>
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
