<script setup lang='ts'>
const { appContentWidth } = storeToRefs(useWindowStore())
</script>

<template>
  <div class="original-game" :class="{ max: appContentWidth > 930 }">
    AppOriginalGame
  </div>
</template>

<style lang='scss' scoped>
.original-game{
  width: 100%;
  max-width: 1200px;
  margin-top: 3vw;
  &.max{
    margin-top: var(--tg-spacing-40);
  }
}
</style>
