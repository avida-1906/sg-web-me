<script setup lang='ts'>
interface Props {
  total: number
  percentage: number
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  percentage: 0,
})

const componentStyle = computed(() => {
  return {
    width: `${((props.percentage / props.total) * 100).toFixed(2)}%` || '100%',
  }
})
</script>

<template>
  <div class="app-percentage">
    <div class="percentage">
      <div class="percentage-bar" :style="componentStyle" />
    </div>
    <span class="text">正显示 {{ props.total }} 款游戏中的 {{ props.percentage }} 个</span>
  </div>
</template>

<style lang='scss' scoped>
.app-percentage {
  width: var(--tg-sidebar-top-height-lg);
  margin: 0 auto;
  text-align: center;
  .percentage {
    margin: var(--tg-spacing-button-padding-vertical-lg) auto;
    height: var(--tg-border-width-sm);
    gap: 0;
    background-color: var(--tg-secondary-main);
    &-bar {
      height: 100%;
      border-radius: var(--tg-radius-xl);
      background-color: var(--tg-sub-blue);
    }
  }
  .text {
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
  }
}
</style>
