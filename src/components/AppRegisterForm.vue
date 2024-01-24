<script setup lang='ts'>
import type { IMemberReg } from '~/apis/types'

interface Props {
  /** 是否在注册弹框中 */
  isRegister?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isRegister: false,
})

// #region 变量
const { t } = useI18n()
const { openNotify } = useNotify()
const { bool: pwdStatus, setBool: setPwdStatus } = useBoolean(true)
const { bool: isCode } = useBoolean(false)
const {
  bool: isShowPasswordVerify,
  setTrue: setShowPasswordVerifyTrue,
  setFalse: setShowPasswordVerifyFalse,
} = useBoolean(false)
const { bool: needSaveFormData, setTrue: setNeedSaveFormDataTrue } = useBoolean(true)
const router = useRouter()
const emailRef = ref()
const userNameRef = ref()
const passwordRef = ref()
const curExists = ref<1 | 2>(2)
const code = ref('')
const birthdayInputRef = ref()
const birthday = ref('')
const parentUid = ref(router.currentRoute.value.query.uid)
const mailCodeRef = ref()
const timer = ref()
const countdown = ref(60)
// #endregion

// #region 表单字段验证
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: validatePassword,
  meta: pwdMeta,
  resetField: restPwd,
} = useField<string>('password', (value) => {
  if (!value)
    return t('pop_up_create_account_password_least_8_characters')
  else if (value.length < 8)
    return t('pop_up_create_account_password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('pop_up_create_account_password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('pop_up_create_account_password_least_1_number')
  return ''
})
const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: validateEmail,
  setErrors: setEmailErrors,
  resetField: restEmail,
  setValue: setEmail,
} = useField<string>('email', (value) => {
  const lastAtIdx = value ? value.lastIndexOf('@') : -1
  const lastDotIdx = value ? value.lastIndexOf('.') : -1
  if (!value)
    return t('pop_up_create_account_no_support_email')

  else if (!value.includes('@'))
    return [t('pop_up_create_account_email_add_char', { delta: '@' })]

  else if (!value.includes('.'))
    return t('pop_up_create_account_no_dot_email_add_char', { delta: '.' })

  else if (lastDotIdx === value.length - 1)
    return t('pop_up_create_account_no_support_email')

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
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: validateUsername,
  setErrors: setUsernameErrors,
  resetField: restName,
  setValue: setUsername,
} = useField<string>('username', (value) => {
  if (!value)
    return t('pop_up_create_account_name_3_char')
  else if (value.length < 3)
    return t('pop_up_create_account_name_3_char')
  else if (value.match('[^a-z0-9]'))
    return t('name_has_invalid_char')
  else if (value.length > 14)
    return t('pop_up_create_account_name_14_char')
  else if (value === password.value)
    return t('name_no_equal_pwd')
  else if (!usernameReg.test(value))
    return t('validate_msg_user_name_tip')
  // 此用户名已被使用，请选择另一用户名。
  // 用户名含有无效的字符
  // 您的用户名长度必须为 3 – 14 个字符。
  return ''
})
const {
  value: emailCode,
  errorMessage: emailCodeErrorMsg,
  validate: valiemailCode,
  resetField: resetEmailCode,
} = useField<string>('emailCode', (value) => {
  if (!value)
    return t('validate_msg_input_code')
  else if (value.length !== 6)
    return t('validate_msg_regexp_code')
  return ''
})
// #endregion

const {
  runAsync: runAsyncMemberSendMailReg,
  loading: sendMailCodeLoading,
} = useRequest(ApiMemberSendMailReg, {
  onSuccess() {
    timer.value = setInterval(() => {
      if (countdown.value <= 1) {
        clearInterval(timer.value)
        timer.value = null
        countdown.value = 60
      }
      else { countdown.value-- }
    }, 1000)
    openNotify({
      type: 'success',
      title: t('notify_title_success'),
      message: t('success_send_code'),
    })
  },
})

const regParams = computed(() => {
  return props.isRegister
    ? Session.get<IMemberReg>(STORAGE_REG_PARAMS_KEYWORDS)?.value
    : undefined
})
if (regParams.value) {
  setEmail(regParams.value.email ?? '', false)
  setUsername(regParams.value.username ?? '', false)
  birthday.value = regParams.value.birthday ?? ''
}

// const {
//   value: isAgree,
//   errorMessage: agreeErrorMsg,
//   validate: valiAgree,
// } = useField<boolean>('checkbox', (value) => {
//   if (!value)
//     return t('agree_terms_conditions')
//   return ''
// }, { initialValue: true })

// const {
//   run: runMemberReg,
//   loading: isLoading,
// } = useRequest(ApiMemberReg, {
//   manual: true,
//   onSuccess: async (res) => {
//     appStore.setToken(res)
//     Session.remove(STORAGE_REG_PARAMS_KEYWORDS)
//     openNotify({
//       type: 'success',
//       message: t('success_register'),
//     })
//     await nextTick()
//     closeDialog()
//   },
// })
const { runAsync: runExists } = useRequest(ApiMemberExists, {
  async onSuccess() {
  },
  onError() {
    if (curExists.value === 1)
      setUsernameErrors(t('choose_another_name'))
    if (curExists.value === 2)
      setEmailErrors(t('email_exists'))
  },
})

const { data: brandRegDetail, runAsync: runAsyncBrandRegDetail } = useRequest(ApiMemberBrandDetail)

const regDetailConfig = computed(() => {
  if (!brandRegDetail.value) {
    return {
      email: false,
      email_validation: false,
      username: false,
      birthday: false,
    }
  }
  return {
    email: brandRegDetail.value.web.email,
    email_validation: brandRegDetail.value.web.email_validation,
    birthday_check: brandRegDetail.value.web.birthday_check,
  }
})
const needEmail = computed(() => regDetailConfig.value.email)
const needName = computed(() => true)
const needCheckEmail = computed(() => regDetailConfig.value.email_validation)
const needBirthday = computed(() => regDetailConfig.value.birthday_check)
const pwdTouched = computed(() => passwordRef.value?.isTouched)

async function getMemberReg(callBack: (data: any) => void) {
  if (needName.value) {
    userNameRef.value?.setTouchTrue()
    await validateUsername()
    if (!usernameErrorMsg.value)
      await onEmailUsernameBlur(1)
  }

  passwordRef.value.setTouchTrue()
  await validatePassword()
  if (pwdErrorMsg.value)
    setShowPasswordVerifyTrue()

  if (needEmail.value) {
    emailRef.value?.setTouchTrue()
    await validateEmail()
    !emailErrorMsg.value && await onEmailUsernameBlur(2)
  }

  if (needCheckEmail.value) {
    mailCodeRef.value.setTouchTrue()
    await valiemailCode()
  }

  if (needBirthday.value) {
    await birthdayInputRef.value.valiBirthday()
    if (!birthdayInputRef.value.isValid)
      return
  }

  // 这个不要删：有错误时直接返回，否则重复的邮箱或用户名会因通过格式校验从而进行注册请求
  if (
    (needEmail.value && emailErrorMsg.value)
    || usernameErrorMsg.value
    || pwdErrorMsg.value
  ) return

  if (!usernameErrorMsg.value
    && !pwdErrorMsg.value
    && !emailCodeErrorMsg.value) {
    const paramsReg = {
      email: email.value,
      username: username.value,
      password: password.value,
      parent_uid: parentUid.value,
      device_number: application.getDeviceNumber(),
      birthday: birthday.value,
    }
    // appStore.setMqttConnectedFalse()
    // runMemberReg(paramsReg)
    if (props.isRegister) {
      Session.set(STORAGE_REG_PARAMS_KEYWORDS, paramsReg)
      setNeedSaveFormDataTrue()
    }
    callBack && callBack(paramsReg)
    // closeDialog()
    // await nextTick()
    // openTermsConditionsDialog()
    // {
    //   showClose: !(parentUid.value && parentUid.value.length),
    //   closeOnClickOverlay: !(parentUid.value && parentUid.value.length),
    // }
  }
}
function onPasswordFocus() {
  setShowPasswordVerifyTrue()
}
function onPasswordBlur() {
  if (pwdMeta.dirty) {
    passwordRef.value.setTouchTrue()
    validatePassword()
  }
  if (pwdStatus.value)
    setShowPasswordVerifyFalse()
}
function passwordVerifyPass(status: boolean) {
  setPwdStatus(status)
}
async function onEmailUsernameBlur(type: 1 | 2) {
  curExists.value = type
  if (type === 1 && username.value && !usernameErrorMsg.value)
    await runExists({ ty: type, val: username.value, noNotify: true })
  if (type === 2 && email.value && !emailErrorMsg.value)
    await runExists({ ty: type, val: email.value })
}
function resetForm() {
  restPwd()
  restEmail()
  restName()
  resetEmailCode()
  birthdayInputRef.value.resetBirthday()
}
async function sendEmailCode() {
  if (needCheckEmail.value) {
    emailRef.value.setTouchTrue()
    await validateEmail()
    if (emailErrorMsg.value)
      return

    runAsyncMemberSendMailReg({ email: email.value })
  }
}

onMounted(() => {
  emailRef.value?.getFocus()
})

onUnmounted(() => {
  if (props.isRegister) {
    const paramsReg = {
      email: email.value,
      username: username.value,
      password: password.value,
      parent_uid: parentUid.value,
      device_number: application.getDeviceNumber(),
      birthday: birthday.value,
    }
    if (!needSaveFormData.value)
      Session.remove(STORAGE_REG_PARAMS_KEYWORDS)

    else
      Session.set(STORAGE_REG_PARAMS_KEYWORDS, paramsReg)
  }
})

defineExpose({ getMemberReg, resetForm })

await application.allSettled([runAsyncBrandRegDetail({ tag: 'reg' })])
</script>

<template>
  <div class="app-register">
    <div class="app-register-input-box">
      <BaseLabel v-if="needEmail" :label="t('pop_up_create_account_label_email_address')" need-focus must-small>
        <BaseInput
          ref="emailRef" v-model="email"
          :msg="emailErrorMsg" msg-after-touched type="email" name="email"
        />
      </BaseLabel>
      <BaseLabel v-if="needName" :label="t('username')" must-small need-focus>
        <BaseInput
          ref="userNameRef" v-model="username"
          :msg="usernameErrorMsg" name="name" msg-after-touched
          @blur="onEmailUsernameBlur(1)"
        />
        <div v-if="!usernameErrorMsg" class="hint">
          {{ t('pop_up_create_account_username_incorrect') }}
        </div>
      </BaseLabel>
      <BaseLabel :label="t('password')" must-small need-focus>
        <BaseInput
          ref="passwordRef" v-model="password"
          :msg="pwdErrorMsg" type="password" name="password"
          autocomplete="current-password"
          msg-after-touched @focus="onPasswordFocus" @blur="onPasswordBlur"
        />
        <AppPasswordVerify
          v-show="isShowPasswordVerify"
          :password="password" :has-error-msg="!!pwdErrorMsg"
          :pwd-touched="pwdTouched" @pass="passwordVerifyPass"
        />
      </BaseLabel>

      <BaseLabel v-if="needCheckEmail" :label="t('email_code')" need-focus>
        <div class="row-mail-code">
          <div style="flex:  1;">
            <BaseInput
              ref="mailCodeRef" v-model="emailCode"
              :msg="emailCodeErrorMsg" type="text" max="6"
              msg-after-touched
            />
          </div>
          <BaseButton
            bg-style="primary" :loading="sendMailCodeLoading"
            :disabled="!!timer" custom-padding :style="{
              '--tg-base-button-style-bg': timer ? 'var(--tg-text-grey)' : '',
              'min-width': '105px',
              '--tg-base-button-padding-y': '11px',
            }" @click.stop="sendEmailCode"
          >
            <span v-if="timer">{{ `${t('re_get')}${countdown}s` }}</span>
            <span v-else>{{ t('get_email_code') }}</span>
          </BaseButton>
        </div>
      </BaseLabel>
      <BaseLabel v-if="needBirthday" :label="t('time_birthday')" must-small>
        <BaseInputBirthday ref="birthdayInputRef" v-model="birthday" />
      </BaseLabel>
      <div v-if="isRegister" style="display: flex;flex-direction: column;">
        <div class="code-label">
          <BaseCheckBox v-model="isCode">
            <span class="option-label">{{ t('code_optional') }}</span>
          </BaseCheckBox>
        </div>
        <div class="code-input">
          <BaseInput v-show="isCode" v-model="code" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.row-mail-code {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: var(--tg-spacing-10);
}

.option-label {
  display: inline-block;
  padding-top: 6px;
  padding-bottom: 4px;
}

.hint {
  padding: var(--tg-spacing-8) var(--tg-spacing-4) var(--tg-spacing-4) 0;
  font-size: var(--tg-font-size-xs);
  color: var(--tg-secondary-light);
}
.app-register {
  --tg-base-input-style-pad-x: 7px;
  --tg-spacing-input-padding-vertical: 7.25px;

  &-title {
    color: var(--tg-secondary-light);
    text-align: center;
    font-size: var(--tg-font-size-base);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 24px;
    padding-bottom: var(--tg-spacing-16);
    padding-top: var(--tg-spacing-16);
  }

  &-input-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);

    .code-label {
      display: flex;
      justify-content: flex-start;
    }

    .code-input {
      margin-top: 4px;
    }
  }

  &-check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    padding-top: 16px;

    .agree {
      display: flex;
      align-items: center;
    }
  }

  &-btn {
    width: 100%;
  }
}
</style>
