<script lang="ts" setup>
interface Props {
  feedBackItem: any
}

defineProps<Props>()

const chatStore = useChatStore()

const scrollMsg = ref()
const messageHistory = ref<Array<any>>([])

const { run: runGetHistory } = useRequest(ApiGetFeedbackChatList, {
  onBefore: () => {
  },
  onSuccess: (data) => {
    messageHistory.value = data?.reverse()
  },
  onAfter: () => {
  },
})

function goBack() {
  chatStore.toggleShowFeedbackChat()
}

onMounted(() => {
  runGetHistory({ feed_id: '90153251929807' })
})
</script>

<template>
  <div class="app-feedback-chat">
    <div class="header">
      <div class="go-back" @click="goBack">
        <BaseIcon name="uni-arrowleft-line" />
        <span>返回上级页面</span>
      </div>
    </div>
    <div class="messages">
      <div ref="scrollMsg" class="scroll-y message-content">
        <div class="time-wrap">
          23-02-25 11:48:32
        </div>
        <template v-for="msg in messageHistory" :key="msg.id">
          <AppFeedbackChatMsg :message="msg" />
        </template>
      </div>
    </div>
    <div class="footer">
      <AppFeedbackChatFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
      .msg-tail {
        position: relative;
        margin: 0;
        padding: 0;
        height: 0;
      }
      > *+* {
        margin-top: var(--tg-spacing-8);
      }
      .wrap {
        width: 100%;
      }
      .time-wrap {
        text-align: center;
        color: var(--tg-text-grey-secondary);
        font-size: var(--tg-font-size-default);
      }
    }
  }
  .footer {
    background: var(--tg-secondary-grey);
  }
}
</style>
