<script lang="ts" setup name="app-icon">
interface Props {
  prefix?: string
  name: string
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg class="app-svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style>
:root {
  --tg-base-icon-color:var(--tg-icon-color);
}
</style>

<style scoped>
.app-svg-icon {
  display: inline-block;
  color: var(--tg-base-icon-color);
  width: 1em;
  height: 1em;
  pointer-events: none;
  stroke-width: 0;
  flex-shrink: 0;
  fill: currentColor;
  stroke: currentColor;
  transition: var(--tg-transition);
}
</style>
