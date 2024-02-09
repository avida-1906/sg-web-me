<script lang="ts" setup>
interface Props {
  min?: number
  max?: number
  step?: number
  title?: string
  modelValue?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  min: 0,
  max: 4,
})

const emit = defineEmits(['update:modelValue'])

const range = ref(props.modelValue ? +props.modelValue : props.min)

const labels = computed(() => {
  const arr = []
  let temp = props.min
  do {
    arr.push(Math.floor(temp))
    temp += props.step
  } while (temp < props.max)
  arr.push(props.max)
  return arr
})

onMounted(() => {
  emit('update:modelValue', range.value)
})

watch(range, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <div class="app-ball-range wrapper">
    <span v-if="title" class="title">{{ title }}</span>
    <div
      class="input-wrapper"
      :style="{ '--current': `${100 * (range - min) / (max - min)}%` }"
    >
      <input v-model="range" type="range" :min="min" :max="max" :step="step">
    </div>
    <div class="labels" :style="`grid-template-columns: repeat(${labels.length}, 1fr);`">
      <span
        v-for="label, idx in labels"
        :key="label"
        class="label"
        :style="{ left: `${(100 * idx / (labels.length - 1)).toFixed(2)}%` }"
      >{{ label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper input[type=range] {
  appearance: none;
  width: 100%;
  background: 0 0;
  height: 30px;
  padding: 5px;
}

.input-wrapper input[type=range]::-moz-range-thumb {
  position: relative;
  z-index: 3;
  appearance: none;
  height: 21px;
  width: 21px;
  border-radius: 10.5px;
  background-image:
    radial-gradient(circle, var(--tg-text-blue) 45%, var(--tg-text-white) 47%);
  cursor: pointer
}

.input-wrapper input[type=range]::-webkit-slider-thumb {
  margin-top: -5.5px;
  position: relative;
  z-index: 3;
  -webkit-appearance: none;
  height: 21px;
  width: 21px;
  border-radius: 10.5px;
  background-image:
    radial-gradient(circle, var(--tg-text-blue) 45%, var(--tg-text-white) 47%);
  cursor: pointer
}

.input-wrapper input[type=range]::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: var(--tg-text-grey);
  border-radius: 5px
}

.input-wrapper input[type=range]::-moz-range-progress {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: var(--tg-text-grey);
  border-radius: 5px;
  background-color: var(--tg-text-blue)
}

.input-wrapper input[type=range]::-ms-fill-lower {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: var(--tg-text-grey);
  border-radius: 5px;
  background-color: var(--tg-text-blue)
}

.input-wrapper input[type=range]::-ms-fill-upper {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: var(--tg-text-grey);
  border-radius: 5px
}

.input-wrapper input[type=range]::-moz-focus-outer {
  border: 0
}

.input-wrapper input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: var(--tg-text-grey);
  border-radius: 5px
}

.input-wrapper input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--tg-text-grey)
}

.app-ball-range {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  .title {
    display: inline-flex;
    align-items: center;
    color: var(--tg-secondary-light);
    line-height: 1.5;
    text-align: center;
    justify-content: center;
    font-weight: var(--tg-font-weight-normal);
    font-size: var(--tg-font-size-default);
  }

  .input-wrapper {
    position: relative;
    display: flex;

    input[type=range] {
      appearance: none;
      width: 100%;
      background: 0 0;
      height: 30px;
      padding: 5px;
    }

    &::after {
      z-index: 1;
      content: "";
      position: absolute;
      left: 5px;
      max-width: calc(100% - 20px);
      top: calc(50% - 5px);
      height: 10px;
      width: var(--current);
      border-radius: 5px;
      background: var(--tg-text-blue);
      pointer-events: none;
    }
  }

  .labels {
    display: grid;
    color: var(--tg-secondary-light);
    position: relative;
    height: var(--tg-spacing-16);
    width: calc(100% - var(--tg-spacing-20));
    margin: var(--tg-spacing-8) var(--tg-spacing-10) 0;
    pointer-events: none;

    .label {
      font-weight: 600;
      text-align: center;
      position: absolute;
      color: var(--tg-text-white);
    }
  }
}
</style>
