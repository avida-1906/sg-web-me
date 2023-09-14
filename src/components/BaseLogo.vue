<script setup lang="ts">
interface Props {
  useSmall?: boolean
}
withDefaults(defineProps<Props>(), {
  useSmall: false,
})
</script>

<template>
  <div class="base-logo">
    <BaseIcon class="icon-app-logo" :name="useSmall ? 'app-logo-small' : 'app-logo'" />
  </div>
</template>

<style lang="scss" scoped>
.base-logo {
  width: 100%;
  height: 100%;
  cursor: pointer;

  .icon-app-logo {
    width: 100%;
    height: 100%;
    --tg-icon-color: var(--tg-text-white);
  }
}
.base-logo:active{
  transform: scale(0.9);
}
</style>
