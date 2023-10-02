<script lang="ts" setup>
interface Props {
  type: 'casino' | 'sport'
  order: string
}

defineProps<Props>()
</script>

<template>
  <BaseButton type="text">
    <span class="chat-msg-order">
      <span class="label">{{ type }}: #</span>
      <span class="order">{{ order }}</span>
    </span>
  </BaseButton>
</template>

<style lang="scss" scoped>
button {
  padding: 0 !important;
  height: auto;
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-light);
  line-height: inherit;
}
.chat-msg-order {
  .label {
    text-transform: capitalize;
  }
}
</style>
