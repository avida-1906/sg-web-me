<script setup lang='ts'>
// 123
</script>

<template>
  <div class="outcome-locked">
    <div class="icon">
      <BaseIcon name="uni-lock" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.outcome-locked {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--tg-secondary-deepdark);
  pointer-events: none;
  border-radius: var(--tg-radius-default);

  .icon {
    font-size: var(--tg-font-size-default);
    opacity: 0.2;
  }
}
</style>
