<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const { bool: isShowPasswordVerify, setTrue: setShowPasswordVerifyTrue } = useBoolean(false)
const { value: password, errorMessage: pwdErrorMsg, validate: valiPassword } = useField<string>('password', fieldVerify)
const { value: newPassword, errorMessage: newPwdErrorMsg, validate: valiNewPassword } = useField<string>('newPassword', fieldVerify)
const { value: repeatPassword, errorMessage: repeatPwdErrorMsg, validate: valiRepeatPassword } = useField<string>('repeatPassword', (value) => {
  if (!value)
    return t('pls_enter_password')
  if (value !== newPassword.value)
    return '两次输入的密码不一致'
  return ''
})
const { run: runMemberPasswordUpdate, loading: passwordUpdateLoading } = useRequest(ApiMemberPasswordUpdate, {
  onSuccess() {
    openNotify({
      type: 'success',
      title: '成功',
      message: '修改密码成功',
    })
  },
})

const twoStepPassword = ref('')
const transPassword = ref('')
const aginTransPassword = ref('')
const twoStepCode = ref('HM3XE2DLGVWECZDYK5BUMNTQORGVCKBVO5MG4JBSG46EGMCSHZEA')

function fieldVerify(value: string) {
  if (!value)
    return t('pls_enter_password')

  if (value.length < 8)
    return t('password_least_8_characters')

  if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')

  if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')

  return ''
}
async function handleSubmit() {
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
</script>

<template>
  <div class="tg-settings-security">
    <AppSettingsContentItem title="密码" :btn-loading="passwordUpdateLoading" @submit="handleSubmit">
      <BaseLabel label="旧密码" must-small>
        <BaseInput v-model="password" :msg="pwdErrorMsg" type="password" />
      </BaseLabel>
      <BaseLabel label="新密码" must-small>
        <BaseInput v-model="newPassword" :msg="newPwdErrorMsg" type="password" @focus="setShowPasswordVerifyTrue" />
        <AppPasswordVerify v-show="isShowPasswordVerify" :password="newPassword" />
      </BaseLabel>
      <BaseLabel label="确认新密码" must-small>
        <BaseInput v-model="repeatPassword" :msg="repeatPwdErrorMsg" type="password" />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="交易密码">
      <template #top-desc>
        交易密码将用于保护提款，保险库取款安全。
      </template>
      <BaseLabel label="密码" must-small>
        <BaseInputPassword v-model="transPassword" />
      </BaseLabel>
      <BaseLabel label="确认密码" must-small>
        <BaseInputPassword v-model="aginTransPassword" />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="双重验证" last-one>
      <template #top-desc>
        启用双重验证以让您的账户更加安全。
      </template>
      <div class="two-step-verification">
        <AppCopyLine label="将代码复制到您的身份验证器应用程序（Authenticator App）" :msg="twoStepCode" />
        <p class="mt-16">
          防止他人看到此页！
        </p>
        <div class="qr-wrap">
          <BaseQrcode url="www.baidu.com" class="mt-16" />
        </div>
        <div class="mt-16">
          <BaseLabel label="密码" must-small>
            <BaseInput v-model="password" :msg="pwdErrorMsg" placeholder="请输入用户名" type="password" />
          </BaseLabel>
          <div class="mt-16">
            <BaseLabel label="双重验证" must-small>
              <BaseInput v-model="twoStepPassword" :msg="pwdErrorMsg" />
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
