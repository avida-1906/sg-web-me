<script lang="ts" setup>
interface Props {
  min?: number
  max?: number
  step?: number
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  min: 0,
  max: 4,
})

const range = ref()

const labels = computed(() => {
  const arr = []
  let temp = props.min
  do
    arr.push(temp += props.step)
  while (temp < props.max)
  arr.push(props.max)
  return arr
})
</script>

<template>
  {{ range }}
  <div class="app-ball-range wrapper">
    <span v-if="title">{{ title }}</span>
    <div class="input-wrapper">
      <input v-model="range" type="range" :min="min" :max="max" :step="step" class="">
    </div>
    <div class="labels" :style="`grid-template-columns: repeat(${labels.length}, 1fr);`">
      <span v-for="label, idx in labels" :key="label" class="label" :style="{ left: `${(100 * idx / (labels.length - 1)).toFixed(2)}%` }">{{ label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    width: var(--current);
    input {
      -webkit-appearance: none;
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
      width: var(--current);
      max-width: calc(100% - 20px);
      top: calc(50% - 5px);
      height: 10px;
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
