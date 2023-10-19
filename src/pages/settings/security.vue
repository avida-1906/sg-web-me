<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { updateUserInfo } = useAppStore()
const { openEmailCodeDialog, closeEmailCodeDialog } = useEmailCodeDialog()
// 登录密码
const { bool: pwdStatus, setBool: setPwdStatus } = useBoolean(false)
const { runMemberLogout, logoutLoading } = useLogout()
const {
  bool: isShowPasswordVerify,
  setBool: setShowPasswordVerify,
} = useBoolean(false)
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: valiPassword,
} = useField<string>('password', fieldVerifyLoginPwd)
const {
  value: newPassword,
  errorMessage: newPwdErrorMsg,
  validate: valiNewPassword,
} = useField<string>('newPassword', fieldVerifyLoginPwd)
const {
  value: repeatPassword,
  errorMessage: repeatPwdErrorMsg,
  validate: valiRepeatPassword,
} = useField<string>('repeatPassword', (value) => {
  if (!value)
    return t('pls_enter_password')
  if (value !== newPassword.value)
    return '两次输入的密码不一致'
  return ''
})
const {
  run: runMemberPasswordUpdate,
  loading: passwordUpdateLoading,
} = useRequest(ApiMemberPasswordUpdate, {
  onSuccess() {
    openNotify({
      type: 'success',
      title: '成功',
      message: '修改密码成功',
    })
    // 修改密码成功之后退出登陆
    runMemberLogout()
  },
})
// 交易密码
const {
  value: payPassword,
  errorMessage: payPwdErrorMsg,
  validate: valiPayPwd,
} = useField<string>('payPassword', fieldVerifyPayPwd)
const {
  value: aginPayPassword,
  errorMessage: aginPayPwdErrorMsg,
  validate: valiAginPayPwd,
} = useField<string>('aginPayPassword', (value) => {
  if (!value)
    return t('pls_enter_password')
  if (value !== payPassword.value)
    return '两次输入的交易密码不一致'
  return ''
})
/** 双重验证 */
const {
  value: loginPassword,
  errorMessage: loginPwdErrorMsg,
  validate: validateLoginPwd,
} = useField<string>('loginPassword', fieldVerifyLoginPwd)
const {
  value: doublePassword,
  errorMessage: doublePwdErrorMsg,
  validate: validateDoublePwd,
} = useField<string>('doublePassword', (value) => {
  if (!value)
    return '请输入双重验证密码'
  return ''
})
const {
  run: runMemberPayPasswordUpdate,
  loading: payPasswordUpdateLoading,
} = useRequest(ApiMemberPayPasswordUpdate, {
  onSuccess() {
    openNotify({
      type: 'success',
      title: '成功',
      message: '设置交易密码成功',
    })
    // 交易密码设置成功之后，刷新用户信息
    updateUserInfo()
    closeEmailCodeDialog()
  },
})
const {
  run: runMemberDualVerify,
  loading: dualVerifyLoading,
} = useRequest(ApiMemberDualVerify, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: '设置双重验证密码成功',
    })
    updateUserInfo()
  },
})

const getPayPwdState = computed(() => {
  return userInfo.value?.pay_password === '1'
})
const doubleVerified = computed(() => {
  return userInfo.value?.google_verify === '2'
})
const getQRcodeUrl = computed(() => {
  if (userInfo.value)
    return generateQRCodeUrl({ label: 'sg', email: userInfo.value.email, secret: userInfo.value.google_key })
})

function fieldVerifyLoginPwd(value: string) {
  if (!value)
    return t('pls_enter_password')
  if (value.length < 8)
    return t('password_least_8_characters')
  if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  if (repeatPassword.value)
    valiRepeatPassword()
  return ''
}
function fieldVerifyPayPwd(value: string) {
  if (!value)
    return t('pls_enter_password')
  if (!payPasswordReg.test(value))
    return '您的交易密码含有6位数字'
  if (aginPayPassword.value)
    valiAginPayPwd()
  return ''
}
function onBlur() {
  if (pwdStatus.value)
    setShowPasswordVerify(false)
}
function passwordVerifyPass(status: boolean) {
  setPwdStatus(status)
}
// 提交登陆密码
async function submitLoginPwd() {
  await valiPassword()
  await valiNewPassword()
  await valiRepeatPassword()
  if (!(pwdErrorMsg.value || newPwdErrorMsg.value || repeatPwdErrorMsg.value)) {
    runMemberPasswordUpdate({
      password: password.value,
      new_password: newPassword.value,
    })
  }
}
// 提交支付密码
async function submitPayPwd() {
  if (userInfo.value?.email_check_state === 1) {
    await valiPayPwd()
    await valiAginPayPwd()
    if (!(payPwdErrorMsg.value || aginPayPwdErrorMsg.value)) {
      openEmailCodeDialog({
        runSubmit: (emailCode: string) => {
          runMemberPayPasswordUpdate({
            pay_password: payPassword.value,
            code: emailCode,
          })
        },
        loading: payPasswordUpdateLoading,
      })
    }
  }
  else {
    openNotify({
      type: 'error',
      title: '错误',
      message: '邮箱未验证',
    })
  }
}
async function submitDoublePassword() {
  await validateLoginPwd()
  await validateDoublePwd()
  if (!loginPwdErrorMsg.value && !doublePwdErrorMsg.value)
    runMemberDualVerify({ password: loginPassword.value, code: doublePassword.value })
}

/**
 *
 * @param params
 * label: appName
 * email: userEmail
 * secret: 密钥
 */
function generateQRCodeUrl(params: {
  label: string
  email: string
  secret: string
}) {
  return `otpauth://totp/${encodeURIComponent(params.label)}:${encodeURIComponent(params.email)}?secret=${params.secret}&issuer=${encodeURIComponent(params.label)}`
}
</script>

<template>
  <div class="tg-settings-security">
    <AppSettingsContentItem
      title="密码"
      :btn-loading="passwordUpdateLoading && logoutLoading"
      @submit="submitLoginPwd"
    >
      <BaseLabel label="旧密码" must-small>
        <BaseInput v-model="password" :msg="pwdErrorMsg" type="password" />
      </BaseLabel>
      <BaseLabel label="新密码" must-small>
        <BaseInput
          v-model="newPassword"
          :msg="newPwdErrorMsg"
          type="password"
          @focus="setShowPasswordVerify(true)"
          @blur="onBlur"
        />
        <AppPasswordVerify
          v-show="isShowPasswordVerify"
          :password="newPassword"
          @pass="passwordVerifyPass"
        />
      </BaseLabel>
      <BaseLabel label="确认新密码" must-small>
        <BaseInput
          v-model="repeatPassword"
          :msg="repeatPwdErrorMsg"
          type="password"
        />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem
      title="交易密码"
      :btn-loading="payPasswordUpdateLoading"
      :badge="getPayPwdState"
      :verified="getPayPwdState"
      @submit="submitPayPwd"
    >
      <template #top-desc>
        交易密码将用于保护提款，保险库取款安全。
      </template>
      <BaseLabel label="密码" must-small>
        <BaseInputPassword
          v-model="payPassword"
          :msg="payPwdErrorMsg"
          :disabled="getPayPwdState"
        />
      </BaseLabel>
      <BaseLabel label="确认密码" must-small>
        <BaseInputPassword
          v-model="aginPayPassword"
          :msg="aginPayPwdErrorMsg"
          :disabled="getPayPwdState"
        />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem
      title="双重验证"
      last-one
      :btn-loading="dualVerifyLoading"
      :verified="doubleVerified"
      :badge="doubleVerified"
      @submit="submitDoublePassword"
    >
      <template #top-desc>
        启用双重验证以让您的账户更加安全。
      </template>
      <div class="two-step-verification">
        <AppCopyLine
          v-if="userInfo"
          label="将代码复制到您的身份验证器应用程序（Authenticator App）"
          :msg="userInfo.google_key"
        />
        <p class="mt-16">
          防止他人看到此页！
        </p>
        <div v-if="getQRcodeUrl" class="qr-wrap">
          <BaseQrcode :url="getQRcodeUrl" class="mt-16" />
        </div>
        <div class="mt-16">
          <BaseLabel label="密码" must-small>
            <BaseInput
              v-model="loginPassword"
              :msg="loginPwdErrorMsg"
              :disabled="doubleVerified"
              placeholder="请输入登陆密码"
              type="password"
            />
          </BaseLabel>
          <div class="mt-16">
            <BaseLabel label="双重验证" must-small>
              <BaseInput
                v-model="doublePassword"
                :msg="doublePwdErrorMsg"
                :disabled="doubleVerified"
                placeholder="请输入双重验证密码"
                type="password"
              />
            </BaseLabel>
          </div>
        </div>
      </div>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-security {
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  .two-step-verification{
    .text{
      padding-bottom: var(--tg-spacing-4);
    }
    .mt-16{
      margin-top: var(--tg-spacing-16);
    }
    .qr-wrap{
      width: 144px;
      height: 144px;
    }

  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 安全 – Stake.com
  </route>
