<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { updateUserInfo } = useAppStore()
const { openEmailCodeDialog, closeEmailCodeDialog } = useEmailCodeDialog()

const pwdRef = ref()
const aginPwdRef = ref()
// 资金密码
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
  else if (value !== payPassword.value)
    return '两次输入的资金密码不一致'
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
      message: '设置资金密码成功',
    })
    // 资金密码设置成功之后，刷新用户信息
    updateUserInfo()
    closeEmailCodeDialog()
  },
})

const getPayPwdState = computed(() => {
  return userInfo.value?.pay_password === '1'
})

function fieldVerifyPayPwd(value: string) {
  if (!value)
    return t('pls_enter_password')
  else if (!payPasswordReg.test(value))
    return '您的资金密码含有6位数字'
  else if (aginPayPassword.value)
    valiAginPayPwd()
  return ''
}
// 提交支付密码
async function submitPayPwd() {
  pwdRef.value.setTouchTrue()
  aginPwdRef.value.setTouchTrue()
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
</script>

<template>
  <div class="tg-settings-security">
    <AppSettingsContentItem
      title="资金密码"
      last-one
      :btn-loading="payPasswordUpdateLoading"
      :badge="getPayPwdState"
      @submit="submitPayPwd"
    >
      <template #top-desc>
        资金密码将用于保护提款，保险库取款安全。
      </template>
      <BaseLabel label="密码" must-small>
        <BaseInputPassword
          ref="pwdRef"
          v-model="payPassword"
          :msg="payPwdErrorMsg"
          msg-after-touched
        />
      </BaseLabel>
      <BaseLabel label="确认密码" must-small>
        <BaseInputPassword
          ref="aginPwdRef" v-model="aginPayPassword"
          :msg="aginPayPwdErrorMsg"
          msg-after-touched
        />
      </BaseLabel>
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
  browserTitle: 资金密码 – Stake.com
  </route>
