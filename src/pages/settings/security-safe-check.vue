<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { updateUserInfo } = useAppStore()
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

const doubleVerified = computed(() => {
  return userInfo.value?.google_verify === 2
})
const getQRcodeUrl = computed(() => {
  if (userInfo.value)
    return generateQRCodeUrl({ label: 'sg', email: userInfo.value.email, secret: userInfo.value.google_key })
})

function fieldVerifyLoginPwd(value: string) {
  if (!value)
    return t('pls_enter_password')
  else if (value.length < 8)
    return t('password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  return ''
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
  browserTitle: 双重验证 – Stake.com
  </route>
