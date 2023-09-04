<script setup lang='ts'>
interface Props {
  data: any
  columns?: number
}
withDefaults(defineProps<Props>(), {
  columns: 3,
})
</script>

<template>
  <div class="radio-group" :style="{ 'grid-template-columns': `repeat(${columns},1fr)` }">
    <BaseRadio v-for="item in data" :key="item.value" v-slot="{ data }" :data="item">
      {{ data.label }}
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
