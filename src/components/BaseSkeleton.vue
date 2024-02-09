<script lang="ts" setup>
interface Props {
  bg?: string
  width?: string
  height?: string
  animated?: 'ani-shan' | 'ani-opacity'
}

withDefaults(defineProps<Props>(), {
  width: '100px',
  height: '100px',
  animated: 'ani-opacity',
})
</script>

<template>
  <div
    class="skeleton"
    :style="{ width, height }" :class="[animated]"
  >
    <!-- 1 盒子 -->
    <div class="block" />
    <!-- 2 闪烁效果 skeleton 伪元素 --->
  </div>
</template>

<style lang="scss">
:root{
  --tg-skeleton-border-radius: var(--tg-radius-default);
  --tg-skeleton-background-color: var(--tg-skeleton-color1);
}
</style>

<style scoped lang="scss">
.skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: var(--tg-skeleton-border-radius);
    background-color: var(--tg-skeleton-background-color);
  }
}
.ani-shan {
  &::after {
    content: "";
    position: absolute;
    animation: ani-shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      #{rgba($color: var(--tg-color-white-rgb), $alpha: 0)} 0,
      #{rgba($color: var(--tg-color-white-rgb), $alpha: 0.7)} 50%,
      #{rgba($color: var(--tg-color-white-rgb), $alpha: 0)} 100%
    );
    transform: skewX(-45deg);
  }
}
.ani-opacity {
  animation: ani-opacity 1.5s linear 0s infinite;
}

@keyframes ani-opacity {
  0%, 100% {
      opacity: 0.5;
  }
  50% {
      opacity: 0.8;
  }
}
@keyframes ani-shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
