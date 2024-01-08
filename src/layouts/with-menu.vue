<script lang="ts" setup>
import Home from './home.vue'

const { t } = useI18n()
const router = useLocalRouter()
const route = useRoute()
const { animatingMounted } = useLayoutAnimate({ aniMounted: true })
const { appContentWidth, isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const { bool: isPopShow, setTrue: setPTrue, setFalse: setPFalse } = useBoolean(false)

const path = computed(() => {
  return `/${route.path.split('/').slice(2).join('/')}`
})
const menuData = computed<any>(() =>
  route.meta.withMenuMenu?.map((m, idx) => ({ ...m, title: m.isT ? t(m.title) : m.title, value: idx, label: m.isT ? t(m.title) : m.title }))
    .filter(f => f.token ? isLogin.value : true))
const icon = computed<any>(() => route.meta.withMenuIcon)
const withMenuMobileType = computed(() => route.meta.withMenuMobileType)
const noBg = computed(() => path.value.includes('/vip/')
  || (isMobile.value ? path.value.includes('/affiliate') : false))
const getGapBig = computed(() => {
  return ['/vip/promotion-bonus', '/vip/day-salary'].includes(path.value) && isMobile.value ? '' : 'gap-big'
})

const activeMenu = ref(menuData.value.filter((m: any) => m.path === path.value)[0])
const curMenuTab = ref(activeMenu.value?.value)

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

watch(menuData, (val) => {
  activeMenu.value = val.filter((m: any) => m.path === path.value)[0]
  curMenuTab.value = activeMenu.value?.value
})
watch(route, () => {
  activeMenu.value = menuData.value.filter((m: any) => m.path === path.value)[0]
})
</script>

<template>
  <Home>
    <template #default>
      <div :class="{ 'home-slide-fade-enter-active': animatingMounted }">
        <AppContent>
          <section class="with-menu-container">
            <div
              class="layout-spacing"
              :class="{ 'more-than-800': appContentWidth > 800 }"
            >
              <div>
                <div
                  class="stack x-stretch y-center direction-vertical padding-none"
                  :class="[appContentWidth > 800 ? 'gap-larger' : 'gap-big']"
                >
                  <div class="wrap-flex">
                    <div
                      class="stack y-center padding-none top direction-horizontal"
                      :class="[
                        appContentWidth > 800
                          ? 'x-space-between stretch gap-medium'
                          : 'x-space-between stretch gap-medium',
                      ]"
                    >
                      <div
                        class="stack y-center direction-horizontal title x-flex-start"
                      >
                        <BaseIcon :name="icon" />
                        <span>
                          {{
                            route.meta.withMenuTitle
                              ? $t(route.meta.withMenuTitle) : ''
                          }}
                        </span>
                      </div>
                      <div class="close" @click="goBack">
                        <BaseButton type="text" size="none">
                          <BaseIcon name="uni-close" />
                        </BaseButton>
                      </div>
                    </div>
                  </div>
                  <template
                    v-if="path === '/transactions' || path === '/settings'"
                  >
                    <BaseMenu class="settran" :data="menuData" />
                  </template>
                  <template v-else>
                    <AppUserAgentInfo
                      v-if="isLogin && path.includes('/affiliate/')"
                    />
                    <AppVipInfoBar v-if="isLogin && path.includes('/vip/')" />
                    <div
                      class="stack direction-horizontal padding-none content-outer"
                      :class="[
                        appContentWidth > 800
                          ? 'direction-horizontal x-flex-start y-flex-start gap-larger'
                          : 'direction-vertical x-stretch y-center', getGapBig]"
                    >
                      <div class="left">
                        <template v-if="appContentWidth > 800">
                          <BaseMenu :data="menuData" />
                        </template>
                        <template v-else>
                          <div
                            v-if="withMenuMobileType === 'tabs'"
                            class="menu-tabs"
                            :class="{ 'is-vip': path.includes('/vip/') }"
                          >
                            <BaseTab
                              v-model="curMenuTab"
                              :center="false"
                              :list="menuData"
                              :full="path.includes('/vip/')"
                            />
                          </div>
                          <div
                            v-else
                            class="stack x-flex-start y-center gap-small menu-btn"
                            :class="[appContentWidth > 800
                              ? 'padding-none direction-horizontal'
                              : 'padding-none direction-horizontal']"
                          >
                            <BaseButton size="md" @click="$router.go(-1)">
                              <BaseIcon name="uni-arrow-left" class="arrow-left" />
                            </BaseButton>
                            <VDropdown
                              :distance="10"
                            >
                              <BaseButton size="sm" @click="togglePop">
                                <div class="btn-txt">
                                  <span>{{ activeMenu.title }}</span>
                                  <div class="icon" :class="{ up: isPopShow }">
                                    <BaseIcon
                                      name="uni-arrow-down"
                                    />
                                  </div>
                                </div>
                              </BaseButton>
                              <template #popper="{ hide }">
                                <ul class="pop-menu">
                                  <template v-for="mi in menuData" :key="mi.path">
                                    <li
                                      :class="{ active: activeMenu.path === mi.path }"
                                      @click="goPage(mi, hide)"
                                    >
                                      {{ mi.title }}
                                    </li>
                                  </template>
                                </ul>
                              </template>
                            </VDropdown>
                          </div>
                        </template>
                      </div>
                      <!-- <div
                        v-if="isMobile && $path.includes('/vip/')"
                        class="line"
                      /> -->
                      <div
                        class="right"
                        :class="{ 'is-vip': path.includes('/vip/') }"
                      >
                        <div
                          class="content-container"
                          :class="{
                            'is-vip': path.includes('/vip/'),
                            'no-bg': noBg,
                          }"
                        >
                          <RouterView v-slot="{ Component }">
                            <Suspense timeout="0">
                              <component :is="Component" :key="path" />
                              <template #fallback>
                                <div class="center dialog-loading-height">
                                  <BaseLoading />
                                </div>
                              </template>
                            </Suspense>
                          </RouterView>
                        </div>
                      </div>
                    </div>
                  </template>
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
.line {
  width: 100%;
  border-bottom: var(--tg-spacing-2) solid rgba(255, 255, 255, 0.05);
}
.settran {
  --tg-base-menu-item-active-bg: transparent;
  --tg-base-menu-item-hover-active-bg: transparent;
}
.menu-tabs {
  display: flex;
  // padding-bottom: var(--tg-spacing-8);
  &.is-vip {
    // padding-bottom: 0;
  }
  > div {
    flex: 1;
    width: 0;
  }
}
.pop-menu {
  min-width: 80px;
  padding: var(--tg-spacing-4) 0;
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-main);
  font-weight: var(--tg-font-weight-semibold);
  li {
    cursor: pointer;
    padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
    color: var(--tg-popper-color-default);
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
  .icon {
    // transition: all 200ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .up {
    transform: rotate(180deg);
  }
}

.with-menu-container {
  .layout-spacing {
    padding-bottom: var(--tg-spacing-32);
    .top {
      color: var(--tg-text-white);
      .title {
        font-size: var(--tg-font-size-md);
        font-weight: var(--tg-font-weight-semibold);
        line-height: 1.5;
        padding: 0;
        gap: var(--tg-spacing-8);
      }
      .close {
        cursor: pointer;
        display: flex;
        align-items: center;
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
      align-items: stretch;
      .menu-btn {
        .app-svg-icon.arrow-left {
          font-size: var(--tg-font-size-default);
          --tg-icon-color: var(--tg-text-white);
        }
        --tg-base-button-style-bg: var(--tg-secondary-dark);
        --tg-base-button-style-bg-hover: var(--tg-secondary-deepdark);
      }
      .left {
      }
      .right {
        position: relative;
        border-radius: var(--tg-radius-md);
        overflow: hidden;
        &.is-vip {
          // border-radius: 0;
        }
        &.loading {
          .content-container {
            opacity: 0.3;
          }
        }
        .content-container {
          color: var(--tg-border-color-grey);
          background: var(--tg-secondary-dark);
          padding: var(--tg-spacing-12);
          overflow: hidden;
          position: relative;
          border-radius: var(--tg-radius-md);
          min-height: 100%;
          &.is-vip {
            // border-radius: 0;
          }
          &.no-bg {
            background: initial;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>

<route lang="yaml">
</route>
