<script setup lang='ts'>
interface Props {
  data: {
    [text: string]: any
    value: string
  }[]
  columns?: number
  modelValue: string
}
withDefaults(defineProps<Props>(), {
  columns: 3,
})
const emit = defineEmits(['update:modelValue'])

function onSelect(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="radio-group" :style="{ 'grid-template-columns': `repeat(${columns},1fr)` }">
    <BaseRadio v-for="item in data" :key="item.value" v-slot="{ data: itemData }" :value="item.value" :disabled="item.disabled" :data="item" :is-checked="item.value === modelValue" @select="onSelect">
      {{ itemData.label }}
    </BaseRadio>
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
