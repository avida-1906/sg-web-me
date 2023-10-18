<script lang="ts" setup>
interface SwiperItem {
  value: string | number
  label: string
}

interface Props {
  data: SwiperItem[]
  modelValue?: string | number
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'change'])

const swiperOuter = ref()
const outerWidth = ref(0)
const active = ref(0)
const { bool: isDragging, setFalse: setDFalse, setTrue: setDTrue } = useBoolean(false)
const trackX = ref(0)
const duration = ref(800)
const touchStartPoint = ref()
const touchEndPoint = ref()
const swiperTrack = ref()

emit('update:modelValue', props.data[active.value])
emit('change', props.data[active.value])

function slideToPrev() {
  if (active.value > 0) {
    duration.value = 800
    trackX.value += outerWidth.value
    active.value -= 1
  }
  else {
    duration.value = 0
    active.value = props.data.length - 1
    trackX.value = -(props.data.length - 1) * outerWidth.value
  }
}
function slideToNext() {
  if (active.value < props.data.length - 1) {
    duration.value = 800
    trackX.value -= outerWidth.value
    active.value += 1
  }
  else {
    duration.value = 0
    active.value = 0
    trackX.value = 0
  }
}
function mouseDownEve(event: MouseEvent) {
  setDTrue()
  touchStartPoint.value = event.clientX
}
function mouseUpEve(event: MouseEvent) {
  setDFalse()
}
function mouseMoveEve(event: MouseEvent) {
  // if (isDragging.value) {
  //   duration.value = 0
  //   const temp = event.clientX - touchStartPoint.value
  //   console.log(temp)
  //   trackX.value += temp
  // }
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      const { width } = swiperOuter.value.getBoundingClientRect()
      outerWidth.value = width
    }, 0)
  })
})
</script>

<template>
  <div
    ref="swiperOuter"
    class="swiper-outer center-mode"
    :style="{ '--swiper-outer-width': `${outerWidth}px` }"
  >
    <div class="arrows-overlay">
      <div class="left">
        <BaseButton type="text" @click="slideToPrev">
          <BaseIcon name="uni-arrow-left" />
        </BaseButton>
      </div>
      <div class="right">
        <BaseButton type="text" @click="slideToNext">
          <BaseIcon name="uni-arrow-right" />
        </BaseButton>
      </div>
    </div>
    <div class="swiper-track-wrap" :class="{ dragging: isDragging }">
      <div
        ref="swiperTrack"
        class="track"
        :style="{
          'width': `${outerWidth * data.length}px`,
          'transform': `translate3d(${trackX}px, 0px, 0px)`,
          'transition-duration': `${duration}ms`,
        }"
        @mousedown="mouseDownEve"
        @mouseup="mouseUpEve"
        @mousemove="mouseMoveEve"
      >
        <div
          v-for="item, idx in data"
          :key="`${idx}_${item.value}`"
          class="slide-wrap"
          :class="[
            `slide-position-${idx + 1}`,
            data[active].value === item.value ? 'center visible' : '',
            isDragging ? 'visible' : '',
          ]"
        >
          <BaseButton size="md">
            {{ item.label }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-outer {
  width: 100%;
  position: relative;
  overflow: visible;
  .arrows-overlay {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    pointer-events: none;
    transition: .2s;
    &>* {
      position: absolute;
      pointer-events: all;
      font-weight: var(--tg-font-weight-semibold);
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-white);
      display: flex;
    }
    .left {
      left: -7.5px;
    }
    .right {
      right: -7.5px;
    }
    button {
      padding: 0 !important;
      font-size: var(--tg-font-size-xs);
      transition: all 0.2s;
      transform: scale(0.8);
      &::hover {
        transform: scale(1.5);
      }
    }
  }
  .swiper-track-wrap {
    max-width: 0px;
    width: 100%;
    .track {
      display: flex;
      position: relative;
      transition-property: transform;
      transition-duration: 0ms;
      transition-delay: 0ms;
      transition-timing-function: ease;
      .slide-wrap {
        position: relative;
        opacity: .3;
        transition: transform .7s ease,opacity 1s ease;
        padding: 0 7.5px;
        width: var(--swiper-outer-width);
        &.visible {
          opacity: 1;
        }
        button {
          display: flex;
          width: 100%;
        }
      }
    }
  }
}
</style>
