<script lang="ts" setup>
interface Props {
  message: {
    images?: string
    description?: string
    content: string
    created_at: number
    feed_id: string
    uid: string
    id: string
  }
}

defineProps<Props>()
</script>

<template>
  <div class="app-feedback-chat-msg">
    11
  </div>
</template>

<style lang="scss" scoped>
.app-feedback-chat-msg {}
</style>
