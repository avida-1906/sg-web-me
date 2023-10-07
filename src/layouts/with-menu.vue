<script lang="ts" setup>
import Home from './home.vue'

const router = useRouter()
const route = useRoute()
const { animatingMounted } = useLayoutAnimate({ aniMounted: true })

const { appContentWidth } = storeToRefs(useWindowStore())

const { bool: layoutLoading, setFalse: setLFalse } = useBoolean(true)

const menuData = computed<any>(() => route.meta.withMenuMenu)
const icon = computed<any>(() => route.meta.withMenuIcon)

const activeMenu = ref(menuData.value.filter((m: any) => m.path === route.path)[0])
const { bool: isPopShow, setTrue: setPTrue, setFalse: setPFalse } = useBoolean(false)

function togglePop() {
  if (isPopShow.value)
    setPFalse()
  else
    setPTrue()
}

function goBack() {
  router.push('/casino')
}

function goPage(item: any, hide: any) {
  if (item.path) {
    activeMenu.value = item
    router.push(item.path)
  }
  hide && hide()
  setPFalse()
}

onMounted(() => {
  setLFalse()
})

onUpdated(() => {
  setLFalse()
})

watch(route, (val) => {
  activeMenu.value = menuData.value.filter((m: any) => m.path === val.path)[0]
})
</script>

<template>
  <Home>
    <template #default>
      <div :class="{ 'home-slide-fade-enter-active': animatingMounted }">
        <AppContent>
          <section class="with-menu-container">
            <div class="layout-spacing" :class="{ 'more-than-800': appContentWidth > 800 }">
              <div>
                <div class="stack x-stretch y-center direction-vertical gap-larger padding-none">
                  <div class="wrap-flex">
                    <div class="stack y-center padding-none top direction-horizontal x-space-between stretch gap-medium">
                      <div class="stack y-center gap-medium padding-none direction-horizontal title x-flex-start">
                        <BaseIcon :name="icon" />
                        <span>{{ $t(route.meta.withMenuTitle as string) }}</span>
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
                          <BaseButton size="md" @click="$router.go(-1)">
                            <BaseIcon name="uni-arrow-left" class="arrow-left" />
                          </BaseButton>
                          <VDropdown
                            :distance="10"
                          >
                            <BaseButton size="md" @click="togglePop">
                              <div class="btn-txt">
                                <span>{{ activeMenu.title }}</span>
                                <BaseIcon :name="isPopShow ? 'uni-arrow-up' : 'uni-arrow-down'" />
                              </div>
                            </BaseButton>
                            <template #popper="{ hide }">
                              <ul class="pop-menu">
                                <li v-for="mi in menuData" :key="mi.path" :class="{ active: activeMenu.path === mi.path }" @click="goPage(mi, hide)">
                                  {{ mi.title }}
                                </li>
                              </ul>
                            </template>
                          </VDropdown>
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
      </div>
    </template>
  </Home>
</template>

<style lang="scss" scoped>
.pop-menu {
  padding: var(--tg-spacing-4) 0;
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-main);
  font-weight: var(--tg-font-weight-semibold);
  li {
    cursor: pointer;
    padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
    &:hover {
      background-color: var(--tg-text-grey-light);
      color: var(--tg-primary-main);
    }
    &.active {
      color: var(--tg-text-blue);
    }
  }
}
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
      color: var(--tg-text-white);
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

      .menu-btn {
        .app-svg-icon.arrow-left {
          font-size: var(--tg-font-size-default);
          transform: scale(0.7);
          --tg-icon-color: var(--tg-text-white);
        }
        .app-svg-icon {
          transform: scale(0.85);
        }
        --tg-base-button-style-bg: var(--tg-secondary-dark);
        --tg-base-button-style-bg-hover: var(--tg-secondary-deepdark);
      }
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

<route lang="yaml">
</route>
