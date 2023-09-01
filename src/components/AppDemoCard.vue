<script lang="ts" setup>
interface Props {
  title: string
}

withDefaults(defineProps<Props>(), {})

const showContent = ref(true)

function toggle() {
  showContent.value = !showContent.value
}
</script>

<template>
  <section class="app-demo-card">
    <div class="app-demo-card-head">
      <slot name="title">
        <h3>
          {{ title }}
        </h3>
      </slot>
      <div class="icon-box" :class="[showContent ? 'down' : 'left']" @click="toggle">
        <AppIcon name="uni-arrow-down" />
      </div>
    </div>
    <div v-show="showContent" class="app-demo-card-content">
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
:root {
    --app-demo-card-head-bg: var(--tg-secondary-dark);
    --app-demo-card-content-bg: var(--tg-primary-main);
}
</style>

<style lang="scss" scoped>
.app-demo-card {
  border-radius: 4px;
  overflow: hidden;
  background: var(--app-primary-main);
  box-shadow: 0px 1px 2px 1px rgba(black, 0.25);
  &-head {
    height: 45px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background: var(--app-demo-card-head-bg);
    h3 {
      line-height: 22px;
      padding: 0;
      margin: 0;
      color: white;
      font-size: 14px;
      font-weight: 600;
    }
    .icon-box {
      line-height: 1;
      display: flex;
      > svg {
        transition: all 300ms linear;
      }
      &.left {
        svg {
          transform: rotate(90deg);
        }
      }
    }
  }
  &-content {
    padding: 12px 8px;
    background: var(--app-demo-card-content-bg);
  }
}
</style>
