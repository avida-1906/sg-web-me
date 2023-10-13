<script setup lang='ts'>
interface IRegParams {
  email: string
  username: string
  password: string
  birthday: string
  parent_id?: string
  device_number?: string
}

const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const { bool: checkboxValue } = useBoolean(false)
const { bool: pwdStatus, setBool: setPwdStatus } = useBoolean(false)
const { openTermsConditionsDialog } = useTermsConditionsDialog()

const curExists = ref<1 | 2>(2)
const birthdayInputRef = ref()
const birthday = ref('')
const {
  bool: isShowPasswordVerify,
  setTrue: setShowPasswordVerifyTrue,
  setFalse: setShowPasswordVerifyFalse,
} = useBoolean(false)
const {
  bool: needSaveFormData,
  setTrue: setNeedSaveFormDataTrue,
} = useBoolean(false)

const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: validateEmail,
  setErrors: setEmailErrors,
} = useField<string>('email', (value) => {
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
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: validateUsername,
  setErrors: setUsernameErrors,
} = useField<string>('username', (value) => {
  if (!value)
    return t('pls_enter_username')

  if (!usernameReg.test(value))
    return t('username_incorrect')
    // 此用户名已被使用，请选择另一用户名。
    // 用户名含有无效的字符
    // 您的用户名长度必须为 3 – 14 个字符。
  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: validatePassword,
} = useField<string>('password', (value) => {
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

const regParams = computed(() =>
  Session.get(STORAGE_REG_PARAMS_KEYWORDS)?.value as IRegParams)

const { run: runExists } = useRequest(ApiMemberExists, {
  onError() {
    if (curExists.value === 2)
      setEmailErrors('邮箱已存在,请重新填写邮箱')
    else if (curExists.value === 1)
      setUsernameErrors('用户名已存在,请重新填写用户名')
  },
})

async function getMemberReg() {
  await validateEmail()
  await validateUsername()
  await validatePassword()
  birthdayInputRef.value.valiBirthday()
  if (
    !emailErrorMsg.value
    && !usernameErrorMsg.value
    && !pwdErrorMsg.value
    && birthday.value
  ) {
    const paramsReg = {
      email: email.value,
      username: username.value,
      password: password.value,
      parent_id: '',
      birthday: birthday.value,
      device_number: application.getDeviceNumber(),
    }
    Session.set(STORAGE_REG_PARAMS_KEYWORDS, paramsReg)
    setNeedSaveFormDataTrue()
    closeDialog()
    await nextTick()
    openTermsConditionsDialog()
  }
}
function onFocus() {
  setShowPasswordVerifyTrue()
}
function onPasswordBlur() {
  if (pwdStatus.value)
    setShowPasswordVerifyFalse()
}
function passwordVerifyPass(status: boolean) {
  setPwdStatus(status)
}
function onEmailUsernameBlur(type: 1 | 2) {
  curExists.value = type
  if (type === 1 ? username.value && !usernameErrorMsg.value : email.value && !emailErrorMsg.value)
    runExists({ ty: type, val: type === 1 ? username.value : email.value })
}

/** 如果保存了自动填充 */
if (regParams.value) {
  email.value = regParams.value?.email
  username.value = regParams.value?.username
  password.value = regParams.value?.password
  birthday.value = regParams.value?.birthday
}
onUnmounted(() => {
  if (!needSaveFormData.value)
    Session.remove(STORAGE_REG_PARAMS_KEYWORDS)
})
</script>

<template>
  <div class="app-register">
    <div class="app-register-title">
      {{ t('reg_step1') }}
    </div>
    <div class="app-register-input-box">
      <BaseLabel :label="t('email_address')" must-small>
        <BaseInput
          v-model="email"
          :msg="emailErrorMsg"
          :placeholder="t('pls_enter_email_address')"
          @blur="onEmailUsernameBlur(2)"
        />
      </BaseLabel>
      <BaseLabel :label="t('username')" must-small>
        <BaseInput
          v-model="username"
          :msg="usernameErrorMsg"
          :placeholder="t('pls_enter_username')"
          @blur="onEmailUsernameBlur(1)"
        />
      </BaseLabel>
      <BaseLabel :label="t('password')" must-small>
        <BaseInput
          v-model="password"
          :msg="pwdErrorMsg"
          :placeholder="t('pls_enter_password')" type="password"
          autocomplete="current-password"
          :password="password"
          @focus="onFocus" @blur="onPasswordBlur"
        />
        <AppPasswordVerify
          v-show="isShowPasswordVerify"
          :password="password"
          @pass="passwordVerifyPass"
        />
      </BaseLabel>
      <BaseLabel label="出生日期" must-small>
        <BaseInputBirthday ref="birthdayInputRef" v-model="birthday" />
      </BaseLabel>
    </div>
    <div class="app-register-check-box">
      <BaseCheckBox v-model="checkboxValue">
        {{ t('code_optional') }}
      </BaseCheckBox>
      <BaseButton
        class="app-register-btn"
        bg-style="secondary"
        size="xl"
        @click.stop="getMemberReg"
      >
        {{ t('continue') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-register {
  &-title {
    color: var(--tg-text-lightgrey);
    text-align: center;
    font-family: PingFang SC;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: var(--tg-font-weight-semibold);
    line-height: normal;
    padding-bottom: var(--tg-spacing-16);
  }
  &-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
  }
  &-check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    padding-top: var(--tg-spacing-button-padding-vertical-xs);
    font-weight: var(--tg-font-weight-semibold);
  }
  &-btn {
    width: 100%;
  }
  .app-register-btn{
    font-size: var(--tg-font-size-base);
  }
}
</style>
