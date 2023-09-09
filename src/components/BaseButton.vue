<script setup lang="ts">
interface Props {
  round?: boolean
  type?: 'default' | 'text' | 'line' | 'round-line-left' | 'round-line-right'
  bgStyle?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'xs',
})
</script>

<template>
  <button
    :disabled="loading || disabled" :class="[type, bgStyle, { round, shadow }]" :style="{
      padding: `var(--tg-spacing-button-padding-vertical-${size}) var(--tg-spacing-button-padding-horizontal-${size})`,
    }"
  >
    <div v-if="loading" class="loading">
      <BaseIcon name="chess-frame2" class="ani-roll" />
    </div>
    <div v-else class="content">
      <slot />
    </div>
  </button>
</template>

<style lang="scss" scoped>
button {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  border-radius: var(--tg-radius-default);
  font-weight: var(--tg-font-weight-semibold);
  transition: all ease .25s;

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:var(--tg-font-size-base);
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
  background-color: var(--tg-secondary-main);

  &:active:not(:disabled) {
    .content {
      transform: scale(0.9);
    }
  }

  &:hover:not(:disabled) {
    background-color: var(--tg-text-grey);
  }
}

.text {
  font-size: var(--tg-font-size-xl);
  color: var(--tg-text-grey-button);

  &:active:not(:disabled) {
    color: var(--tg-text-white);

    .content {
      transform: scale(0.9);
    }
  }

  &:hover:not(:disabled) {
    color: var(--tg-text-white);
  }
}

.line {
  border: 1px solid var(--tg-text-white);

  &:active:not(:disabled) {
    color: var(--tg-text-dark);
    background-color: var(--tg-text-white);
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
      transform: scale(0.95);
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
      transform: scale(0.95);
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
  background-color: var(--tg-text-blue);

  &:hover:not(:disabled) {
    background-color: var(--tg-sub-deepblue);
  }
}

.secondary {
  background-color: var(--tg-text-green);
  color: var(--tg-text-dark);

  &:hover:not(:disabled) {
    background-color: var(--tg-primary-success);
  }
}
</style>
