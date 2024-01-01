<script setup lang="ts">
interface Props {
  round?: boolean
  type?: 'default' | 'text' | 'line' | 'round-line-left' | 'round-line-right'
  bgStyle?: 'primary' | 'secondary' | 'dark'
  disabled?: boolean
  loading?: boolean
  size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: boolean
  customPadding?: boolean
  originType?: 'button' | 'submit' | 'reset'
  sportsLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'xs',
  originType: 'button',
})

function onClick(e: any) {
  if (props.disabled)
    e.stopPropagation()
}
</script>

<template>
  <button
    :type="originType"
    :disabled="disabled" :class="[type, bgStyle, size, {
      round,
      shadow,
      loading,
      'custom-padding': customPadding,
    }]"
  >
    <div v-if="loading" class="loading-icon">
      <BaseIcon
        v-if="sportsLoading" style="--tg-icon-color:var(--tg-text-white);"
        name="spt-soccer" class="ani-scaleAndRotate"
      />
      <BaseIcon v-else name="chess-frame2" class="ani-roll" />
    </div>
    <div v-else class="content" @click="onClick">
      <slot />
    </div>
  </button>
</template>

<style lang="scss">
:root {
  --tg-base-button-style-bg: var(--tg-secondary-main);
  --tg-base-button-style-bg-hover: var(--tg-text-grey);
  --tg-base-button-text-default-color: var(--tg-text-grey-button);
  --tg-base-button-font-size: var(--tg-font-size-default);
  --tg-base-button-font-weight: var(--tg-font-weight-semibold);
  --tg-base-button-padding-y: var(--tg-spacing-button-padding-vertical-xs);
  --tg-base-button-padding-x: var(--tg-spacing-button-padding-horizontal-xs);
  --tg-base-button-disabled-opacity:0.5;
  --tg-base-button-loading-opacity:0.5;
  --tg-base-button-line-border-color: var(--tg-text-white);
  --tg-base-button-justify-content: center;
}
</style>

<style lang="scss" scoped>
button {
  color: var(--tg-text-white);
  font-size: var(--tg-base-button-font-size);
  border-radius: var(--tg-radius-default);
  font-weight: var(--tg-base-button-font-weight);
  transition: var(--tg-transition);
  line-height: 1;
  max-width: 100%;

  &.none{
    padding: 0;
  }
  &.xs {
    padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
  }

  &.sm {
    padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
  }

  &.md {
    padding: var(--tg-spacing-button-padding-vertical-md) var(--tg-spacing-button-padding-horizontal-md);
  }

  &.lg {
    padding: var(--tg-spacing-button-padding-vertical-lg) var(--tg-spacing-button-padding-horizontal-lg);
  }

  &.xl {
    padding: var(--tg-spacing-button-padding-vertical-xl) var(--tg-spacing-button-padding-horizontal-xl);
  }

  &.custom-padding {
    padding: var(--tg-base-button-padding-y) var(--tg-base-button-padding-x);
  }

  .loading-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-base);
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: var(--tg-base-button-justify-content);
  }
  &.loading{
    opacity: var(--tg-base-button-loading-opacity);
    pointer-events: none;
  }

  &:disabled {
    opacity: var(--tg-base-button-disabled-opacity);
    cursor: not-allowed;
  }
}

.default {
  background-color: var(--tg-base-button-style-bg);

  &:active {
    .content {
      transform: scale(0.96);
    }
  }

  &:hover:not(:disabled) {
    background-color: var(--tg-base-button-style-bg-hover);
  }
}

.text {
  color: var(--tg-base-button-text-default-color);

  &:active {
    color: var(--tg-text-white);

    .content {
      transform: scale(0.96);
    }
  }

  &:hover:not(:disabled) {
    color: var(--tg-text-white);
    --tg-icon-color: var(--tg-text-white);
  }
}

.line {
  border: 1px solid var(--tg-base-button-line-border-color);

  &:active {
    background-color: var(--tg-secondary-main);

    .content {
      transform: scale(0.96);
    }
  }

  &:hover:not(:disabled):not(:active) {
    background-color: var(--tg-secondary-main);
  }
}

.round-line-left {
  border: 1px solid var(--tg-secondary-light);
  border-radius: 100px 0 0 100px;

  &:active {
    .content {
      transform: scale(0.96);
    }
  }

  &:hover:not(:disabled):not(:active) {
    .content {
      transform: scale(1.05);
    }
  }
}

.round-line-right {
  border: 1px solid var(--tg-secondary-light);
  border-radius: 0 100px 100px 0;

  &:active {
    .content {
      transform: scale(0.96);
    }
  }

  &:hover:not(:disabled):not(:active) {
    .content {
      transform: scale(1.05);
    }
  }
}

.shadow {
  box-shadow: var(--tg-box-shadow);
}

.round {
  border-radius: 100px;
}

.primary {
  --tg-base-button-style-bg: var(--tg-text-blue);
  --tg-base-button-style-bg-hover: var(--tg-sub-deepblue);
  background-color: var(--tg-base-button-style-bg);

  &:hover:not(:disabled) {
    background-color: var(--tg-base-button-style-bg-hover);
  }
}

.secondary {
  --tg-base-button-style-bg: var(--tg-text-green);
  --tg-base-button-style-bg-hover: var(--tg-primary-success);
  background-color: var(--tg-base-button-style-bg);
  color: var(--tg-text-dark);

  &:hover:not(:disabled) {
    background-color: var(--tg-base-button-style-bg-hover);
  }
}

.dark {
  --tg-base-button-style-bg: var(--tg-secondary-dark);
  --tg-base-button-style-bg-hover: var(--tg-secondary-grey);
  background-color: var(--tg-base-button-style-bg);

  &:hover:not(:disabled) {
    background-color: var(--tg-base-button-style-bg-hover);
  }
}
</style>
