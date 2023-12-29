<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: valiUsername,
  resetField: resetName,
} = useField<string>('username', (value) => {
  if (!value)
    return t('name_3_char')
  else if (value.length < 3)
    return t('name_3_char')
  else if (value.match('[^a-z0-9]'))
    return t('name_has_invalid_char')
  else if (value.length > 14)
    return t('name_14_char')
  else if (!usernameReg.test(value))
    return t('validate_msg_user_name_tip')
  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: valiPassword,
  resetField: resetPwd,
} = useField<string>('password', fieldVerifyLoginPwd)
const {
  run: runAgencyInsert,
  loading: loadingAgencyInsert,
} = useRequest(ApiAgencyInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: t('success_register'),
    })
    resetName()
    resetPwd()
  },
})
const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: validateEmail,
  setErrors: setEmailErrors,
} = useField<string>('email', (value) => {
  const lastAtIdx = value ? value.lastIndexOf('@') : -1
  const lastDotIdx = value ? value.lastIndexOf('.') : -1
  if (!value)
    return t('no_support_email')

  else if (!value.includes('@'))
    return [t('email_add_char', { delta: '@' })]

  else if (!value.includes('.'))
    return t('email_add_char', { delta: '.' })

  else if (lastDotIdx === value.length - 1)
    return t('no_support_email')

  else if (value === password.value)
    return t('email_no_equal_password')

  else if (!emailReg.test(value))
    return t('pls_input_email')

  // 请在您的电邮地址中加入 “@” 符号
  // 请在您的电邮地址中加入 “.” 符号
  // 电子邮件域不受支持
  // 请输入有效的电邮地址
  return ''
})

const nameRef = ref()
const pwdRef = ref()
const birthdayInputRef = ref()
const birthday = ref('')
const emailRef = ref()

function fieldVerifyLoginPwd(value: string) {
  if (!value)
    return t('password_least_8_characters')
  else if (value.length < 8)
    return t('password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  return ''
}
async function submitRegister() {
  nameRef.value.setTouchTrue()
  pwdRef.value.setTouchTrue()
  emailRef.value.setTouchTrue()
  await validateEmail()
  await valiUsername()
  await valiPassword()
  await birthdayInputRef.value.valiBirthday()
  if (!birthdayInputRef.value.isValid)
    return
  if (!usernameErrorMsg.value && !pwdErrorMsg.value) {
    runAgencyInsert({
      username: username.value,
      password: password.value,
    })
  }
}
</script>

<template>
  <div class="layout-spacing reset page-new-subagent">
    <div class="title">
      注册子代理
    </div>
    <BaseLabel :label="t('email_address')" need-focus must-small>
      <BaseInput
        ref="emailRef"
        v-model="email"
        :msg="emailErrorMsg"
        msg-after-touched
      />
    </BaseLabel>
    <BaseLabel :label="t('username')" must-small need-focus>
      <BaseInput
        ref="nameRef"
        v-model="username"
        :msg="usernameErrorMsg"
        name="name"
        msg-after-touched
      />
      <div v-if="!usernameErrorMsg" class="hint">
        {{ t('username_incorrect') }}
      </div>
    </BaseLabel>
    <BaseLabel :label="t('password')" must-small need-focus>
      <BaseInput
        ref="pwdRef"
        v-model="password"
        type="password"
        :msg="pwdErrorMsg"
        msg-after-touched
      />
    </BaseLabel>
    <BaseLabel :label="t('time_birthday')" must-small>
      <BaseInputBirthday ref="birthdayInputRef" v-model="birthday" />
    </BaseLabel>
    <BaseButton
      bg-style="secondary" size="md"
      :loading="loadingAgencyInsert" @click="submitRegister"
    >
      {{ t('submit_reg') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.page-new-subagent{
  gap: var(--tg-spacing-20);
  max-width: 420px;
  margin: 0 auto;
  .title{
    text-align: center;
    color:var(--tg-text-white);
    font-size: var(--tg-font-size-md);
    font-weight: var(--tg-font-weight-semibold);
  }
  .hint {
    padding: var(--tg-spacing-8) var(--tg-spacing-4) var(--tg-spacing-4) 0;
    font-size: var(--tg-font-size-xs);
    color: var(--tg-secondary-light);
  }
}
</style>
