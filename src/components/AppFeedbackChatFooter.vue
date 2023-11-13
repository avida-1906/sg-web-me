<script lang="ts" setup>
interface Props {
  feedId: string
  allowSend: boolean
}

const props = defineProps<Props>()

const feedChatMessageBus = useEventBus(FEEDBACK_CHAT_MESSAGE_BUS)

const { t } = useI18n()
const { openNotify } = useNotify()

const { isLogin, userInfo } = storeToRefs(useAppStore())

const maxMsgLen = 512
const msgInput = ref()
const message = ref('')

const trimMessage = computed(() => message.value.trim())
const params = computed(() => ({
  feed_id: props.feedId,
  content: trimMessage.value,
  source: 1,
}))

const { run: runSendMsg, loading: sendLoading } = useRequest(ApiAddFeedbackChatMsg, {
  onSuccess: () => {
    const tt = Math.ceil(new Date().getTime() / 1000)
    feedChatMessageBus.emit({ content: trimMessage.value, feed_id: props.feedId, create_at: tt, id: `id-${tt}`, uid: userInfo.value?.uid })
  },
})

function sendMsg() {
  if (trimMessage.value.length && !sendLoading.value) {
    if (props.allowSend) {
      if (!isLogin.value) {
        openNotify({ type: 'error', message: t('notify_error_forbid_operation') })
        return
      }
      runSendMsg(params.value)
      msgInput.value.getFocus()
    }
    else {
      openNotify({ type: 'error', message: t('wait_office_reply') })
    }
    message.value = ''
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
