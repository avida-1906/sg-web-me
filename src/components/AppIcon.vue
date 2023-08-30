<script lang="ts" setup name="app-icon">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
})

const symbolId = `#${props.prefix}-${props.name}`
</script>

<template>
  <svg class="app-svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped>
.app-svg-icon {
  width: 1em;
  height: 1em;
  pointer-events: none;
  stroke-width: 0;
  flex-shrink: 0;
}
</style>
