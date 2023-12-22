<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const {
  value: username,
  errorMessage: usernameErrorMsg,
  validate: valiUsername,
  resetField: resetName,
} = useField<string>('username', (value) => {
  if (!value)
    return '您的 username 必须含有至少 3 个字符'
  else if (value.length < 3)
    return '您的 username 必须含有至少 3 个字符'
  else if (value.match('[^a-z0-9]'))
    return t('name_has_invalid_char')
  else if (value.length > 14)
    return '您的 username 不得超过 14 个字符'
  else if (!usernameReg.test(value))
    return t('validate_msg_user_name_tip')
  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
  validate: valiPassword,
  resetField: resetPwd,
} = useField<string>('password', fieldVerifyLoginPwd)
const {
  run: runAgencyInsert,
  loading: loadingAgencyInsert,
} = useRequest(ApiAgencyInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: t('success_register'),
    })
    resetName()
    resetPwd()
  },
})

const nameRef = ref()
const pwdRef = ref()

function fieldVerifyLoginPwd(value: string) {
  if (!value)
    return t('password_least_8_characters')
  else if (value.length < 8)
    return t('password_least_8_characters')
  else if (!upperLowerReg.test(value))
    return t('password_uppercase_lowercase_letter')
  else if (!lastOneNumberReg.test(value))
    return t('password_least_1_number')
  return ''
}
async function submitRegister() {
  nameRef.value.setTouchTrue()
  pwdRef.value.setTouchTrue()
  await valiUsername()
  await valiPassword()
  if (!usernameErrorMsg.value && !pwdErrorMsg.value) {
    runAgencyInsert({
      username: username.value,
      password: password.value,
    })
  }
}
</script>

<template>
  <div class="layout-spacing reset page-new-subagent">
    <BaseInput
      ref="nameRef"
      v-model="username"
      :msg="usernameErrorMsg"
      :placeholder="t('input_mem_account')"
      msg-after-touched
    >
      <template #left-icon>
        <BaseIcon name="navbar-user" />
      </template>
    </BaseInput>
    <BaseInput
      ref="pwdRef"
      v-model="password"
      type="password"
      :msg="pwdErrorMsg"
      :placeholder="t('pls_enter_password')"
      msg-after-touched
    >
      <template #left-icon>
        <BaseIcon name="uni-lock" />
      </template>
    </BaseInput>
    <BaseButton
      bg-style="primary" size="md"
      :loading="loadingAgencyInsert" @click="submitRegister"
    >
      {{ t('submit_reg') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.page-new-subagent{
  gap: var(--tg-spacing-20);
  max-width: 420px;
  margin: 0 auto;
}
</style>
