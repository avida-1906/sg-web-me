<script setup lang='ts'>
const { t } = useI18n()

// const birthday = ref('')
const { bool: checkboxValue } = useBoolean(false)

const closeDialog = inject('closeDialog', () => {})

const { bool: isShowPasswordVerify, setTrue: setShowPasswordVerifyTrue, setFalse: setShowPasswordVerifyFalse } = useBoolean(false)

const {
  openTermsConditionsDialog,
} = useTermsConditionsDialog()

const { value: email, errorMessage: emailErrorMsg, validate: valiEmail } = useField<string>('email', (value) => {
  if (!value)
    return t('pls_enter_email_address')

  if (!emailReg.test(value))
    return t('email_address_incorrect')
    // 请在您的电邮地址中加入 “@” 符号
    // 请在您的电邮地址中加入 “.” 符号
    // 电子邮件域不受支持
    // 请输入有效的电邮地址
  return ''
})
const { value: username, errorMessage: usernameErrorMsg, validate: valiUsername } = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_username')

  if (!usernameReg.test(value))
    return t('username_incorrect')
  // 此用户名已被使用，请选择另一用户名。
  // 用户名含有无效的字符
  // 您的用户名长度必须为 3 – 14 个字符。
  // 您的 username 必须含有至少 3 个字符
  // 您的 username 不得超过 14 个字符
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

const birthdayInputRef = ref()
const birthday = ref('')

async function getMemberReg() {
  await valiEmail()
  await valiUsername()
  await valiPassword()
  birthdayInputRef.value.valiBirthday()
  if (!emailErrorMsg.value && !usernameErrorMsg.value && !pwdErrorMsg.value && birthday.value) {
    const paramsReg = {
      email: email.value,
      username: username.value,
      password: password.value,
      parent_id: '',
      birthday: birthday.value,
      device_number: application.getDeviceNumber(),
    }
    Session.set(STORAGE_REG_PARAMS_KEYWORDS, paramsReg)
    closeDialog()
    await nextTick()
    openTermsConditionsDialog()
  }
}
function onFocus() {
  setShowPasswordVerifyTrue()
}
function onBlur() {
  setShowPasswordVerifyFalse()
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
      <BaseInput
        v-model="password" :label="t('password')" :msg="pwdErrorMsg" :placeholder="t('pls_enter_password')" type="password" must
        autocomplete="current-password"
        :password="password"
        @focus="onFocus" @blur="onBlur"
      />
      <AppPasswordVerify v-show="isShowPasswordVerify" :password="password" />
      <BaseInputBirthday ref="birthdayInputRef" v-model="birthday" must />
    </div>
    <div class="app-register-check-box">
      <BaseCheckBox v-model="checkboxValue">
        {{ t('code_optional') }}
      </BaseCheckBox>
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
