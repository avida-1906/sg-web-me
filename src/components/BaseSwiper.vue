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

emit('update:modelValue', props.data[active.value])
emit('change', props.data[active.value])

function slideToPrev() {}
function slideToNext() {
  if (active.value < props.data.length - 1) {
    trackX.value -= outerWidth.value
    active.value += 1
  }
  else {
    active.value = 0
    trackX.value = 0
  }
}
function mouseDownEve() {
  setDTrue()
}
function mouseUpEve() {
  setDFalse()
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
        class="track"
        :style="{
          width: `${outerWidth * data.length * 3}px`,
          transform: `translate(${trackX}px, 0px)`,
        }"
        @mousedown="mouseDownEve"
        @mouseup="mouseUpEve"
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
      will-change: transform;
      transition: all 1s linear;
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
