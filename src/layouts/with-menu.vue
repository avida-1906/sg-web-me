<script lang="ts" setup>
import Home from './home.vue'

const route = useRoute()

const menuData = computed<any>(() => route.meta.menu)
const icon = computed<any>(() => route.meta.icon)
</script>

<template>
  <Home>
    <template #default>
      <section class="with-menu-container">
        <div class="layout-spacing">
          <div class="top">
            <div>
              <BaseIcon :name="icon" />
              <span>{{ route.meta.title }}</span>
            </div>
            <div>
              <BaseIcon name="uni-close" />
            </div>
          </div>
          <div class="stack x-flex-start y-flex-start direction-horizontal content-outer gap-larger padding-none">
            <div class="left">
              <BaseMenu :data="menuData" />
            </div>
            <div class="right">
              <div class="content-container">
                <RouterView />
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </Home>
</template>

<style lang="scss" scoped>
.stack {
  display: grid;

  grid-template-columns: auto 1fr;
  position: relative;

  &.direction-horizontal {
    grid-auto-flow: column;
  }
  &.x-flex-start {
    justify-content: flex-start;
  }
  &.y-flex-start {
    align-items: flex-start;
  }
  &.gap-larger {
    gap: var(--tg-spacing-24);
  }
  &.padding-none {
    padding: 0;
  }
}
.with-menu-container {
  .layout-spacing {
    .content-outer {
      .right {
        .content-container {
          color: var(--tg-border-color-grey);
          background: var(--tg-secondary-dark);
          padding: var(--tg-spacing-24);
          overflow: hidden;
          position: relative;
          border-radius: var(--tg-radius-md);
        }
      }
    }
  }
}
</style>
