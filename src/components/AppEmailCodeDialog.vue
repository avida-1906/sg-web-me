<script setup lang='ts'>
interface Props {
  runSubmit?: (code: string) => void
  loading?: Ref<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  runSubmit: () => { },
  loading: () => ref(false),
})

const { t } = useI18n()

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
      title: t('notify_title_success'),
      message: t('success_send_code'),
    })
  },
})
const {
  value: emailCode,
  errorMessage: emailCodeErrorMsg,
  validate: valiemailCode,
} = useField<string>('emailCode', (value) => {
  if (!value)
    return t('validate_msg_input_code')
  else if (value.length !== 6)
    return t('validate_msg_regexp_code')
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
    <BaseLabel :label="`${t('code')}:`">
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
      {{ t('confirm') }}
    </BaseButton>
    <div class="second-tips">
      <span v-if="timer">{{ countdown }}{{ t('after_seconds_send_code') }}</span>
      <BaseButton
        v-else
        size="none"
        type="text"
        :loading="sendMailCodeLoading"
        @click="runAsyncMemberSendMailCode"
      >
        {{ t('resend_code') }}
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
