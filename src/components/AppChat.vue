<script lang="ts" setup>
import type { EnumLanguageKey } from '~/types'

// topic =  站点前缀/chat/zh_CN
// topic =  站点前缀/chat/en_US
// topic =  站点前缀/chat/vi_VN
// topic =  站点前缀/chat/pt_BR
// topic =  站点前缀/chat/en_IN
// topic =  站点前缀/chat/th_TH

const chatStore = useChatStore()
const { hideChat } = storeToRefs(chatStore)

const { bool: showMoreBar, setFalse: setMFalse, setTrue: setMTrue } = useBoolean(false)
const {
  bool: msgHistoryLoading,
  setFalse: setMHLFalse,
  setTrue: setMHLTrue,
} = useBoolean(false)

const chatMessageBus = useEventBus(CHAT_MESSAGE_BUS)

const scrollMsg = ref()
const messageHistory = ref<Array<ChatMessageInfo>>([])
const msgCounter = ref(1)

const { run: runGetHistory } = useRequest(ApiChatGetHistory, {
  onBefore: () => {
    setMHLTrue()
  },
  onSuccess: (data) => {
    messageHistory.value = data?.reverse().map(m => ({ ...m, id: m.s, msg: m.c, user: { name: m.n, uid: m.u } }))
  },
  onAfter: () => {
    setTimeout(() => {
      goBottom()
      setMHLFalse()
    }, 800)
  },
})

function roomChange(room: EnumLanguageKey) {
  nextTick(() => {
    scrollMsg.value.scrollTop = 0
  })
  runGetHistory({ lang: EnumLanguage[room] })
  setMFalse()
}
function messageWrapScroll() {
  if (msgHistoryLoading.value)
    return
  if (scrollMsg.value) {
    const { height } = scrollMsg.value.getBoundingClientRect()
    if (scrollMsg.value.scrollHeight - scrollMsg.value.scrollTop - height > 200)
      setMTrue()
    else
      setMFalse()
  }
}
function goBottom2() {
  nextTick(() => {
    setTimeout(() => {
      if (scrollMsg.value) {
        const { height } = scrollMsg.value.getBoundingClientRect()
        scrollMsg.value.scrollTop = scrollMsg.value.scrollHeight - height
      }
    }, 0)
  })
}
function goBottom(time?: number) {
  nextTick(() => {
    setTimeout(() => {
      document.querySelector('.msg-tail')?.scrollIntoView({ behavior: 'smooth' })
    }, time !== void 0 ? time : 300)
  })
}
function onReceiveChatMsg(m: any) {
  const hasMsg = m.s && messageHistory.value && messageHistory.value.length
    ? isValueContainInBloom(messageHistory.value.map(v => v.s).filter(f => f !== void 0 && f.length), m.s)
    : false
  if (!hasMsg) {
    if (!messageHistory.value || !messageHistory.value.length)
      messageHistory.value = []

    messageHistory.value.push({ ...m, id: m.s, msg: m.c, user: { name: m.n, uid: m.u } })
    if (showMoreBar.value)
      msgCounter.value += 1
    else
      goBottom2()
  }
}

watch(showMoreBar, (val) => {
  if (!val)
    msgCounter.value = 1
})

onMounted(() => {
  chatMessageBus.on(onReceiveChatMsg)
})

onUnmounted(() => {
  chatMessageBus.off(onReceiveChatMsg)
})
</script>

<template>
  <section class="app-chat-outer">
    <div class="header">
      <AppChatHeader @change="roomChange" />
    </div>
    <div
      v-if="hideChat"
      class="stack x-center y-center direction-vertical gap-small padding-none"
      style="height: 100%;"
    >
      <div class="popped-chat-wrapper">
        <span>{{ $t('chat_been_hide') }}</span>
        <BaseButton bg-style="primary" size="md" @click="chatStore.toggleChat">
          {{ $t('chat_show_room') }}
        </BaseButton>
      </div>
    </div>
    <template v-else>
      <div class="messages">
        <div ref="scrollMsg" class="scroll-y message-content" @scroll="messageWrapScroll">
          <!-- <div class="time-wrap wrap">
          <span>星期一</span>
          <span>13:18</span>
        </div> -->
          <template v-if="msgHistoryLoading">
            <div v-for="i in 20" :key="i" class="wrap">
              <AppChatMsgItem />
            </div>
          </template>
          <template
            v-for="msg, mdx in messageHistory"
            :key="mdx"
          >
            <div
              v-if="mdx > 0
                && (checkTs(msg.t) - checkTs(messageHistory[mdx - 1].t)) > 60000"
              class="wrap time-wrap"
            >
              <span>{{ $t(`week_${dayjs(checkTs(msg.t)).day()}`) }}</span>
              <span>{{ timeToCustomizeFormat(msg.t, 'HH:mm') }}</span>
            </div>
            <div
              v-if="mdx === 0"
              class="wrap time-wrap"
            >
              <span>{{ $t(`week_${dayjs(checkTs(msg.t)).day()}`) }}</span>
              <span>{{ timeToCustomizeFormat(msg.t, 'HH:mm') }}</span>
            </div>
            <div
              v-show="!msgHistoryLoading"
              class="wrap"
            >
              <AppChatMsgItem :msg-info="msg" />
            </div>
          </template>
          <div class="wrap msg-tail" />
        </div>
        <Transition name="fade">
          <div v-if="showMoreBar && !msgHistoryLoading" class="more-wrap">
            <BaseButton shadow size="lg">
              <div class="icon-text stop">
                <BaseIcon name="uni-stop" />
                <span>{{ $t('chat_stop_by_scroll') }}</span>
              </div>
              <div class="icon-text go-down" @click.stop="goBottom(0)">
                <BaseIcon name="uni-arrow-godown" />
                <span>{{ msgCounter }}+ {{ $t('chat_new_msgs_count') }}</span>
              </div>
            </BaseButton>
          </div>
        </Transition>
      </div>
      <div class="footer">
        <AppChatFooter />
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.popped-chat-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-base);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.5;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.app-chat-outer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--tg-secondary-dark);
  // filter: drop-shadow(0 0 5px rgba(25,25,25,.25));
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
        display: flex;
        color: var(--tg-secondary-light);
        justify-content: space-between;
        font-size: 10px;
        // transform: scale(0.83);
      }
    }
    .more-wrap {
      left: 50%;
      position: absolute;
      bottom: var(--tg-spacing-24);
      transform: translate(-50%);
      line-height: 1.5;
      font-size: var(--tg-font-size-default);
      color: var(--tg-secondary-light);
      min-width: 220px;
      .icon-text {
        display: flex;
        white-space: nowrap;
        gap: var(--tg-spacing-8);
        padding: var(--tg-spacing-2) var(--tg-spacing-8);
        align-items: center;
        &.stop {
          visibility: visible;
          opacity: 1;
          white-space: wrap;
        }
        &.go-down {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      &:hover {
        .icon-text.stop {
          visibility: hidden;
          opacity: 0;
        }
        .icon-text.go-down {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  .footer {
    background: var(--tg-secondary-grey);
  }
}
</style>
