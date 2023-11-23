<script lang="ts" setup>
interface SwiperItem {
  value: string | number
  label: string
  id?: string | number
  [k: string]: any
}

interface Props {
  mode?: 'default' | 'notice'
  data: SwiperItem[]
  modelValue?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
})

const emit = defineEmits(['update:modelValue', 'change'])

const { bool: isDragging, setFalse: setDFalse, setTrue: setDTrue } = useBoolean(false)
const { bool: isSliding, setFalse: setSFalse, setTrue: setSTrue } = useBoolean(false)

const _data = ref(props.data)
const swiperOuter = ref()
const active = ref(0)
const trackX = ref(0)
const duration = ref(800)
const touchStartPoint = ref()
const touchEndPoint = ref()
const swiperTrack = ref()

const width = useElementSize(swiperOuter).width

const outerWidth = computed(() => Math.floor(width.value))
const trackOuterWidth = computed(() => Math.ceil(outerWidth.value * _data.value.length))
const dragDirection = computed(() => touchEndPoint.value - touchStartPoint.value)

emit('update:modelValue', _data.value[active.value])
emit('change', _data.value[active.value])

function slideToPrev() {
  if (isDragging.value || isSliding.value)
    return
  setSTrue()
  if (active.value > 0) {
    duration.value = 800
    trackX.value += outerWidth.value
    active.value -= 1
    setSFalse()
  }
  else {
    _data.value.reverse()
    duration.value = 0
    trackX.value = -(_data.value.length - 1) * outerWidth.value
    setTimeout(() => {
      duration.value = 800
      trackX.value = -(_data.value.length - 2) * outerWidth.value
      active.value = _data.value.length - 2
      setTimeout(() => {
        setSFalse()
      }, 800)
    }, 0)
  }
}
function slideToNext() {
  if (isDragging.value || isSliding.value)
    return
  setSTrue()
  if (active.value < _data.value.length - 1) {
    duration.value = 800
    trackX.value -= outerWidth.value
    active.value += 1
    setSFalse()
  }
  else {
    duration.value = 0
    _data.value.reverse()
    trackX.value = 0
    setTimeout(() => {
      duration.value = 800
      trackX.value = -outerWidth.value
      active.value = 1
      setTimeout(() => {
        setSFalse()
      }, 800)
    }, 0)
  }
}
function mouseDownEve(event: MouseEvent) {
  setDTrue()
  touchStartPoint.value = event.clientX
  touchEndPoint.value = event.clientX
}
function mouseUpEve(event: MouseEvent) {
  setDFalse()
  touchEndPoint.value = event.clientX
  if (trackX.value > 0) {
    duration.value = trackX.value / outerWidth.value * 800
    trackX.value = 0
    active.value = 0
  }
  else {
    const minTrack = outerWidth.value - trackOuterWidth.value
    if (trackX.value < minTrack) {
      duration.value
        = (-trackX.value + minTrack)
        / outerWidth.value * 800
      trackX.value = minTrack
      active.value = _data.value.length - 1
    }
    else {
      if (Math.abs(dragDirection.value) >= outerWidth.value / 4) {
        if (dragDirection.value > 0) {
          trackX.value += (outerWidth.value - dragDirection.value)
          active.value -= 1
          if (trackX.value > 0)
            trackX.value = 0

          if (active.value < 0)
            active.value = 0

          duration.value
            = (outerWidth.value - dragDirection.value) / outerWidth.value * 800
        }
        else {
          trackX.value -= (outerWidth.value + dragDirection.value)
          active.value += 1
          if (trackX.value < -trackOuterWidth.value)
            trackX.value = -trackOuterWidth.value

          if (active.value > _data.value.length - 1)
            active.value = _data.value.length - 1

          duration.value
            = (outerWidth.value + dragDirection.value) / outerWidth.value * 800
        }
      }
      else {
        trackX.value -= dragDirection.value
        duration.value = dragDirection.value / outerWidth.value * 800
      }
    }
  }
}
function mouseMoveEve(event: MouseEvent) {
  if (isDragging.value) {
    duration.value = 0
    const temp = event.clientX - touchEndPoint.value
    trackX.value += temp
    touchEndPoint.value = event.clientX
  }
}
function mouseLeaveEve(event: MouseEvent) {
  if (isDragging.value)
    mouseUpEve(event)
}

watch(active, (val) => {
  emit('update:modelValue', _data.value[val])
  emit('change', _data.value[val])
})
</script>

<template>
  <div class="swiper-wrapper" :class="[`swiper-${mode}`]">
    <div
      ref="swiperOuter"
      class="swiper-outer center-mode"
      :style="{
        '--swiper-outer-width': `${outerWidth}px`,
      }"
    >
      <div v-if="_data.length > 1" class="arrows-overlay">
        <div class="left">
          <BaseButton
            type="text"
            size="none"
            style="font-size: inherit;"
            @click="slideToPrev"
          >
            <BaseIcon name="uni-arrow-left" />
          </BaseButton>
        </div>
        <div class="right">
          <BaseButton
            type="text"
            size="none"
            style="font-size: inherit;"
            @click="slideToNext"
          >
            <BaseIcon name="uni-arrow-right" />
          </BaseButton>
        </div>
      </div>
      <div class="swiper-track-wrap" :class="{ dragging: isDragging }">
        <div
          ref="swiperTrack"
          class="track"
          :style="{
            'width': `${outerWidth * _data.length}px`,
            'transform': `translate3d(${trackX}px, 0px, 0px)`,
            'transition-duration': `${duration}ms`,
          }"
          @mousedown="mouseDownEve"
          @mouseup="mouseUpEve"
          @mousemove="mouseMoveEve"
          @mouseleave="mouseLeaveEve"
        >
          <div
            v-for="item, idx in _data"
            :key="`${idx}_${item.value ?? item.id}`"
            class="slide-wrap"
            :class="[
              `slide-position-${idx + 1}`,
              _data[active].value === item.value ? 'center visible active' : '',
              isDragging ? 'visible' : '',
            ]"
          >
            <slot :item="item">
              <BaseButton size="md">
                <span class="label">{{ item.label }}</span>
              </BaseButton>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-wrapper {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  position: relative;
  overflow: hidden;
}
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
        .label {
          color: var(--tg-text-white);
          transition: color 0.2s linear;
        }
        &.visible {
          opacity: 1;
        }
        &.active {
          .label {
            color: var(--tg-text-lightblue);
          }
        }
        button {
          display: flex;
          width: 100%;
        }
      }
    }
  }
}
.swiper-notice{
  padding:0;
  .swiper-outer{
    .swiper-track-wrap .track .slide-wrap{
      padding: 0 ;
    }
    .arrows-overlay{
      --tg-icon-color:var(--tg-text-white);
      .left,.right{
        font-size: var(--tg-font-size-lg);
        width: 28px;
        height: 56px;
        border-radius: var(--tg-radius-default);
      }
      .left{
        left: 4px;
        background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
      }
      .right{
        right: 4px;
        background: linear-gradient(-270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
        justify-content: flex-end;
      }
    }
  }
}
</style>
