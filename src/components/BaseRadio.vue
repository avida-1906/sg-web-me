<script setup lang='ts'>
interface Props {
  data: any
}
defineProps<Props>()
</script>

<template>
  <div class="base-radio">
    123
    <slot :data="data" />
  </div>
</template>

<style lang='scss' scoped>
.base-radio {
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
  cursor: pointer;
}
</style>
