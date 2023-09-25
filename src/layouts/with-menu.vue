<script lang="ts" setup>
import Home from './home.vue'

const route = useRoute()

const menuData = computed<any>(() => route.meta.menu)
const icon = computed<any>(() => route.meta.icon)
</script>

<template>
  <Home>
    <template #default>
      <AppContent>
        <section class="with-menu-container">
          <div class="layout-spacing">
            <div>
              <div class="stack x-stretch y-center direction-vertical gap-larger padding-none">
                <div class="wrap-flex">
                  <div class="stack y-center padding-none top direction-horizontal x-space-between stretch gap-medium">
                    <div class="stack y-center gap-medium padding-none direction-horizontal title x-flex-start">
                      <BaseIcon :name="icon" />
                      <span>{{ route.meta.title }}</span>
                    </div>
                    <div class="close">
                      <BaseIcon name="uni-close" />
                    </div>
                  </div>
                </div>
                <div class="stack x-flex-start direction-horizontal gap-larger padding-none y-flex-start content-outer" style="grid-template-columns: auto 1fr;">
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
            </div>
          </div>
        </section>
      </AppContent>
    </template>
  </Home>
</template>

<style lang="scss" scoped>
.wrap-flex {
  width: 100%;
  display: grid;
  place-items: flex-start;
  padding-top: var(--tg-spacing-24);
}
  // grid-template-columns: auto 1fr;

.with-menu-container {
  .layout-spacing {
    .top {
      .title {
        font-size: var(--tg-font-size-base);
        font-weight: var(--tg-font-weight-normal);
        .app-svg-icon {
          font-size: var(--tg-font-size-md);
        }
      }
      .close {
        .app-svg-icon {
          font-size: var(--tg-font-size-default);
        }
      }
    }
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
