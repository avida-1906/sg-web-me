<script lang="ts" setup>
//  @ 用户
//  : 表情
//  / 指令

const message = ref('')
</script>

<template>
  <section class="tg-app-chat-footer">
    <!-- <div class="emoji-wrap scroll-y wrap layout-grid"></div> -->
    <div class="chat-input">
      <BaseInput v-model="message" placeholder="输入您的消息" textarea />
    </div>
    <div class="online">
      <div class="green-dot" />
      <div>
        <span>在线： </span>
        <span>10,950</span>
      </div>
    </div>
    <div class="actions">
      <span>88</span>
      <BaseButton type="text">
        <BaseIcon name="chat-rule" />
      </BaseButton>
      <BaseButton bg-style="secondary" size="md">
        发送
      </BaseButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.green-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
  background: var(--tg-primary-success);
  animation: OnlineFlash .2s ease-out;
}
.tg-app-chat-footer {
  position: relative;
  display: grid;
  align-items: center;
  padding: var(--tg-spacing-16);
  row-gap: var(--tg-spacing-8);
  grid-template-rows: auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
      "input input"
      "online actions";
  touch-action: none;
  .chat-input {
    grid-area: input;
  }
  .online {
    grid-area: online;
    display: flex;
    align-items: center;
    color: var(--tg-secondary-light);
    font-size: var(--tg-font-size-xs);
    font-weight: var(--tg-font-weight-semibold);
    gap: var(--tg-spacing-8);
  }
  .actions {
    color: var(--tg-secondary-light);
    font-size: var(--tg-font-size-xs);
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    grid-area: actions;
    justify-content: flex-end;
    align-items: center;
    gap: var(--tg-spacing-12);
  }
}
</style>
