<script setup lang='ts'>
const { t } = useI18n()

const birthday = ref('')
const { bool: checkboxValue } = useBoolean(false)
const { bool: loadingValue } = useBoolean(false)

// const {
//   openTermsConditionsDialog,
//   // closeTermsConditionsDialog
// } = useTermsConditionsDialog()

const { value: email, errorMessage: emailErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_email_address')

  return ''
})
const { value: username, errorMessage: usernameErrorMsg } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_username')

  return ''
})
const { value: password, errorMessage: pwdErrorMsg } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  return ''
})

const { run: runMemberReg } = useRequest(() => ApiMemberReg({
  email: username.value || 'jango16888@gmail.com',
  username: username.value || 'Jango16888',
  password: password.value || '123456',
  birthday: birthday.value || '1993-07-30',
  device_number: application.getDeviceNumber(),
}), {
  manual: true,
  // maxWait: 2000,
  // trailing: true,
})
// setTimeout(() => {
//   loadingValue.value = true
// }, 3000)
</script>

<template>
  <div class="app-register">
    <div class="app-register-title">
      {{ t('reg_step1') }}
    </div>
    <!-- <form></form> -->
    <div class="app-register-input-box">
      <BaseInput v-model="email" :label="t('email_address')" :msg="emailErrorMsg" :placeholder="t('pls_enter_email_address')" must />
      <BaseInput v-model="username" :label="t('username')" :msg="usernameErrorMsg" :placeholder="t('pls_enter_username')" must />
      <BaseInput v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must autocomplete="current-password" />
      <BaseInputBirthday v-model="birthday" must />
    </div>
    <div class="app-register-check-box">
      <BaseCheckBox v-model="checkboxValue">
        {{ t('code_optional') }}
      </BaseCheckBox>
      <BaseButton :loading="loadingValue" :disabled="loadingValue" class="app-register-btn" bg-style="secondary" @click.stop="runMemberReg">
        {{ t('continue') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-register {
  &-title {
    color: #B1BAD3;
    text-align: center;
    font-family: PingFang SC;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding-bottom: var(--tg-spacing-button-padding-vertical-xs);
  }
  &-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
  }
  &-check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-14);
    padding-top: var(--tg-spacing-button-padding-vertical-xs);
  }
  &-btn {
    width: 100%;
  }
}
</style>
