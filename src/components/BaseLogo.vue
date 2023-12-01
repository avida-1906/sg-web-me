<script setup lang="ts">
interface Props {
  mode?: 'light' | 'dark'
  useSmall?: boolean
}

withDefaults(defineProps<Props>(), {
  mode: 'light',
  useSmall: false,
})
</script>

<template>
  <div class="base-logo">
    <BaseAspectRatio
      ratio="150/53"
      class="aspect-ratio"
    >
      <BaseImage :url="`/img/logo/logo_${mode}.svg`">
      <!-- <BaseIcon
        class="icon-app-logo"
        :name="useSmall ? 'app-logo-small' : 'logo'" /> -->
      </baseimage>
    </BaseAspectRatio>
  </div>
</template>

<style lang="scss" scoped>
.base-logo {
  .aspect-ratio{
    max-width: 67px;
    min-width: 30px;
    cursor: pointer;
    &:active {
      transform: scale(0.96);
    }
  }
  .icon-app-logo {
    display: block;
    width: 100%;
    height: 100%;
    --tg-icon-color: var(--tg-text-white);
  }
}
</style>
