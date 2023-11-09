<script lang="ts" setup>
interface Props {
  feedId: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { openNotify } = useNotify()

const { isLogin } = storeToRefs(useAppStore())

const maxMsgLen = 512
const msgInput = ref()
const message = ref('')

const trimMessage = computed(() => message.value.trim())
const params = computed(() => ({
  feed_id: props.feedId,
  content: trimMessage.value,
  source: 1,
}))

const { run: runSendMsg, loading: sendLoading } = useRequest(ApiAddFeedbackChatMsg)

function sendMsg() {
  if (trimMessage.value.length && !sendLoading.value) {
    if (!isLogin.value) {
      openNotify({ type: 'error', message: t('notify_error_forbid_operation') })
      return
    }
    runSendMsg(params.value)
    message.value = ''
    msgInput.value.getFocus()
  }
}

function enterPress(event: KeyboardEvent) {
  event.preventDefault()
  event.stopPropagation()
  if (trimMessage.value.length) {
    if (!isLogin.value) {
      openNotify({ type: 'error', message: t('notify_error_forbid_operation') })
      return
    }
    sendMsg()
  }
}
</script>

<template>
  <div class="app-feedback-chat-footer">
    <div class="chat-input">
      <BaseInput
        ref="msgInput"
        v-model="message"
        :placeholder="t('chat_send_msg_placeholder')"
        textarea
        :max="maxMsgLen"
        @down-enter="enterPress"
      />
    </div>
    <BaseButton bg-style="secondary" class="send" size="sm" shadow @click="sendMsg">
      {{ t('send') }}
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.app-feedback-chat-footer {
  display: flex;
  padding: var(--tg-spacing-16);
  gap: var(--tg-spacing-12);
  width: 100%;
  align-items: stretch;
  .chat-input {
    flex: 1;
  }
}
</style>
