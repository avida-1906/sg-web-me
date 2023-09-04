<script lang="ts" setup name="base-loading">
const loadIcons = [
  ['chess-frame4', 'chess-frame'],
  ['chess-football-club', 'spt-basketball'],
  ['chess-21clock', 'chess-frame2'],
]
</script>

<template>
  <section class="tg-base-loading">
    <div v-for="load, i in loadIcons" :key="i" class="item animate-prop">
      <div class="animate-prop small">
        <BaseIcon :name="load[0]" />
      </div>
      <div class="animate-prop big">
        <BaseIcon :name="load[1]" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.animate-prop {
  animation-duration: 1000ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  transform-origin: center center;
}

.tg-base-loading {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;

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
    transform: scale(2) rotateZ(30deg);
  }

  // 90% {
  //   transform: scale(0.9) rotateZ(5deg);
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
