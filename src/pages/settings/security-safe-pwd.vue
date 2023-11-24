<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { updateUserInfo } = useAppStore()
const {
  value: oldPayPassword,
  errorMessage: oldPayPwdErrorMsg,
  validate: valiOldPayPwd,
  resetField: resetOldPayPwd,
} = useField<string>('payPassword', (value) => {
  if (!payPasswordReg.test(value))
    return '仅支持6位纯数字'
  return ''
})
const {
  value: payPassword,
  errorMessage: payPwdErrorMsg,
  validate: valiPayPwd,
  resetField: resetPayPassword,
} = useField<string>('payPassword', fieldVerifyPayPwd)
const {
  value: aginPayPassword,
  errorMessage: aginPayPwdErrorMsg,
  validate: valiAginPayPwd,
  resetField: resetAginPayPassword,
} = useField<string>('aginPayPassword', (value) => {
  if (!value)
    return '仅支持6位纯数字'
    // return t('pls_enter_password')
  else if (value !== payPassword.value)
    // return t('validate_msg_safepwd_unequal')
    return '两次密码输入不一致'
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
const {
  run: runMemberPayPasswordUpdate,
  loading: payPasswordUpdateLoading,
} = useRequest(ApiMemberPayPasswordUpdate, {
  onSuccess() {
    openNotify({
      type: 'success',
      title: t('notify_title_success'),
      message: t('success_set_safepwd'),
    })
    // 资金密码设置成功之后，刷新用户信息
    updateUserInfo()
    resetOldPayPwd()
    resetPayPassword()
    resetAginPayPassword()
    resetEmailCode()
  },
})

const pwdRef = ref()
const oldPwdRef = ref()
const aginPwdRef = ref()
const mailCodeRef = ref()
const timer = ref()
const countdown = ref(60)

const {
  runAsync: runAsyncMemberSendMailCode,
  loading: sendMailCodeLoading,
} = useRequest(ApiMemberSendMailCode, {
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

const getPayPwdState = computed(() => {
  return userInfo.value?.pay_password === '1'
})
const getMailState = computed(() => {
  return userInfo.value?.email_check_state === 2
})

function fieldVerifyPayPwd(value: string) {
  if (!payPasswordReg.test(value))
    return '仅支持6位纯数字'
  // return t('pls_enter_password')
  // else if (!payPasswordReg.test(value))
  //   return t('tip_safepwd_six')
  else if (aginPayPassword.value)
    valiAginPayPwd()
  return ''
}
// 提交资金密码
async function submitPayPwd() {
  getPayPwdState.value && oldPwdRef.value.setTouchTrue()
  pwdRef.value.setTouchTrue()
  aginPwdRef.value.setTouchTrue()
  mailCodeRef.value.setTouchTrue()
  if (userInfo.value?.email_check_state === 1) {
    getPayPwdState.value && valiOldPayPwd()
    await valiPayPwd()
    await valiAginPayPwd()
    await valiemailCode()
    if (!(payPwdErrorMsg.value
        || aginPayPwdErrorMsg.value
        || emailCodeErrorMsg.value
        || oldPayPwdErrorMsg.value)) {
      runMemberPayPasswordUpdate({
        types: getPayPwdState.value ? 2 : 1,
        old_pay_password: getPayPwdState.value ? oldPayPassword.value : '',
        pay_password: payPassword.value,
        code: emailCode.value,
      })
      // openEmailCodeDialog({
      //   runSubmit: (emailCode: string) => {
      //     runMemberPayPasswordUpdate({
      //       pay_password: payPassword.value,
      //       code: emailCode,
      //     })
      //   },
      //   loading: payPasswordUpdateLoading,
      // })
    }
  }
  else {
    openNotify({
      type: 'error',
      title: t('notify_title_error'),
      message: t('email_uncheck'),
    })
  }
}

onUnmounted(() => {
  if (timer.value)
    clearInterval(timer.value)
})
</script>

<template>
  <div class="tg-settings-security">
    <!-- t('menu_title_settings_update_safepwd') -->
    <AppSettingsContentItem
      :title="getPayPwdState ? '修改资金密码' : '设置资金密码'"
      last-one
      :btn-loading="payPasswordUpdateLoading"
      :verified="getMailState"
      @submit="submitPayPwd"
    >
      <div v-if="getMailState" class="mail-not-bind">
        <div>您还未绑定邮箱</div>
        <div style="margin-bottom:var(--tg-spacing-15);">
          请先绑定邮箱后在设置资金密码
        </div>
        <BaseButton size="none" type="text" @click="router.push('/settings/general')">
          前往绑定
        </BaseButton>
      </div>
      <template v-else>
        <BaseLabel v-if="getPayPwdState" label="原资金密码">
          <BaseInput
            ref="oldPwdRef"
            v-model="oldPayPassword"
            :msg="oldPayPwdErrorMsg"
            type="password"
            max="6"
            msg-after-touched
          />
        </BaseLabel>
        <!-- t('menu_title_settings_update_safepwd') -->
        <BaseLabel :label="getPayPwdState ? '新资金密码' : '资金密码'">
          <BaseInput
            ref="pwdRef"
            v-model="payPassword"
            :msg="payPwdErrorMsg"
            type="password"
            max="6"
            msg-after-touched
          />
        </BaseLabel>
        <BaseLabel label="确认资金密码">
          <BaseInput
            ref="aginPwdRef"
            v-model="aginPayPassword"
            :msg="aginPayPwdErrorMsg"
            type="password"
            max="6"
            msg-after-touched
          />
        </BaseLabel>
        <BaseLabel label="邮箱验证码">
          <div class="row-mail-code">
            <div style="flex:  1;">
              <BaseInput
                ref="mailCodeRef"
                v-model="emailCode"
                :msg="emailCodeErrorMsg"
                type="text"
                max="6"
                msg-after-touched
              />
            </div>
            <BaseButton
              bg-style="primary"
              :loading="sendMailCodeLoading"
              :disabled="!!timer"
              custom-padding
              :style="{
                '--tg-base-button-style-bg': timer ? '#557086' : '',
                'width': '105px',
                '--tg-base-button-padding-y': '13px',
              }"
              @click="runAsyncMemberSendMailCode"
            >
              <!-- t('after_seconds_send_code') -->
              <span v-if="timer">{{ `重新获取${countdown}s` }}</span>
              <span v-else>获取验证码</span>
            </BaseButton>
          </div>
        </BaseLabel>
      </template>

      <!-- <template #top-desc>
        {{ t('tip_safepwd') }}
      </template> -->
      <!-- <BaseLabel :label="t('password')" must-small>
        <BaseInputPassword
          ref="pwdRef"
          v-model="payPassword"
          :msg="payPwdErrorMsg"
          msg-after-touched
        />
      </BaseLabel>
      <BaseLabel :label="t('confirm_pwd')" must-small>
        <BaseInputPassword
          ref="aginPwdRef" v-model="aginPayPassword"
          :msg="aginPayPwdErrorMsg"
          msg-after-touched
        />
      </BaseLabel> -->
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-security {
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  .mail-not-bind{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-20);
    margin: var(--tg-spacing-50) 0;
    --tg-base-button-text-default-color: var(--tg-text-blue);
  }
  .row-mail-code{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: var(--tg-spacing-10);
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 资金密码 – Stake.com
  </route>
