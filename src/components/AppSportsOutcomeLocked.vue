<script setup lang='ts'>
withDefaults(defineProps<{ size?: 'none' | 'normal' }>(), {
  size: 'normal',
})
</script>

<template>
  <div class="outcome-locked" :class="[size]">
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
  user-select: none;
  -webkit-user-select: none;

  .icon {
    font-size: var(--tg-font-size-default);
    opacity: 0.2;

    width: 100%;
    min-height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
  }
  &.normal{
    padding: var(--tg-spacing-7) 10.5px;
    .icon{
      padding: var(--tg-spacing-16) 0;
    }
  }
  &.none{
    padding: 0;
    .icon{
      padding: 0;
    }
  }
}
</style>
