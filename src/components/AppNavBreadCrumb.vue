<script lang="ts" setup>
interface Props {
  breadcrumb: Array<{
    path: string
    title: string
  }>
}

defineProps<Props>()
</script>

<template>
  <div class="app-nav-bread-crumb scroll-x">
    <div class="back">
      <BaseButton size="md">
        <BaseIcon name="uni-arrow-left" class="arrow-left" />
      </BaseButton>
    </div>
    <div class="scroll-x breadcrumb-wrapper remove-end-border">
      <template v-for="bread, idx in breadcrumb" :key="bread.path">
        <a class="link" :class="{ disabled: idx === breadcrumb.length - 1, active: idx === breadcrumb.length - 1 }">
          <span>{{ bread.title }}</span>
        </a>
        <span v-if="idx !== breadcrumb.length - 1" class="slash" />
      </template>
    </div>
    <BaseButton size="md">
      <BaseIcon name="uni-favorites" />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.app-nav-bread-crumb {
  --tg-icon-color: var(--tg-text-white);
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  .back {
    --tg-base-button-style-bg: var(--tg-secondary-dark);
    --tg-base-button-style-bg-hover: var(--tg-secondary-deepdark);
    margin-right: var(--tg-spacing-12);
  }
  .breadcrumb-wrapper {
    padding: var(--tg-spacing-16) var(--tg-spacing-20);
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 44px;
    background: var(--tg-secondary-dark);
    border-radius: var(--tg-radius-default);
    .link {
      position: relative;
      display: inline-flex;
      touch-action: manipulation;
      padding: 0;
      height: auto;
      font-size: var(--tg-font-size-default);
      justify-content: flex-start;
      outline: none;
      box-shadow: none;
      color: var(--tg-text-white);
      background: 0;
      margin: 0 var(--tg-spacing-8);
      font-weight: var(--tg-font-weight-semibold);
      border: none;
      align-items: center;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 0.2s,color 0.2s;
      flex-shrink: 0;
      &.disabled {
        cursor: not-allowed;
        opacity: .5;
      }
      &.active {
        color: var(--tg-text-white);
        background: 0;
      }
    }
    .slash {
      display: inline-flex;
      width: 2px;
      height: 3.2em;
      margin: -0.75rem 1rem;
      background: var(--tg-primary-main);
      transform: skew(-20deg);
    }
  }
  .breadcrumb-wrapper.remove-end-border {
    border-top-right-radius: var(--tg-radius-default);
    border-bottom-right-radius: var(--tg-radius-default);
  }
}
</style>
