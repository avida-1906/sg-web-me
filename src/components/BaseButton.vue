<script setup lang="ts">
interface Props {
  round?: boolean
  type?: 'default' | 'text' | 'line' | 'round-line-left' | 'round-line-right'
  bgStyle?: 'primary' | 'secondary' | 'dark'
  disabled?: boolean
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: boolean
  fontSize?: string
  padding0?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'xs',
})
const size = computed(() => props.padding0
  ? ''
  : `var(--tg-spacing-button-padding-vertical-${props.size}) 
var(--tg-spacing-button-padding-horizontal-${props.size})`)
</script>

<template>
  <button
    :disabled="loading || disabled" :class="[type, bgStyle, { round, shadow }]" :style="{
      padding: size,
    }"
  >
    <div v-if="loading" class="loading">
      <BaseIcon name="chess-frame2" class="ani-roll" />
    </div>
    <div
      v-else
      class="content"
      :style="{ fontSize: fontSize ? `var(--tg-spacing-${fontSize})` : '' }"
    >
      <slot />
    </div>
  </button>
</template>

<style lang="scss">
:root {
  --tg-base-button-style-bg: var(--tg-secondary-main);
  --tg-base-button-style-bg-hover: var(--tg-text-grey);
  --tg-base-button-text-default-color: var(--tg-text-grey-button);
}
</style>

<style lang="scss" scoped>
button {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  border-radius: var(--tg-radius-default);
  font-weight: var(--tg-font-weight-semibold);
  transition: var(--tg-transition);
  line-height: 1;

  .loading {
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
    justify-content: center;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.default {
  background-color: var(--tg-base-button-style-bg);

  &:active:not(:disabled) {
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

  &:active:not(:disabled) {
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
  border: 1px solid var(--tg-text-white);

  &:active:not(:disabled) {
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

  &:active:not(:disabled) {
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

  &:active:not(:disabled) {
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
