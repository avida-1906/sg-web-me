<script lang="ts" setup>
usePageTitle({ prefix: 'chat_room', isT: true })
</script>

<template>
  <section class="scroll-y tg-chat-page">
    <AppChat />
  </section>
</template>

<style lang="scss" scoped>
.tg-chat-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
