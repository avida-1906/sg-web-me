<script lang="ts" setup>
/**
 * 左侧缩小版 Slider
      固定宽度 >768 显示
      <768 直接隐藏
    左侧放大版 Slider
      <768 全屏显示，高度-header高度和footer高度
      固定宽度 768-1200 显示(定位+蒙层)
      1200以上显示在左侧

    右侧 Slider
      < 768 全屏 - footer高度
      768-1000 显示 320
      1000 以上显示 370

        包含聊天室
        投注单
 */
const windowStore = useWindowStore()
const {
  isLessThanSm,
  isLessThanLg,
  isGreaterThanSm,
  isMobile,
} = storeToRefs(windowStore)
// 内容区宽度
const homeContainerRef = ref<HTMLElement | null>(null)
const { width } = useElementSize(homeContainerRef)
const route = useRoute()
const { leftIsExpand, isSwitching, switchTo } = useLeftSidebar()
const { rightIsExpand, setRightSidebarExpandStatus, rightContainerIs0 } = useRightSidebar()

// 是否游戏页面
const isCasinoGames = computed(() => route.name === 'casino-games')

// home-overlay 是否显示
const homeOverlayIsShow = computed(() => {
  return leftIsExpand.value && isLessThanLg.value && !isMobile.value
})

watch(() => width.value, (newWidth) => {
  windowStore.setAppContentWidth(newWidth)
})
</script>

<template>
  <main class="wrap" :class="{ 'is-switching': isSwitching, 'not-mobile': !isMobile }">
    <div v-if="homeOverlayIsShow" class="home-overlay" @click="leftIsExpand = !leftIsExpand" />
    <div class="side-bar-outer">
      <div v-if="isLessThanLg && isGreaterThanSm" class="small-size-padding" />
      <Transition :name="isMobile ? 'bigslide-fade-top' : 'bigslide-fade-left'">
        <div
          v-if="leftIsExpand || isSwitching"
          class="big-side left-sidebar" :style="{
            '--width': 'var(--tg-sidebar-width-lg)',
          }" :class="{
            'fixed-small': isGreaterThanSm,
            'fixed': isLessThanLg,
            'full-screen': isMobile,
          }"
        >
          <AppLeftSidebar v-model="leftIsExpand" :is-switching="isSwitching" :switch-to="switchTo" />
        </div>
      </Transition>

      <Transition name="smallslide-fade-left">
        <div
          v-if="!isMobile && (!leftIsExpand || isSwitching)"
          class="left-sidebar small-side" :style="{
            '--width': 'var(--tg-sidebar-width-sm)',
          }" :class="{
            'fixed-small': isGreaterThanSm,
            'fixed': isLessThanLg,
            'full-screen': isMobile,
          }"
        >
          <AppLeftSidebarTiny v-model="leftIsExpand" :is-switching="isSwitching" :switch-to="switchTo" />
        </div>
      </Transition>
    </div>

    <div class="main-content" :class="{ 'not-mobile': !isMobile }">
      <header class="navigation">
        <AppContent>
          <AppHeader />
        </AppContent>
      </header>

      <div id="main-content-scrollable" class="scroll-y scrollable">
        <!-- 用于获取内容区宽度 -->
        <AppContent>
          <div ref="homeContainerRef" class="only-for-get-width" />
        </AppContent>
        <!-- 主页面 -->
        <BaseButton @click="setRightSidebarExpandStatus">
          聊天室
        </BaseButton>
        <slot>
          <AppContent :is-game-page="isCasinoGames">
            <RouterView v-slot="{ Component }">
              <template v-if="Component">
                <Suspense timeout="0">
                  <component :is="Component" />
                  <template #fallback>
                    <div class="center loading-content-height">
                      <BaseLoading />
                    </div>
                  </template>
                </Suspense>
              </template>
            </RouterView>
          </AppContent>
        </slot>

        <footer class="footer">
          <AppContent>
            <AppFooter />
          </AppContent>
        </footer>
      </div>
    </div>
    <div
      v-if="rightIsExpand" class="right-sidebar" :class="{
        'width-none': rightContainerIs0,
        'fixed': isLessThanSm,
      }"
    >
      右侧 {{ rightIsExpand }}
      <button @click="setRightSidebarExpandStatus()">
        关闭
      </button>
    </div>
    <AppFooterbar v-show="!isGreaterThanSm" />
  </main>
</template>

<style scoped lang="scss">
.loading-content-height {
  height: calc(100vh - var(--tg-header-height));
}

@media screen and (max-width: 767px) {
  .loading-content-height {
    height: calc(100vh - var(--tg-header-height) - var(--tg-footerbar-height));
  }
}
.only-for-get-width{
  width: 100%;
  position: relative;
  top: var(--tg-header-height-n);
}
.wrap {

  .side-bar-outer {
    position: relative;
    display: flex;
    flex-direction: row;
  }
  .left-sidebar.big-side {
    position: relative;
    z-index: var(--tg-z-index-30);
    will-change: margin-left;
  }
  .left-sidebar.small-side {
    position: relative;
    z-index: var(--tg-z-index-20);
    will-change: margin-left;
  }
  &.is-switching {

    .left-sidebar.small-side {
      margin-left: var(--tg-sidebar-width-sm-n);
    }
  }
}
.wrap {
  width: 100%;
  height: 100%;
  &.not-mobile {
    display: flex;
    overflow: hidden;
  }
}

.home-overlay {
  position: fixed;
  inset: 0;
  background-color: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.7)};
  z-index: var(--tg-z-index-20);
}

.small-size-padding {
  width: 60px;
}

.left-sidebar {
  width: var(--width);
  background-color: var(--tg-secondary-dark);
  // transition: width 0.3s ease-in-out, top .2s ease-in-out;
  z-index: var(--tg-z-index-20);
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: margin-left;

  &.fixed {
    position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
  }

  &.full-screen {
    // H5模式
    width: 100%;
    top: var(--tg-header-height);
    padding-bottom: var(--tg-footer-height);
    height: calc(100% - var(--tg-header-height) - var(--tg-footerbar-height));
  }

  &.fixed-small {
    width: var(--width);
  }
}

.main-content {
  &.not-mobile {
    overflow: hidden;
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &>.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: var(--tg-primary-main);
    color: white;
    font-weight: 600;
    padding-right: var(--tg-scrollbar-size);
    box-shadow: #0003 0 4px 6px -1px, #0000001f 0 2px 4px -1px;
    z-index: var(--tg-z-index-10);
    position: sticky;
    top: 0;

    &>.group {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  .footer{
    width: 100%;
    background-color: var(--tg-secondary-deepdark);
    // #091d2a
  }
}

.right-sidebar {
  background-color: green;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  z-index: var(--tg-z-index-30);

  &.width-none {
    width: 0;
  }

  &.fixed {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: var(--tg-z-index-30);
  }

  &.full-screen {
    width: 100%;
    top: var(--tg-header-height);
    padding-bottom: var(--tg-footer-height),
  }

  // 768-1000 显示 320
  // 1000 以上显示 370
  @media screen and (min-width: 768px) and (max-width: 1000px) {
    width: 320px;
  }

  @media screen and (min-width: 1000px) {
    width: 370px;
  }

}
</style>
