<script lang="ts" setup>
interface Props {
  user: {
    name: string // 包含 @
    id?: string
    [k: string]: any
  }
}

defineProps<Props>()

const { userInfo } = storeToRefs(useAppStore())
const { openStatisticsDialog } = useStatisticsDialog()
</script>

<template>
  <!-- :href="`?name=${user.name}&id=${user.id}&modal=user`" -->
  <span
    class="chat-msg-at"
    :class="{ 'your-self': userInfo && userInfo.username === user.name.slice(1) }"
    @click="openStatisticsDialog(user.name.slice(1))"
  >
    <a>
      <span>{{ user.name }}</span>
    </a>
  </span>
</template>

<style lang="scss" scoped>
.chat-msg-at {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: var(--tg-radius-sm);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  padding: 0 var(--tg-spacing-4);
  white-space: nowrap;
  color: var(--tg-secondary-light);
  background: var(--tg-secondary-dark);
  line-height: inherit;
  a {
    color: var(--tg-secondary-light);
    transition: color 0.2s;
  }
  a:hover {
    color: var(--tg-text-white);
  }
  &.your-self {
    background: var(--tg-text-purple);
  }
}
</style>
