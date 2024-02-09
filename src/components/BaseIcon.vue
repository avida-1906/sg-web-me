<script lang="ts" setup name="app-icon">
interface Props {
  prefix?: string
  name: string
  hasTransition?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  hasTransition: true,
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg
    class="app-svg-icon"
    :class="{ 'has-transition': hasTransition }" aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style>
:root {
  --tg-base-icon-color: var(--tg-icon-color);
  --tg-icon-transition: var(--tg-transition);
}
</style>

<style lang="scss" scoped>
.app-svg-icon {
  display: inline-block;
  color: var(--tg-icon-color);
  width: 1em;
  height: 1em;
  pointer-events: none;
  stroke-width: 0;
  flex-shrink: 0;
  fill: currentColor;
  stroke: currentColor;
  &.has-transition {
    transition: var(--tg-icon-transition);
  }
}
</style>
