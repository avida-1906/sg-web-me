<script lang="ts" setup>
const feedChatMessageBus = useEventBus(FEEDBACK_CHAT_MESSAGE_BUS)
const { userInfo } = storeToRefs(useAppStore())
const chatStore = useChatStore()
const { userLanguage } = storeToRefs(useLanguageStore())

const { feedBackItem } = storeToRefs(chatStore)

const scrollMsg = ref()
const messageHistory = ref<Array<any>>([])

const params = computed(() => ({ feed_id: feedBackItem.value?.feed_id ?? '' }))
const canSendMsg = computed(() =>
  messageHistory.value && messageHistory.value.length
    ? messageHistory.value[messageHistory.value.length - 1].uid !== userInfo.value?.uid
    : false)

const { run: runGetHistory, loading } = useRequest(ApiGetFeedbackChatList, {
  onBefore: () => {
  },
  onSuccess: (data) => {
    messageHistory.value = data?.reverse() ?? []
  },
  onAfter: () => {
  },
})

function goBack() {
  chatStore.setFeedbackChatFalse()
  chatStore.setFeedbackItem()
}

function init() {
  if (params.value.feed_id.length)
    runGetHistory(params.value)
}

function reset() {
  goBack()
}

function onReceiveChatMsg(m: any) {
  if (params.value.feed_id.length)
    runGetHistory(params.value)
}

onMounted(() => {
  init()
  feedChatMessageBus.on(onReceiveChatMsg)
})

onActivated(() => {
  init()
})

onDeactivated(() => {
  chatStore.setFeedbackItem()
  messageHistory.value = []
  chatStore.setFeedbackChatFalse()
})

onUnmounted(() => {
  reset()
  messageHistory.value = []
  feedChatMessageBus.off(onReceiveChatMsg)
})
</script>

<template>
  <div class="app-feedback-chat">
    <div class="header">
      <div class="go-back" @click="goBack">
        <BaseIcon name="uni-arrowleft-line" />
        <span>{{ $t('navigation_back') }}</span>
      </div>
    </div>
    <div class="messages">
      <div ref="scrollMsg" class="scroll-y message-content">
        <div v-if="messageHistory.length" class="time-wrap">
          {{
            application.timestampToTime(messageHistory[0].created_at * 1000, userLanguage)
          }}
        </div>
        <template v-for="msg in messageHistory" :key="msg.id">
          <AppFeedbackChatMsg :message="msg" />
        </template>
        <template v-if="!loading && feedBackItem && feedBackItem.bonusState > 0">
          <AppFeedbackChatMsg
            :message="{
              uid: '',
              content: '',
              id: '',
              created_at: 0,
              feed_id: feedBackItem.feed_id,
            }"
          >
            <AppBonusEnvelope
              :amount="feedBackItem.amount"
              :bonus-state="feedBackItem.bonusState"
            />
          </AppFeedbackChatMsg>
          <AppFeedbackChatMsg
            v-if="feedBackItem.bonusState === 2"
            :message="{
              uid: userInfo?.uid ?? '',
              content: '',
              id: '',
              created_at: 0,
              feed_id: feedBackItem.feed_id,
            }"
          >
            <AppBonusEnvelope
              :amount="feedBackItem.amount"
              :bonus-state="feedBackItem.bonusState"
            />
          </AppFeedbackChatMsg>
        </template>
      </div>
    </div>
    <div
      v-if="feedBackItem && canSendMsg && feedBackItem.bonusState !== 1"
      class="footer"
    >
      <AppFeedbackChatFooter :feed-id="feedBackItem.feed_id" :allow-send="canSendMsg" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.time-wrap {
  text-align: center;
  color: var(--tg-text-grey-secondary);
  font-size: var(--tg-font-size-default);
}
.app-feedback-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--tg-secondary-dark);
  .header {
    position: relative;
    width: 100%;
    height: var(--tg-spacing-50);
    z-index: var(--tg-z-index-10);
    .go-back {
      height: 100%;
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--tg-spacing-8);
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      padding-left: var(--tg-spacing-16);
      cursor: pointer;
    }
  }
  .messages {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    position: relative;
    flex-grow: 1;
    .message-content {
      position: relative;
      overflow-x: hidden;
      min-height: 0;
      transform: translateZ(0);
      overflow-y: scroll;
      word-break: break-word;
      padding: var(--tg-spacing-8) var(--tg-spacing-16);
      padding-top: 0;
      display: flex;
      flex-direction: column;
      overflow-anchor: none;
      overscroll-behavior: contain;
      gap: var(--tg-spacing-16);
      .msg-tail {
        position: relative;
        margin: 0;
        padding: 0;
        height: 0;
      }
      .wrap {
        width: 100%;
      }
    }
  }
  .footer {
    background: var(--tg-secondary-grey);
  }
}
</style>
