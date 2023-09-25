<script lang="ts" setup>
interface Props {
  titlePlacement?: 'left' | 'center' | 'right'
  offset?: string
}

const props = withDefaults(defineProps<Props>(), {
  titlePlacement: 'center',
  offset: '0px',
})

const leftOffset = props.titlePlacement === 'left' ? props.offset : '100%'
const rightOffset = props.titlePlacement === 'right' ? props.offset : '100%'

const cssVars = {
  '--leftOffset': leftOffset,
  '--rightOffset': rightOffset,
}
const showTitle = computed(() => {
  return useSlots().default
})
</script>

<template>
  <div
    class="base-divider w-100" :class="[
      {
        [`base-divider-title-position-${titlePlacement}`]: $slots.default && titlePlacement,
      },
    ]"
    :style="cssVars"
  >
    <div class="base-divider-line base-divider-line-left" />
    <div v-if="showTitle" class="base-divider-title">
      <slot />
    </div>
    <div class="base-divider-line base-divider-line-right" />
  </div>
</template>

<style lang="scss" scoped>
.base-divider.base-divider-title-position-left .base-divider-line.base-divider-line-left {
    width: var(--leftOffset);
}
.base-divider.base-divider-title-position-right .base-divider-line.base-divider-line-right {
    width: var(--rightOffset);
}
.base-divider {
    display: flex;
    align-items: center;
    white-space: nowrap;
    &-line {
        width: 100%;
        height: var(--tg-border-width-sm);
        border: none;
        background-color: var(--tg-secondary-main);
    }
    &-title {
        color: var(--tg-text-white);
        margin-left: var(--tg-spacing-12);
        margin-right: var(--tg-spacing-12);
        font-weight: var(--tg-font-weight-semibold);
    }
}
</style>
