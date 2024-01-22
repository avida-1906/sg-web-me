<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('two_step_verification') })
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { runMemberAuthConfig, isSetAuth, loadingAuthConfig } = useBrandBaseDetail()
/** 双重验证 */
const {
  value: loginPassword,
  errorMessage: loginPwdErrorMsg,
  validate: validateLoginPwd,
  resetField: resetLoginPassword,
} = useField<string>('loginPassword', fieldVerifyLoginPwd)
const {
  value: doublePassword,
  errorMessage: doublePwdErrorMsg,
  validate: validateDoublePwd,
  resetField: resetDoublePassword,
} = useField<string>('doublePassword', (value) => {
  if (!value)
    return t('pls_input_double_check_pwd')
  return ''
})
// 获取二阶段验证密钥
const {
  data: authSecret,
  run: runMemberAuthSecret,
} = useRequest(ApiMemberAuthSecret, {
  onSuccess() {
  },
})
// 设定二阶段验证
const {
  run: runMemberAuthSet,
  loading: loadMemberAuthSet,
} = useRequest(ApiMemberAuthSet, {
  onSuccess() {
    runMemberAuthConfig()
    openNotify({
      type: 'success',
      message: t('success_set_double_check'),
    })
    resetLoginPassword()
    resetDoublePassword()
  },
})
// 关闭二阶段验证
const {
  run: runMemberAuthClose,
  loading: loadMemberAuthClose,
} = useRequest(ApiMemberAuthClose, {
  onSuccess() {
    runMemberAuthConfig()
    openNotify({
      type: 'success',
      message: t('success_close_double_check'),
    })
    resetLoginPassword()
    resetDoublePassword()
  },
})

const getQRcodeUrl = computed(() => {
  if (userInfo.value)
    return generateQRCodeUrl({ label: 'sg', email: userInfo.value.email, secret: authSecret.value ?? '' })
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
  if (!loginPwdErrorMsg.value && !doublePwdErrorMsg.value) {
    const data = { password: loginPassword.value, auth_code: doublePassword.value }
    isSetAuth.value ? runMemberAuthClose(data) : runMemberAuthSet(data)
  }
}
function generateQRCodeUrl(params: {
  /** appName */
  label: string
  /** email */
  email: string
  /** 密钥 */
  secret: string
}) {
  return `otpauth://totp/${encodeURIComponent(params.label)}:${encodeURIComponent(params.email)}?secret=${params.secret}&issuer=${encodeURIComponent(params.label)}`
}
function awaitHandle() {
  return new Promise((resolve) => {
    let timer: NodeJS.Timeout | null = setInterval(() => {
      if (!loadingAuthConfig.value) {
        timer && clearInterval(timer)
        timer = null
        return resolve(true)
      }
    }, 200)
  })
}

watch(() => isSetAuth.value, (val) => {
  if (!val)
    runMemberAuthSecret()
}, { immediate: true })

await application.allSettled([awaitHandle()])
</script>

<template>
  <div class="tg-settings-security">
    <AppSettingsContentItem
      :title="isSetAuth ? t('close_verification') : t('two_step_verification') "
      last-one
      :btn-loading="loadMemberAuthSet || loadMemberAuthClose || loadingAuthConfig"
      :btn-text="isSetAuth ? 'close' : 'submit'"
      @submit="submitDoublePassword"
    >
      <template #top-desc>
        {{ t('tip_start_double_check') }}
      </template>
      <div class="two-step-verification">
        <template v-if="!isSetAuth">
          <AppCopyLine
            v-if="userInfo"
            :label="t('copy_to_google')"
            :msg="authSecret ?? ''"
          />
          <p class="tg-mt-16" style="line-height: 1.5;">
            {{ t('hide_from_others') }}
          </p>
          <div v-if="getQRcodeUrl" class="qr-wrap">
            <BaseQrcode :url="getQRcodeUrl" class="tg-mt-16" />
          </div>
        </template>
        <div>
          <BaseLabel :label="t('login_pwd')" must-small>
            <BaseInput
              v-model="loginPassword"
              :msg="loginPwdErrorMsg"
              type="password"
            />
          </BaseLabel>
          <div class="tg-mt-16">
            <BaseLabel :label="t('double_check_code')" must-small>
              <BaseInput
                v-model="doublePassword"
                :msg="doublePwdErrorMsg"
                type="text"
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
    .tg-mt-16{
      margin-top: var(--tg-spacing-16);
    }
    .qr-wrap{
      width: 144px;
      height: 144px;
      margin-bottom: 16px;
    }

  }
}
</style>

<route lang="yaml">
  </route>
