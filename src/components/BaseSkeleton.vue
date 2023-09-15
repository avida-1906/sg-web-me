<script>
export default {
  name: 'Skeleton',
  // 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪烁
  props: {
    bg: {
      type: String,
      default: '#efefef',
    },
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '100px',
    },
    animated: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div class="skeleton" :style="{ width, height }" :class="{ shan: animated }">
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
  .shan {
    &::after {
      content: "";
      position: absolute;
      animation: shan 1.5s ease 0s infinite;
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
  @keyframes shan {
    0% {
      left: -100%;
    }
    100% {
      left: 120%;
    }
  }
  </style>
