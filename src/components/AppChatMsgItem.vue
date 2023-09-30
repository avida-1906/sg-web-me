<script lang="ts" setup>
interface Props {
  type: 'normal' | 'tip' | 'rain'
  msgInfo: {
    sender: ChatUserInfo
  }
}

withDefaults(defineProps<Props>(), {
  type: 'normal',
})
</script>

<template>
  <section class="tg-chat-msg-item">
    <div v-if="type !== 'normal'" class="header">
      <div>
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
}
</style>
