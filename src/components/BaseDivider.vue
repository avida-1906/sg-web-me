<script lang="ts" setup>
interface Props {
  titlePlacement?: 'left' | 'center' | 'right'
  offset?: string
  spacing?: string
  size?: string
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
// 文字边距
const marginSpacing = computed(() => {
  if (props.spacing)
    return `var(--tg-spacing-${props.spacing})`
  else
    return 'var(--tg-spacing-12)'
})
// line 高
const lineHeight = computed(() => {
  if (props.size)
    return `var(--tg-spacing-${props.size})`
  else
    return 'var(--tg-spacing-2)'
})
</script>

<template>
  <div
    class="base-divider" :class="[
      {
        [`base-divider-title-position-${titlePlacement}`]:
          $slots.default && titlePlacement,
      },
    ]"
    :style="cssVars"
  >
    <div
      class="base-divider-line base-divider-line-left"
      :style="{ height: lineHeight }"
    />
    <div
      v-if="showTitle" class="base-divider-title"
      :style="{ margin: `0 ${marginSpacing}` }"
    >
      <slot />
    </div>
    <div
      class="base-divider-line base-divider-line-right"
      :style="{ height: lineHeight }"
    />
  </div>
</template>

<style lang="scss">
:root{
  --tg-base-divider-bg-color: var(--tg-secondary-main);
}
</style>

<style lang="scss" scoped>
.base-divider.base-divider-title-position-left .base-divider-line.base-divider-line-left {
    width: var(--leftOffset);
}
.base-divider.base-divider-title-position-right
.base-divider-line.base-divider-line-right {
    width: var(--rightOffset);
}
.base-divider {
    display: flex;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    &-line {
        width: 100%;
        // height: var(--tg-border-width-sm);
        border: none;
        background-color: var(--tg-base-divider-bg-color);
    }
    &-title {
        color: var(--tg-text-white);
        // margin-left: var(--tg-spacing-12);
        // margin-right: var(--tg-spacing-12);
        // font-weight: var(--tg-font-weight-semibold);
    }
}
</style>
