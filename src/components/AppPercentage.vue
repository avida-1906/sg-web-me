<script setup lang='ts'>
interface Props {
  total: string | number
  percentage: string | number
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  percentage: 0,
})
</script>

<template>
  <div class="app-percentage">
    <div class="percentage">
      <div class="percentage-bar" />
    </div>
    <span class="text">正显示 {{ props.total }} 款游戏中的 {{ props.percentage }} 个</span>
  </div>
</template>

<style lang='scss' scoped>
.app-percentage {
  text-align: center;
  .percentage {
    &-bar {}
  }
  .text {
    // color: #b1bad3;
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
  }
}
</style>
