<script setup lang='ts'>
interface Props {
  runSubmit?: (code: string) => void
  loading?: Ref<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  runSubmit: () => { },
  loading: () => ref(false),
})

const timer = ref()
const countdown = ref(60)

const { openNotify } = useNotify()
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
      title: '成功',
      message: '验证码发送成功',
    })
  },
})
const {
  value: emailCode,
  errorMessage: emailCodeErrorMsg,
  validate: valiemailCode,
} = useField<string>('emailCode', (value) => {
  if (!value)
    return '请输入验证码'
  if (value.length !== 6)
    return '您的邮箱验证码含有6位数字'
  return ''
})

async function submit() {
  await valiemailCode()
  if (!emailCodeErrorMsg.value)
    props.runSubmit(emailCode.value)
}

onUnmounted(() => {
  if (timer.value)
    clearInterval(timer.value)
})

await application.allSettled([
  runAsyncMemberSendMailCode(),
])
</script>

<template>
  <div class="layout-spacing reset app-email-code">
    <BaseLabel label="验证码:">
      <div class="code-box">
        <BaseInputPassword
          v-model="emailCode"
          width-auto
          :is-cipher-text="false"
          :msg="emailCodeErrorMsg"
        />
      </div>
    </BaseLabel>
    <BaseButton bg-style="secondary" size="md" :loading="loading.value" @click="submit">
      确定
    </BaseButton>
    <div class="second-tips">
      <span v-if="timer">{{ countdown }}秒后重新发送邮件</span>
      <BaseButton
        v-else
        padding0
        type="text"
        :loading="sendMailCodeLoading"
        @click="runAsyncMemberSendMailCode"
      >
        重新发送验证码
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-email-code {
  padding: var(--tg-spacing-13) var(--tg-spacing-12) var(--tg-spacing-25);
  gap: var(--tg-spacing-25);
  .code-box{
    margin: auto;
    min-width: 300px;
    max-width: 80%;
  }
  .second-tips{
    font-size: var(--tg-font-size-default);
    font-weight: 500;
    color: var(--tg-text-lightgrey);
  }
}
</style>
