<script setup lang='ts'>
interface Props {
  columns?: number
  modelValue: string | number
  shape?: 'square' | 'circle'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  shape: 'circle',
  inline: true,
})

const emit = defineEmits(['update:modelValue', 'change'])

const sValue = computed(() => props.modelValue)

function onSelect(value: string | number) {
  if (props.modelValue === value)
    return

  emit('update:modelValue', value)
  emit('change', value)
}

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

<style lang="scss">
:root {
  --tg-radio-group-style-gap-vertical: var(--tg-spacing-16);
  --tg-radio-group-style-gap-horizontal: var(--tg-spacing-48);
}
</style>

<style lang='scss' scoped>
.radio-group{
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-gap: var(--tg-radio-group-style-gap-vertical) var(--tg-radio-group-style-gap-horizontal);
}
</style>
