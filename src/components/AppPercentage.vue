<script setup lang='ts'>
interface Props {
  total?: number
  percentage?: number
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  percentage: 0,
})

const componentPercent = computed(() => {
  return Number(((props.percentage / props.total) * 100).toFixed(2))
})
</script>

<template>
  <div class="app-percentage">
    <BaseProgress class="app-percentage-bar" :width="180" :percent="componentPercent" :stroke-width="10" :show-info="false" />
    <span class="text">正显示 {{ props.total }} 款游戏中的 {{ props.percentage }} 个</span>
  </div>
</template>

<style lang='scss' scoped>
.app-percentage {
  text-align: center;
  &-bar {
    margin: 0 auto;
  }
  .text {
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
  }
}
</style>
