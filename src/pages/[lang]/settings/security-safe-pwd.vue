<script lang="ts" setup>
interface Props {
  tipText?: string
}

defineProps<Props>()

const { t } = useI18n()
usePageTitle({ prefix: t('menu_title_settings_update_safepwd') })
const router = useLocalRouter()
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
    return t('only_6_num')
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
    return t('only_6_num')
    // return t('pls_enter_password')
  else if (value !== payPassword.value)
    // return t('validate_msg_safepwd_unequal')
    return t('pwd_2_not_equal')
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
const isEmptyInput = computed(() =>
  !oldPayPassword.value && !payPassword.value && !aginPayPassword.value)
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
    return t('only_6_num')
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
      :title="getPayPwdState ? t('edit_safe_pwd') : t('set_safe_pwd')"
      last-one
      :btn-loading="payPasswordUpdateLoading"
      :verified="getMailState"
      :style="{
        '--tg-app-settings-content-item-style-max-width':
          getMailState ? '100%' : '420px',
      }"
      :depends-disabled="[isEmptyInput]"
      @submit="submitPayPwd"
    >
      <template v-if="tipText" #top-desc>
        {{ t('first_withdraw_money_need_pay_password') }}
      </template>
      <div v-if="getMailState" class="mail-not-bind">
        <div>{{ t('not_bind_email') }}</div>
        <div style="margin-bottom:var(--tg-spacing-15);">
          {{ t('must_bind_email') }}
        </div>
        <BaseButton size="none" type="text" @click="router.push('/settings/general')">
          {{ t('go_bind') }}
        </BaseButton>
      </div>
      <template v-else>
        <BaseLabel v-if="getPayPwdState" :label="t('old_safe_pwd')">
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
        <BaseLabel
          :label="getPayPwdState
            ? t('new_safe_pwd') : t('menu_title_settings_update_safepwd')"
        >
          <BaseInput
            ref="pwdRef"
            v-model="payPassword"
            :msg="payPwdErrorMsg"
            type="password"
            max="6"
            msg-after-touched
          />
        </BaseLabel>
        <BaseLabel :label="t('confirm_safe_pwd')">
          <BaseInput
            ref="aginPwdRef"
            v-model="aginPayPassword"
            :msg="aginPayPwdErrorMsg"
            type="password"
            max="6"
            msg-after-touched
          />
        </BaseLabel>
        <BaseLabel :label="t('email_code')">
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
              :disabled="!!timer || isEmptyInput"
              custom-padding
              :style="{
                '--tg-base-button-style-bg': timer ? 'var(--tg-text-grey)' : '',
                'min-width': '105px',
                '--tg-base-button-padding-y': 'var(--tg-spacing-13)',
              }"
              @click="runAsyncMemberSendMailCode"
            >
              <!-- t('after_seconds_send_code') -->
              <span v-if="timer">{{ `${t('re_get')}${countdown}s` }}</span>
              <span v-else>{{ t('get_email_code') }}</span>
            </BaseButton>
          </div>
        </BaseLabel>
        <div v-if="getPayPwdState" class="forget-pwd">
          {{ t('forget_safe_pwd') }}
          <BaseButton size="none" type="text">
            {{ t('connect_service') }}
          </BaseButton>
        </div>
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
  .forget-pwd{
    font-size: var(--tg-font-size-default);
    text-align: center;
    margin-top: var(--tg-spacing-30);
    --tg-base-button-text-default-color: var(--tg-text-blue);
  }
}
</style>

<route lang="yaml">
  </route>
