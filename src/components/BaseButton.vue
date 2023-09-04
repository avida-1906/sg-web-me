<script setup lang="ts">
interface Props {
  round?: boolean
  type?: 'default' | 'text' | 'line' | 'round-line-left' | 'round-line-right'
  bgStyle?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'xs',
})
</script>

<template>
  <button
    :disabled="loading || disabled" :class="[type, bgStyle, { round }]"
    :style="{
      padding: `var(--tg-spacing-button-padding-vertical-${size}) var(--tg-spacing-button-padding-horizontal-${size})`,
    }"
  >
    <div v-if="loading">
      loading...
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
  font-weight: 600;
  .content{
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
  &:active {
    .content {
      transform: scale(0.9);
    }
  }
  &:disabled{
    .content {
      transform: scale(1);
    }
  }
}

.text {
  font-size: var(--tg-font-size-xl);
  color: var(--tg-text-grey-button);

  &:active {
    color: var(--tg-text-white);
  }

  &:disabled {
    color: var(--tg-text-grey-button);
  }
}
.line{
  border: 1px solid var(--tg-text-white);

  &:active {
    color: var(--tg-text-dark);
    background-color: var(--tg-text-white);
  }
}
.round-line-left{
  border:1px solid var(--tg-secondary-light);
  border-radius: 100px 0 0 100px;
}
.round-line-right{
  border:1px solid var(--tg-secondary-light);
  border-radius: 0 100px 100px 0;
}

.round {
  border-radius: 100px;
}
.primary{
  background-color: var(--tg-text-blue);
}
.secondary{
  background-color: var(--tg-text-green);
  color: var(--tg-text-dark);
}
</style>
