<script lang="ts" setup>
const scrollMsg = ref()
const messageHistory = ref<Array<any>>([])

const { run: runGetHistory } = useRequest(ApiGetFeedbackChatList, {
  onBefore: () => {
  },
  onSuccess: (data) => {
    messageHistory.value = data?.reverse()
  },
  onAfter: () => {
    setTimeout(() => {
      goBottom()
    }, 800)
  },
})

function goBottom(time?: number) {
  nextTick(() => {
    setTimeout(() => {
      document.querySelector('.msg-tail')?.scrollIntoView({ behavior: 'smooth' })
    }, time !== undefined ? time : 300)
  })
}

onMounted(() => {
  runGetHistory({ feed_id: '90153251929807' })
})
</script>

<template>
  <div class="app-feedback-chat">
    <div class="messages">
      <div ref="scrollMsg" class="scroll-y message-content">
        <div class="time-wrap">
          23-02-25 11:48:32
        </div>
        <template v-for="msg in messageHistory" :key="msg.id">
          <AppFeedbackChatMsg :message="msg" />
        </template>
        <div class="wrap msg-tail" />
      </div>
    </div>
    <div class="footer">
      footer
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
    background: var(--tg-secondary-dark);
    width: 100%;
    height: var(--tg-header-height);
    z-index: var(--tg-z-index-10);
    box-shadow: var(--tg-box-shadow-lg);
  }
  .messages {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
        color: var(--tg-text-grey);
        font-size: var(--tg-font-size-default);
      }
    }
  }
  .footer {
    background: var(--tg-secondary-grey);
  }
}
</style>
