<script setup lang='ts'>
interface Props {
  columns?: number
  modelValue: string
  shape?: 'square' | 'circle'
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  shape: 'circle',
})
const emit = defineEmits(['update:modelValue', 'change'])

function onSelect(value: string) {
  if (props.modelValue === value)
    return

  emit('update:modelValue', value)
  emit('change', value)
}

const sValue = computed(() => props.modelValue)
provide('onSelect', onSelect)
provide('sValue', sValue)
provide('shape', props.shape)
provide('disabled', props.disabled)
</script>

<template>
  <div class="radio-group" :style="{ 'grid-template-columns': `repeat(${columns},1fr)` }">
    <slot />
  </div>
</template>

<style lang='scss' scoped>
.radio-group{
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-gap: var(--tg-spacing-16) var(--tg-spacing-48);
}
</style>
