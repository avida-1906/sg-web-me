<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
// 登录密码
const { runMemberLogout, logoutLoading } = useLogout()
const { bool: pwdStatus, setBool: setPwdStatus } = useBoolean(true)
const {
  bool: isShowPasswordVerify,
  setTrue: setShowPasswordVerifyTrue,
  setFalse: setShowPasswordVerifyFalse,
} = useBoolean(false)
const pwdRef = ref()
const newPwd = ref()
const repeatPwd = ref()
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: valiPassword,
} = useField<string>('password', fieldVerifyLoginPwd)
const {
  value: newPassword,
  errorMessage: newPwdErrorMsg,
  validate: valiNewPassword,
  meta: newPwdMeta,
} = useField<string>('newPassword', fieldVerifyLoginPwd)
const {
  value: repeatPassword,
  errorMessage: repeatPwdErrorMsg,
  validate: valiRepeatPassword,
} = useField<string>('repeatPassword', (value) => {
  if (!value)
    return t('pls_enter_password')
  else if (value !== newPassword.value)
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
function fieldVerifyLoginPwd(value: string) {
  if (!value)
    return t('pls_enter_password')
  else if (value.length < 8)
    return t('password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  else if (repeatPassword.value)
    valiRepeatPassword()
  return ''
}
function onBlurNewPassword() {
  if (newPwdMeta.dirty) {
    newPwd.value.setTouchTrue()
    valiNewPassword()
  }
  if (pwdStatus.value)
    setShowPasswordVerifyFalse()
}
function passwordVerifyPass(status: boolean) {
  setPwdStatus(status)
}
// 提交登陆密码
async function submitLoginPwd() {
  pwdRef.value.setTouchTrue()
  newPwd.value.setTouchTrue()
  repeatPwd.value.setTouchTrue()
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
    <AppSettingsContentItem
      title="密码"
      last-one
      :btn-loading="passwordUpdateLoading && logoutLoading"
      @submit="submitLoginPwd"
    >
      <BaseLabel label="旧密码" must-small>
        <BaseInput
          ref="pwdRef" v-model="password" :msg="pwdErrorMsg"
          type="password" msg-after-touched
        />
      </BaseLabel>
      <BaseLabel label="新密码" must-small>
        <BaseInput
          ref="newPwd" v-model="newPassword"
          :msg="newPwdErrorMsg"
          type="password"
          msg-after-touched
          @focus="setShowPasswordVerifyTrue"
          @blur="onBlurNewPassword"
        />
        <div class="hidden-wrap">
          <AppPasswordVerify
            v-show="isShowPasswordVerify"
            :password="newPassword"
            @pass="passwordVerifyPass"
          />
        </div>
      </BaseLabel>
      <BaseLabel label="确认新密码" must-small>
        <BaseInput
          ref="repeatPwd" v-model="repeatPassword"
          :msg="repeatPwdErrorMsg"
          type="password"
          msg-after-touched
        />
      </BaseLabel>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.hidden-wrap {
  width: 0;
  height: 0;
  position: relative;
  z-index: -10;
  overflow: hidden;
}
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
  browserTitle: 登录密码 – Stake.com
  </route>
