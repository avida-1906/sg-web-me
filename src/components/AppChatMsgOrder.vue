<script lang="ts" setup>
interface Props {
  type: 'casino' | 'sport'
  order: string
}

defineProps<Props>()
</script>

<template>
  <BaseButton type="text" size="none">
    <span class="chat-msg-order">
      <span class="label">{{ type }}: #</span>
      <span class="order">{{ application.formatNumber(order) }}</span>
    </span>
  </BaseButton>
</template>

<style lang="scss" scoped>
button {
  height: auto;
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-light);
  line-height: inherit;
}
.chat-msg-order {
  text-decoration: underline;
  .label {
    text-transform: capitalize;
  }
}
</style>
