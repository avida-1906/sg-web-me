<script setup lang="ts">
interface Props {
  modelValue: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

function onClick() {
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>

<template>
  <div class="base-switch" :class="{ active: modelValue }" @click="onClick">
    <div class="circle" />
  </div>
</template>

<style scoped lang="scss">
.base-switch {
  width: 40px;
  height: 24px;
  background-color: var(--tg-secondary-main);
  padding: 2px;
  border-radius: 100px;
  cursor: pointer;

  .circle {
    width: 20px;
    height: 20px;
    background-color: var(--tg-text-white);
    border-radius: 50%;
    transition: all ease-out .3s;
  }
}

.active {
  background-color: var(--tg-text-blue);

  .circle {
    transform: translateX(16px);
  }
}
</style>
