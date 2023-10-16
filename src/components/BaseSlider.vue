<script lang="ts" setup>
interface Props {
  data: {
    value: string | number
    label: string
  }[]
  modelValue?: string | number
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'change'])

const sliderOuter = ref()
const outerWidth = ref(0)
const curValue = ref(props.data[0].value)
const { bool: isDragging, setFalse: setDFalse, setTrue: setDTrue } = useBoolean(false)

const tripleData = props.data.concat(props.data, props.data)

emit('update:modelValue', curValue.value)
emit('change', curValue.value)

function slideToPrev() {}
function slideToNext() {}
function mouseDownEve() {
  setDTrue()
}
function mouseUpEve() {
  setDFalse()
}

onMounted(() => {
  const { width } = sliderOuter.value.getBoundingClientRect()
  outerWidth.value = width
})
</script>

<template>
  <div
    ref="sliderOuter"
    class="slider-outer center-mode"
    :style="{ '--slider-outer-width': `${outerWidth}px` }"
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
    <div class="slider-track-wrap" :class="{ dragging: isDragging }">
      <div
        class="track"
        :style="{ width: `${outerWidth * data.length * 3}px` }"
        @mousedown="mouseDownEve"
        @mouseup="mouseUpEve"
      >
        <div
          v-for="item, idx in tripleData"
          :key="`${idx}_${item.value}`"
          class="slide-wrap"
          :class="[
            `slide-position-${idx + 1}`,
            curValue === item.value ? 'center visible' : '',
            isDragging ? 'visible' : '',
          ]"
        >
          <BaseButton size="md">
            {{ item.label }}
          </BaseButton>
        </div>
        <!-- <div class="slide-wrap slide-position-2 center visible">
          <BaseButton size="md">
            7.5
          </BaseButton>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider-outer {
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
  .slider-track-wrap {
    max-width: 0px;
    width: 100%;
    .track {
      display: flex;
      position: relative;
      will-change: transform;
      // transform: translate(-1655.84px, 0px);
      // width: 2709.56px;
      .slide-wrap {
        position: relative;
        opacity: .3;
        transition: transform .7s ease,opacity 1s ease;
        padding: 0 7.5px;
        width: var(--slider-outer-width);
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
