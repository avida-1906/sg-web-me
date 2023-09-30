<script lang="ts" setup>
interface Props {
  msgInfo: ChatMessageInfo
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <section class="tg-chat-msg-item">
    <div v-if="msgInfo.type" class="header">
      <div v-if="msgInfo.type === 'tip'">
        <span>发送小费</span>
      </div>
    </div>
    <div class="content">
      <p>
        <AppChatUserTags :user-info="msgInfo.sender" />
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tg-chat-msg-item {
  width: 100%;
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
  border-radius: var(--tg-radius-default);
  background: var(--tg-secondary-grey);
  .content {
    p {
      display: block;
      width: 100%;
      color: var(--tg-text-white);
      line-height: 1.5;
      text-align: left;
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-normal);
    }
  }
}
</style>
