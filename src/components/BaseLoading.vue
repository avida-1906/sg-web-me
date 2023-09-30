<script lang="ts" setup name="base-loading">
</script>

<template>
  <section class="tg-base-loading">
    <div class="type1 animate-prop svg-box" />
    <div class="svg-box animate-prop type2" />
    <div class="svg-box animate-prop type3" />
  </section>
</template>

<style lang="scss">
:root {
  --type1-small: url('~/icons/chess-frame4.svg');
  --type1-big: url('~/icons/chess-frame.svg');
  --type2-small: url('~/icons/spt-football.svg');
  --type2-big: url('~/icons/spt-basketball.svg');
  --type3-small: url('~/icons/chess-21clock.svg');
  --type3-big: url('~/icons/chess-frame2.svg');
  --base-loading-rotate-angle: 15deg;
}
</style>

<style lang="scss" scoped>
.tg-base-loading {
  .svg-box:first-child {
    transform-origin: top right;
    background-position: top right;
  }
  .svg-box:nth-child(2) {
    animation-delay: 240ms;
  }
  .svg-box:last-child {
    transform-origin: bottom left;
    animation-delay: 480ms;
    background-position: bottom left;
  }
}
.animate-prop {
  animation-duration: 720ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  transform-origin: center center;
}
.svg-box {
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 14px auto;
  transform-origin: center;
  filter: invert(1);
  &.type1 {
    background-image: var(--type1-small);
    animation-name: svgChange1;
  }
  &.type2 {
    background-image: var(--type2-small);
    animation-name: svgChange2;
  }
  &.type3 {
    background-image: var(--type3-small);
    animation-name: svgChange3;
  }
}
@keyframes svgChange1 {
  0% {
    background-image: var(--type1-small);
    transform: scale(1) rotateZ(0deg);
  }
  10% {
    background-image: var(--type1-small);
    transform: scale(1) rotateZ(0deg);
  }
  40% {
    background-image: var(--type1-big);
    transform: scale(1.8) rotateZ(var(--base-loading-rotate-angle));
  }
  60% {
    background-image: var(--type1-big);
    transform: scale(1.8) rotateZ(var(--base-loading-rotate-angle));
  }
  90% {
    background-image: var(--type1-small);
    transform: scale(1) rotateZ(0deg);
  }
  100% {
    background-image: var(--type1-small);
    transform: scale(1) rotateZ(0deg);
  }
}
@keyframes svgChange2 {
  0% {
    background-image: var(--type2-small);
    transform: scale(1) rotateZ(0deg);
  }
  10% {
    background-image: var(--type2-small);
    transform: scale(1) rotateZ(0deg);
  }
  40% {
    background-image: var(--type2-big);
    transform: scale(1.8) rotateZ(var(--base-loading-rotate-angle));
  }
  60% {
    background-image: var(--type2-big);
    transform: scale(1.8) rotateZ(var(--base-loading-rotate-angle));
  }
  90% {
    background-image: var(--type2-small);
    transform: scale(1) rotateZ(0deg);
  }
  100% {
    background-image: var(--type2-small);
    transform: scale(1) rotateZ(0deg);
  }
}
@keyframes svgChange3 {
  0% {
    background-image: var(--type3-small);
    transform: scale(1) rotateZ(0deg);
  }
  10% {
    background-image: var(--type3-small);
    transform: scale(1) rotateZ(0deg);
  }
  40% {
    background-image: var(--type3-big);
    transform: scale(1.8) rotateZ(var(--base-loading-rotate-angle));
  }
  60% {
    background-image: var(--type3-big);
    transform: scale(1.8) rotateZ(var(--base-loading-rotate-angle));
  }
  90% {
    background-image: var(--type3-small);
    transform: scale(1) rotateZ(0deg);
  }
  100% {
    background-image: var(--type3-small);
    transform: scale(1) rotateZ(0deg);
  }
}

.tg-base-loading {
  font-size: var(--tg-font-size-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-24);

  .item {
    position: relative;
    animation-name: scaleRotateUp;

    .small,
    .big {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
    }

    .small {
      animation-name: opacityUp;
      opacity: 1;
    }

    .big {
      animation-name: opacityDown;
      opacity: 0;
    }
  }

  .item:first-child {
    transform-origin: center right;
  }

  .item:nth-child(2) {
    animation-delay: 300ms;

    .small,
    .big {
      animation-delay: 300ms;
    }
  }

  .item:last-child {
    transform-origin: center left;
    animation-delay: 600ms;

    .small,
    .big {
      animation-delay: 600ms;
    }
  }
}

@keyframes scaleRotateUp {
  0% {
    transform: scale(1) rotateZ(0);
  }

  30% {
    transform: scale(1.8) rotateZ(30deg);
  }

  // 80% {
  //   transform: scale(1) rotateZ(0);
  // }

  100% {
    transform: scale(1) rotateZ(0);
  }
}

@keyframes opacityUp {
  0% {
    opacity: 1;
  }

  35% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  65% {
    opacity: 0;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes opacityDown {
  0% {
    opacity: 0;
  }

  35% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  65% {
    opacity: 1;
  }

  90% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}
</style>
