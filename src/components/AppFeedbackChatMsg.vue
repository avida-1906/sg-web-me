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

const props = defineProps<Props>()

const { userInfo } = storeToRefs(useAppStore())

const isOwn = computed(() => props.message.uid === userInfo.value?.uid)
</script>

<template>
  <div class="app-feedback-chat-msg" :class="{ 'is-own': isOwn }">
    <div class="avatar">
      <BaseImage url="/png/avatar.png" />
    </div>
    <div class="content">
      <div
        v-if="!isOwn"
        class="name"
      >
        {{ $t('official_service') }}
      </div>
      <div class="text message">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-feedback-chat-msg {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--tg-spacing-8);
  &.is-own {
    flex-direction: row-reverse;
  }
  .avatar {
    width: var(--tg-spacing-32);
    height: var(--tg-spacing-32);
    border-radius: 50%;
    overflow: hidden;
  }
  .content {
    .name {
      font-size: var(--tg-font-size-xs);
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-grey-secondary);
      margin-bottom: var(--tg-spacing-4);
    }
    .message {
      &.text {
        border-radius: var(--tg-radius-md);
        background: var(--tg-text-white);
        padding: var(--tg-spacing-12);
        font-size: var(--tg-font-size-default);
        font-weight: var(--tg-font-weight-semibold);
        color: var(--tg-text-black-secondary);
        line-height: var(--tg-spacing-20);
        text-align: left;
        white-space: initial;
      }
    }
  }
}
</style>
