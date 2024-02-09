<script setup lang='ts'>
const closeDialog = inject('closeDialog', () => {})
const { openNotify } = useNotify()
const { t } = useI18n()

const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: emailValidate,
} = useField<string>('email', (value) => {
  if (!value)
    return t('pls_enter_email_address')
  else if (!emailReg.test(value))
    return t('email_address_incorrect')
  return ''
})

const {
  run: runForgetPassword,
} = useRequest(ApiMemberForgetPassword, {
  onSuccess() {
    openNotify({
      type: 'email',
      title: t('reset_pwd_email'),
      message: `${t('already_send_email_user')} ${email.value}`,
    })
    closeDialog()
  },
})

async function sendEmail() {
  await emailValidate()
  if (email.value && !emailErrorMsg.value)
    runForgetPassword({ email: email.value })
}
</script>

<template>
  <div class="app-forget-password-dialog">
    <BaseLabel :label="t('pop_up_forgot_password_email_address')" must-small>
      <BaseInput v-model="email" :msg="emailErrorMsg" />
    </BaseLabel>
    <BaseButton
      bg-style="secondary"
      size="xl"
      class="forget-password-base-button"
      @click="sendEmail"
    >
      {{ t('recover_pwd') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
.app-forget-password-dialog{
  padding: var(--tg-spacing-24);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .forget-password-base-button{
    font-size: var(--tg-font-size-base);
  }
}
</style>
