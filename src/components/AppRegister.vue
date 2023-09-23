<script setup lang='ts'>
const { t } = useI18n()

// const birthday = ref('')
const { bool: checkboxValue } = useBoolean(false)

const closeDialog = inject('closeDialog', () => {})

const {
  openTermsConditionsDialog,
} = useTermsConditionsDialog()

const { value: email, errorMessage: emailErrorMsg, validate: valiEmail } = useField<string>('email', (value) => {
  if (!value)
    return t('pls_enter_email_address')

  if (!emailReg.test(value))
    return t('email_address_incorrect')

  return ''
})
const { value: username, errorMessage: usernameErrorMsg, validate: valiUsername } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_username')

  if (!usernameReg.test(value))
    return t('username_incorrect')

  return ''
})

const { value: password, errorMessage: pwdErrorMsg, validate: valiPassword } = useField<string>('password', (value) => {
  if (!value)
    return t('pls_enter_password')

  if (!lastOneNumberReg.test(value))
    return t('password_incorrect')

  return ''
})

const { value: birthday, errorMessage: birthdayErrorMsg, validate: valiBirthday } = useField<string>('birthday', (value) => {
  if (!value)
    return t('pls_enter_birthday')

  return ''
})

async function getMemberReg() {
  await valiEmail()
  await valiUsername()
  await valiPassword()
  await valiBirthday()
  if (!emailErrorMsg.value && !usernameErrorMsg.value && !pwdErrorMsg.value && !birthdayErrorMsg.value) {
    const paramsReg = {
      email: username.value,
      username: username.value,
      password: password.value,
      parent_id: '',
      birthday: birthday.value,
      device_number: application.getDeviceNumber(),
    }
    Session.set('reg_params', paramsReg)
    // Session.set('reg_params', JSON.stringify(paramsReg))
    closeDialog()
    await nextTick()
    openTermsConditionsDialog()
  }
}
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
      <BaseInputBirthday v-model="birthday" :msg="birthdayErrorMsg" must />
    </div>
    <div class="app-register-check-box">
      <BaseCheckBox v-model="checkboxValue">
        {{ t('code_optional') }}
      </BaseCheckBox>
      <!-- :loading="isLoading" -->
      <BaseButton class="app-register-btn" bg-style="secondary" @click.stop="getMemberReg">
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
