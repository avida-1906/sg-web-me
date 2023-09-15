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
const {
  widthBoundaryXl,
  widthBoundaryMd,
  width,
  isFixed,
  isFixedSmall,
  isFullScreen,
} = storeToRefs(useWindowStore())

// 左侧是否展开
// const leftIsExpand = ref(false)
const leftIsExpand = useDebouncedRef({ value: false, delay: 200, beforeTrigger, afterTrigger })
const isSwitching = ref(false)
const switchTo = ref<'big' | 'small' | ''>('')

function beforeTrigger(expand_cur: boolean) {
  isSwitching.value = true
  if (expand_cur)
    switchTo.value = 'small'
  else
    switchTo.value = 'big'
}
function afterTrigger() {
  isSwitching.value = false
  switchTo.value = ''
}
// 右侧是否展开
const rightIsExpand = ref(false)
const rightContainerIs0 = ref(true)
const rightSidebar = ref<HTMLElement | null>(null)

// 左侧侧边栏宽度
// const leftSidebarWidth = computed(() => {
//   return `${leftIsExpand.value ? 240 : 60}px`
// })

// home-overlay 是否显示
const homeOverlayIsShow = computed(() => {
  return leftIsExpand.value && width.value < widthBoundaryXl.value
})

function setRightSidebarExpandStatus() {
  // if (status !== undefined) {
  //   rightIsExpand.value = status
  //   return
  // }
  if (!rightIsExpand.value) {
    rightIsExpand.value = true
    setTimeout(() => {
      rightContainerIs0.value = false
    }, 30)
  }
  else {
    rightContainerIs0.value = true
    setTimeout(() => {
      rightIsExpand.value = false
    }, 300)
  }
}
</script>

<template>
  <main class="wrap" :class="{ 'is-switching': isSwitching }">
    <div v-if="homeOverlayIsShow" class="home-overlay" @click="leftIsExpand = !leftIsExpand" />
    <div v-if="width < widthBoundaryXl && width > widthBoundaryMd" class="small-size-padding" />
    <AppFooterbar v-show="!isFixedSmall" />
    <Transition name="bigslide-fade-left">
      <div
        v-if="leftIsExpand || isSwitching"
        class="left-sidebar" :style="{
          '--width': 'var(--tg-sidebar-width-lg)',
        }" :class="{
          'fixed-small': isFixedSmall,
          'fixed': isFixed,
          'full-screen': isFullScreen,
        }"
      >
        <AppLeftSidebar v-model="leftIsExpand" :is-switching="isSwitching" :switch-to="switchTo" />
      </div>
    </Transition>
    <Transition name="smallslide-fade-left">
      <div
        v-if="!isFullScreen && (!leftIsExpand || isSwitching)"
        class="left-sidebar small-side" :style="{
          '--width': 'var(--tg-sidebar-width-sm)',
        }" :class="{
          'fixed-small': isFixedSmall,
          'fixed': isFixed,
          'full-screen': isFullScreen,
        }"
      >
        <AppLeftSidebarTiny v-model="leftIsExpand" :is-switching="isSwitching" :switch-to="switchTo" />
      </div>
    </Transition>

    <div class="main-content">
      <header class="navigation">
        <AppContent>
          <AppHeader />
          <!-- <div class="group">
            <div class="container">
              {{ $t('active_day_ago', { days: 10 }) }}
            </div>
            <p>
              真人娱乐场
            </p>
            <button @click="setRightSidebarExpandStatus()">
              聊天室
            </button>
          </div> -->
        </AppContent>
      </header>
      <div class="scroll-y scrollable">
        <RouterView />
        <footer class="footer">
          <AppContent>
            <AppFooter />
          </AppContent>
        </footer>
      </div>
    </div>
    <div
      v-if="rightIsExpand" ref="rightSidebar" class="right-sidebar" :class="{
        'width-none': rightContainerIs0,
        'fixed': width < widthBoundaryMd,
        'display-none': width < widthBoundaryMd,
      }"
    >
      右侧 {{ rightIsExpand }}
      <button @click="setRightSidebarExpandStatus()">
        关闭
      </button>
    </div>
  </main>
</template>

<style scoped lang="scss">
.wrap.is-switching {
  .left-sidebar.small-side {
    position: fixed;
    z-index: -2;
  }
}
.wrap {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.home-overlay {
  position: fixed;
  inset: 0;
  background-color: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.7)};
  z-index: var(--tg-z-index-10);
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
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
  }

  &.full-screen {
    // H5模式
    width: 100%;
    top: var(--tg-header-height);
    padding-bottom: var(--tg-footer-height);
    height: calc(100% - var(--tg-header-height));
  }

  &.fixed-small {
    width: var(--width);
  }
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;

  &>.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: black;
    color: white;
    font-weight: 600;
    padding-right: var(--tg-scrollbar-size);

    &>.group {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  &>.footer{
    background-color: var(--tg-secondary-dark);
  }
}

.right-sidebar {
  background-color: green;
  transition: width 0.3s ease-in-out;
  overflow: hidden;

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
