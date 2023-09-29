<script lang="ts" setup>
</script>

<template>
  <section class="app-chat-outer">
    <div class="header">
      <AppChatHeader />
    </div>
    <div class="messages">
      <div class="scroll-y message-content" />
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
  flex-shrink: 0;
  flex-direction: column;
  height: 100%;
  background: var(--tg-secondary-dark);
  filter: drop-shadow(0 0 5px rgba(25,25,25,.25));
  z-index: var(--tg-z-index-secondary);
  .header {
    position: relative;
    background: var(--tg-secondary-dark);
    width: 100%;
    height: var(--tg-header-height);
    z-index: var(--tg-z-index-10);
    box-shadow: var(--tg-box-shadow-lg);
    touch-action: none;
  }
  .messages {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    position: relative;
    touch-action: none;
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
