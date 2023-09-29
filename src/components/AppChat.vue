<script lang="ts" setup>
</script>

<template>
  <section class="app-chat-outer">
    <div class="header">
      <AppChatHeader />
    </div>
    <div class="messages">
      <div class="scroll-y message-content" />
    </div>
    <div class="footer">
      footer
      @ 用户
      : 表情
      / 指令
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
  }
  .footer {
    position: relative;
    display: grid;
    align-items: center;
    padding: var(--tg-spacing-16);
    row-gap: var(--tg-spacing-8);
    background: var(--tg-secondary-grey);
    grid-template-rows: auto;
    grid-template-columns: auto 1fr;
    grid-template-areas:
        "input input"
        "online actions";
    touch-action: none;
  }
}
</style>
