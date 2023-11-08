<script setup lang='ts'>
interface Props {
  type: 'casino' | 'sports'
  data: {
    [t: string]: any
  }
}
defineProps<Props>()
</script>

<template>
  <div class="dialog-bet-slip">
    <div class="top">
      {{ type }}
    </div>
    <div class="bottom">
      123
    </div>
  </div>
</template>

<style lang='scss' scoped>
.dialog-bet-slip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tg-spacing-16);
  padding-bottom: var(--tg-spacing-16);
}
</style>
