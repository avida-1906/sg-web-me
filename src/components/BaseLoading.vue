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
  --type2-small: url('~/icons/spt-loading2.svg');
  --type2-big: url('~/icons/spt-basketball.svg');
  --type3-small: url('~/icons/spt-loading1.svg');
  --type3-big: url('~/icons/chess-frame2.svg');
  --base-loading-rotate-angle: 15deg;
}
</style>

<style lang="scss" scoped>
.default-loading {
  width: 120px;
}
.tg-base-loading {
  font-size: var(--tg-font-size-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-24);
}
.animate-prop {
  animation-timing-function: cubic-bezier(.5,1.8,.2,2.2);
  animation-iteration-count: infinite;
  animation-duration: .8s;
  transform-origin: center center;
  background-size: cover!important;
  will-change: transform,opacity;
}
.svg-box {
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center center;
  filter: invert(1);
  &.type1 {
    animation-name: svgChange1;
    animation-delay: -.2s;
    transform-origin: right center;
  }
  &.type2 {
    animation-name: svgChange2;
    animation-delay: -.1s;
    transform-origin: center center;
  }
  &.type3 {
    animation-name: svgChange3;
    animation-delay: 0s;
    transform-origin: left center;
  }
}
@keyframes svgChange1 {
  0%,30%,to {
    opacity: .85;
    transform: scale(.9);
    background: var(--type1-small);
  }
  75% {
    opacity: .9;
    transform: scale(1.35) rotate(10deg);
    background: var(--type1-big);
  }
}
@keyframes svgChange2 {
  0%,30%,to {
    opacity: .85;
    transform: scale(.9);
    background: var(--type2-small);
  }
  75% {
    opacity: .9;
    transform: scale(1.35) rotate(10deg);
    background: var(--type2-big);
  }
}
@keyframes svgChange3 {
  0%,30%,to {
    opacity: .85;
    transform: scale(.9);
    background: var(--type3-small);
  }
  75% {
    opacity: .9;
    transform: scale(1.35) rotate(10deg);
    background: var(--type3-big);
  }
}
</style>
