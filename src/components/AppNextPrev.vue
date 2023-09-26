<script lang="ts" setup>
const emit = defineEmits(['next', 'prev'])

function goPage(v: 'prev' | 'next') {
  emit(v)
}
</script>

<template>
  <div class="stack x-center y-center direction-horizontal gap-larger padding-none next-prev-buttons mt-24">
    <div @click="goPage('prev')">
      上一页
    </div>
    <div @click="goPage('next')">
      下一页
    </div>
  </div>
</template>

<style lang="scss" scoped>
.next-prev-buttons {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  opacity: 0.5;
}
</style>
