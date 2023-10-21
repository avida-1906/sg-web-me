<script lang="ts" setup>
const messages: Array<ChatMessageInfo> = [
  {
    id: '394802',
    sender: {
      name: 'xiaoming86',
      id: '5293840jk23k44h2k',
      level: '3',
      role: 'moderator',
    },
    html: '就是本金再多，我也很少去按比例下单，',
  },
  {
    id: '6345436',
    sender: {
      name: 'xiaohong77',
      id: '9saf7d9f9saf78s9dfi24',
      level: 'gold',
    },
    html: '我不开满倍的啊。只开10X',
  },
]
</script>

<template>
  <section class="app-chat-outer">
    <div class="header">
      <AppChatHeader />
    </div>
    <div class="messages">
      <div class="scroll-y message-content">
        <div class="time-wrap wrap">
          <span>星期一</span>
          <span>13:18</span>
        </div>
        <div v-for="msg in messages" :key="msg.id" class="wrap">
          <AppChatMsgItem :msg-info="msg" />
        </div>
        <div class="time-wrap wrap">
          <span>星期一</span>
          <span>13:18</span>
        </div>
      </div>
      <Transition>
        <div class="more-wrap">
          <BaseButton shadow size="lg">
            <div class="icon-text stop">
              <BaseIcon name="uni-stop" />
              <span>聊天室因滚动而暂停</span>
            </div>
            <div class="icon-text go-down">
              <BaseIcon name="uni-arrow-godown" />
              <span>20+ 条新信息</span>
            </div>
          </BaseButton>
        </div>
      </Transition>
    </div>
    <div class="footer">
      <AppChatFooter />
    </div>
  </section>
</template>

<style lang="scss" scoped>
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
        font-size: var(--tg-font-size-xs);
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
      .icon-text {
        display: flex;
        white-space: nowrap;
        gap: var(--tg-spacing-8);
        padding: var(--tg-spacing-2) var(--tg-spacing-8);
        &.stop {
          visibility: visible;
          opacity: 1;
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
