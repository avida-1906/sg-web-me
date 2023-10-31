<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { updateUserInfo } = useAppStore()
const { openEmailCodeDialog, closeEmailCodeDialog } = useEmailCodeDialog()
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
  else if (value !== payPassword.value)
    return '两次输入的交易密码不一致'
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

const getPayPwdState = computed(() => {
  return userInfo.value?.pay_password === '1'
})

function fieldVerifyPayPwd(value: string) {
  if (!value)
    return t('pls_enter_password')
  else if (!payPasswordReg.test(value))
    return '您的交易密码含有6位数字'
  else if (aginPayPassword.value)
    valiAginPayPwd()
  return ''
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
</script>

<template>
  <div class="tg-settings-security">
    <AppSettingsContentItem
      title="交易密码"
      last-one
      :btn-loading="payPasswordUpdateLoading"
      :badge="getPayPwdState"
      @submit="submitPayPwd"
    >
      <template #top-desc>
        交易密码将用于保护提款，保险库取款安全。
      </template>
      <BaseLabel label="密码" must-small>
        <BaseInputPassword
          v-model="payPassword"
          :msg="payPwdErrorMsg"
        />
      </BaseLabel>
      <BaseLabel label="确认密码" must-small>
        <BaseInputPassword
          v-model="aginPayPassword"
          :msg="aginPayPwdErrorMsg"
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
