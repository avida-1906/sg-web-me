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
  width: windowWidth,
  widthBoundarySm,
} = storeToRefs(windowStore)
const { getSuspenseStatus } = useLayoutAnimate({ aniSuspense: true })
const route = useRoute()
const sportsNotify = new SportsNotify(socketClient)
const { mqttIsConnected } = storeToRefs(useAppStore())
const { serviceState } = useService()

// 内容区宽度
const homeContainerRef = ref<HTMLElement>()
const { width } = useElementSize(homeContainerRef)
const { leftIsExpand, isSwitching, switchTo, triggerLeftSidebar } = useLeftSidebar()
const { rightIsExpand, rightContainerIs0, currentRightSidebarContent } = useRightSidebar()

const keepAliveList = ref<string[]>(['KeepAliveCasino', 'KeepAliveIndexHome'])

// home-overlay 是否显示
const homeOverlayIsShow = computed(() => {
  return leftIsExpand.value && isLessThanLg.value && !isMobile.value
})
const rightWidth = computed(() => {
  if (windowWidth.value > widthBoundarySm.value && windowWidth.value < 1000)
    return '320px'

  else if (windowWidth.value >= 1000)
    return '370px'

  else
    return ''
})

useLockScroll(leftIsExpand)

function suspenseResolved() {
  getSuspenseStatus('suspense-resolved')
}

watch(() => width.value, (newWidth) => {
  windowStore.setAppContentWidth(newWidth)
})

// 同时监听 route.path和mqttIsConnected
watch(
  [() => route.path, () => mqttIsConnected.value],
  ([newPath, newMqttIsConnected]) => {
    if (newMqttIsConnected) {
      if (newPath.includes('sports')) {
        sportsNotify.startCountdown()
        if (!sportsNotify.isSubscribed)
          sportsNotify.subscribe()
      }
      else {
        sportsNotify.stopCountdown()
        if (sportsNotify.isSubscribed)
          sportsNotify.unsubscribe()
      }
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  sportsNotify.unsubscribe()
})

onErrorCaptured((err, instance, info) => {
  console.error('发生错误: \n Error', err, '\n', 'Instance: ', instance, '\n', 'Info:', info)
  return false
})
</script>

<template>
  <main
    class="wrap"
    :class="{ 'is-switching': isSwitching, 'not-mobile': !isMobile }"
    :style="{
      '--width': rightWidth,
    }"
  >
    <div v-if="homeOverlayIsShow" class="home-overlay" @click="triggerLeftSidebar" />
    <div class="side-bar-outer">
      <div v-if="isLessThanLg && isGreaterThanSm" class="small-size-padding" />
      <Transition :name="isMobile ? 'casino-sport-fade-top' : 'bigslide-fade-left'">
        <div
          v-if="leftIsExpand || isSwitching" class="big-side left-sidebar" :style="{
            '--width': 'var(--tg-sidebar-width-lg)',
          }" :class="{
            'fixed-small': isGreaterThanSm,
            'fixed': isLessThanLg,
            'full-screen': isMobile,
          }"
        >
          <AppLeftSidebar :is-switching="isSwitching" :switch-to="switchTo" />
        </div>
      </Transition>

      <Transition name="smallslide-fade-left">
        <div
          v-if="!isMobile && (!leftIsExpand || isSwitching)"
          class="left-sidebar small-side"
          :style="{
            '--width': 'var(--tg-sidebar-width-sm)',
          }" :class="{
            'fixed-small': isGreaterThanSm,
            'fixed': isLessThanLg,
            'full-screen': isMobile,
          }"
        >
          <AppLeftSidebarTiny :is-switching="isSwitching" :switch-to="switchTo" />
        </div>
      </Transition>
    </div>

    <div id="TgMainContent" class="main-content" :class="{ 'not-mobile': !isMobile }">
      <header class="navigation">
        <AppContent except>
          <AppHeader />
        </AppContent>
      </header>

      <!-- <Transition name="home-slide-fade"> :key="route.path" -->
      <div
        id="main-content-scrollable"
        class="scroll-y scrollable" :class="[{ 'mobile-bottom': isMobile }]"
      >
        <!-- 用于获取内容区宽度 -->
        <AppContent except>
          <div ref="homeContainerRef" class="only-for-get-width" />
        </AppContent>
        <slot>
          <div>
            <AppContent class="@container">
              <RouterView v-slot="{ Component }">
                <template v-if="Component">
                  <KeepAlive :include="keepAliveList" :max="10">
                    <Suspense timeout="0" @resolve="suspenseResolved">
                      <component :is="Component" :key="route.path" />
                      <template #fallback>
                        <AppLoading full-screen />
                      </template>
                    </Suspense>
                  </KeepAlive>
                </template>
              </RouterView>
            </AppContent>
          </div>
        </slot>

        <footer v-if="route.path === '/casino/games' ? !isMobile : true" class="footer">
          <AppContent except>
            <AppFooter />
          </AppContent>
        </footer>
      </div>
      <!-- </Transition> -->
    </div>
    <Transition :name="isMobile ? 'casino-sport-fade-top' : ''">
      <div
        v-if="rightIsExpand"
        class="right-sidebar"
        :class="{
          'width-none': rightContainerIs0,
          'fixed': isLessThanSm,
          'mobile': isMobile,
        }"
      >
        <div
          :style="{
            width: 'var(--width)',
            height: '100%',
            overflowX: 'hidden',
          }"
        >
          <template
            v-if="
              currentRightSidebarContent === EnumRightSidebarContent.NOTIFICATION
            "
          >
            <AppNotice />
          </template>
          <template
            v-if="
              currentRightSidebarContent === EnumRightSidebarContent.CHATROOM
            "
          >
            <AppChat />
          </template>
          <template
            v-if="
              currentRightSidebarContent === EnumRightSidebarContent.BETTING
            "
          >
            <!-- <AppSportsBetSlipMenu /> -->
            <AppSportRightBet />
          </template>
          <template
            v-if="currentRightSidebarContent === EnumRightSidebarContent.CASINOBET
            "
          >
            <AppCasinoBet />
          </template>
        </div>
      </div>
    </Transition>
    <AppFooterbar v-show="!isGreaterThanSm" />

    <Teleport to="body">
      <AppService v-model="serviceState" />
    </Teleport>
    <AppCookie />
  </main>
</template>

<style scoped lang="scss">
.only-for-get-width {
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
    // padding-bottom: var(--tg-footerbar-height);
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
    color: var(--tg-text-white);
    font-weight: 600;
    padding-right: var(--tg-scrollbar-size);
    box-shadow: var(--tg-header-shadow);
    z-index: var(--tg-z-index-10);
    position: sticky;
    top: 0;

    &>.group {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  .footer {
    width: 100%;
    background-color: var(--tg-text-grey-deep); // var(--tg-secondary-deepdark);
    // #091d2a
  }
  .mobile-bottom{
    padding-bottom: var(--tg-footerbar-height);
  }
}

.right-sidebar {
  background: var(--tg-secondary-dark);
  transition: width 0.3s;
  overflow: hidden;
  z-index: var(--tg-z-index-30);
  width: var(--width);
  filter: drop-shadow(var(--tg-drop-shadow));

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
    padding-bottom: var(--tg-footerbar-height),
  }

  &.mobile {
    width: 100%;
    padding-bottom: var(--tg-footerbar-height);
  }
}
</style>
