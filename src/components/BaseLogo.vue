<script setup lang="ts">
interface Props {
  mode: 'svg' | 'picture'
  svgName?: string
  url?: string
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'svg',
  svgName: 'app-logo',
  url: '',
})
</script>

<template>
  <div class="base-logo">
    <BaseIcon v-if="props.mode === 'svg'" class="icon-app-logo" :name="props.svgName" />
    <img v-else :src="props.url" loading="lazy" alt="">
  </div>
</template>

<style lang="scss" scoped>
.base-logo {
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;

  .icon-app-logo {
    width: 100%;
    height: 100%;
    color: var(--tg-text-white) !important;
  }
}
.base-logo:active{
  transform: scale(0.9);
}
</style>
