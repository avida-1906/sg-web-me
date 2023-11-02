<script lang="ts" setup>
type aniType = 'ani-shan' | 'ani-opacity'
interface Props {
  bg?: string
  width?: string
  height?: string
  animated?: aniType
}

withDefaults(defineProps<Props>(), {
  bg: '#efefef',
  width: '100px',
  height: '100px',
})
</script>

<template>
  <div
    class="skeleton"
    :style="{ width, height }" :class="[animated]"
  >
    <!-- 1 盒子 -->
    <div class="block" :style="{ backgroundColor: bg }" />
    <!-- 2 闪烁效果 skeleton 伪元素 --->
  </div>
</template>

  <style scoped lang="scss">
  .skeleton {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    .block {
      width: 100%;
      height: 100%;
      border-radius: 2px;
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
    0% {
      opacity: 0.8;
    }
    60% {
      opacity: 1;
    }
    100% {
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
