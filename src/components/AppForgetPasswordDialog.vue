<script setup lang='ts'>
const closeDialog = inject('closeDialog', () => {})
const { openNotify } = useNotify()

const {
  value: email,
  errorMessage: emailErrorMsg,
  validate: emailValidate,
} = useField<string>('email', (value) => {
  if (!value)
    return '请输入电邮地址'
  if (!emailReg.test(value))
    return '电邮地址格式不正确'
  return ''
})

const {
  run: runForgetPassword,
} = useRequest(ApiMemberForgetPassword, {
  onSuccess() {
    openNotify({
      type: 'email',
      title: '已发送密码重置电邮',
      message: `我们已发送账户恢复电邮至 ${email.value}`,
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
    <BaseLabel label="电邮地址" must-small>
      <BaseInput v-model="email" :msg="emailErrorMsg" />
    </BaseLabel>
    <BaseButton
      bg-style="secondary"
      size="xl"
      class="forget-password-base-button"
      @click="sendEmail"
    >
      恢复密码
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
