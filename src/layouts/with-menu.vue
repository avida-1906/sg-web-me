<script lang="ts" setup>
import Home from './home.vue'

const router = useRouter()
const route = useRoute()

const { appContentWidth } = storeToRefs(useWindowStore())

const layoutLoading = ref(true)

const menuData = computed<any>(() => route.meta.menu)
const icon = computed<any>(() => route.meta.icon)

function goBack() {
  router.push('/casino')
}

onMounted(() => {
  layoutLoading.value = false
})

onUpdated(() => {
  layoutLoading.value = false
})
</script>

<template>
  <Home>
    <template #default>
      <AppContent>
        <section class="with-menu-container">
          <div class="layout-spacing" :class="{ 'more-than-800': appContentWidth > 800 }">
            <div>
              <div class="stack x-stretch y-center direction-vertical gap-larger padding-none">
                <div class="wrap-flex">
                  <div class="stack y-center padding-none top direction-horizontal x-space-between stretch gap-medium">
                    <div class="stack y-center gap-medium padding-none direction-horizontal title x-flex-start">
                      <BaseIcon :name="icon" />
                      <span>{{ route.meta.title }}</span>
                    </div>
                    <div class="close" @click="goBack">
                      <BaseIcon name="uni-close" />
                    </div>
                  </div>
                </div>
                <div class="stack direction-horizontal padding-none content-outer" :class="[appContentWidth > 800 ? 'direction-horizontal x-flex-start y-flex-start gap-larger' : 'direction-vertical x-stretch y-center gap-small']">
                  <div class="left">
                    <template v-if="appContentWidth > 800">
                      <BaseMenu :data="menuData" />
                    </template>
                    <template v-else>
                      <div class="stack x-flex-start y-center padding-none direction-horizontal gap-small menu-btn">
                        <BaseButton size="md">
                          <BaseIcon name="uni-arrow-left" class="arrow-left" />
                        </BaseButton>
                        <BaseButton size="md">
                          <div class="btn-txt">
                            <span>存款</span>
                            <BaseIcon name="uni-arrow-down" />
                          </div>
                        </BaseButton>
                      </div>
                    </template>
                  </div>
                  <div class="right" :class="{ loading: layoutLoading }">
                    <div v-if="layoutLoading" class="layout-loading">
                      <BaseLoading />
                    </div>
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
.layout-loading {
  position: absolute;
  inset: 0 0 0 0;
  background: #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)};
  z-index: var(--tg-z-index-10);
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrap-flex {
  width: 100%;
  display: grid;
  place-items: flex-start;
  padding-top: var(--tg-spacing-24);
}
.menu-btn {
  .app-svg-icon.arrow-left {
    font-size: var(--tg-font-size-default);
    transform: scale(0.8);
  }
}
.btn-txt {
  display: inline-flex;
  align-items: center;
  position: relative;
  gap: var(--tg-spacing-8);
  font-size: var(--tg-font-size-default);
  .app-svg-icon {
    font-size: var(--tg-font-size-xs);
  }
}

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
        cursor: pointer;
        .app-svg-icon {
          font-size: var(--tg-font-size-default);
        }
      }
    }
    &.more-than-800 {
      .content-outer {
        grid-template-columns: auto 1fr;
      }
    }
    .content-outer {
      .right {
        position: relative;
        border-radius: var(--tg-radius-md);
        overflow: hidden;
        &.loading {
          .content-container {
            opacity: 0.3;
          }
        }
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
