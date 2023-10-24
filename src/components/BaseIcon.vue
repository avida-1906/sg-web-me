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
})

const isImage = computed(() => props.name.includes('%lang%'))
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <div v-if="isImage" class="app-svg-icon">
    <BaseImage
      :url="name"
      is-game
    />
  </div>
  <svg v-else class="app-svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.app-svg-icon {
  color: var(--tg-icon-color);
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
