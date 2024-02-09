<script setup lang="ts">
interface Props {
  modelValue: boolean
  disabled?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

function onClick() {
  if (props.disabled)
    return
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>

<template>
  <div class="base-switch" :class="{ active: modelValue, disabled }" @click="onClick">
    <div class="circle" />
  </div>
</template>

<style>
:root{
  --tg-base-switch-style-bg: var(--tg-text-blue);
}
</style>

<style scoped lang="scss">
.base-switch {
  width: var(--tg-spacing-40);
  height: var(--tg-spacing-24);
  background-color: var(--tg-secondary-main);
  padding: var(--tg-spacing-2);
  border-radius: 100px;
  cursor: pointer;

  .circle {
    width: var(--tg-spacing-20);
    height: var(--tg-spacing-20);
    background-color: var(--tg-text-white);
    border-radius: 50%;
    transition: all ease-out .3s;
  }
}

.active {
  background-color: var(--tg-base-switch-style-bg);

  .circle {
    transform: translateX(var(--tg-spacing-16));
  }
}
.disabled{
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
