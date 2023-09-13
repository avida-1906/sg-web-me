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

// 宽度边界 1200
const widthBoundaryXl = ref(1200)
// 宽度边界 768
const widthBoundaryMd = ref(768)
// 左侧是否展开
// const leftIsExpand = ref(false)
const leftIsExpand = useDebouncedRef({ value: false, delay: 300, beforeTrigger, afterTrigger })
const isSwitching = ref(false)

function beforeTrigger() {
  isSwitching.value = true
}
function afterTrigger() {
  isSwitching.value = false
}
// 右侧是否展开
const rightIsExpand = ref(false)
const rightContainerIs0 = ref(true)
const rightSidebar = ref<HTMLElement | null>(null)

const { width } = useWindowSize()
const isFixedSmall = computed(() => width.value > widthBoundaryMd.value)
const isFixed = computed(() => width.value < widthBoundaryXl.value)
const isFullScreen = computed(() => width.value <= widthBoundaryMd.value)
// 左侧侧边栏宽度
const leftSidebarWidth = computed(() => {
  return `${leftIsExpand.value ? 240 : 60}px`
})

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
  <main class="wrap">
    <div v-if="homeOverlayIsShow" class="home-overlay" @click="leftIsExpand = !leftIsExpand" />
    <div v-if="width < widthBoundaryXl && width > widthBoundaryMd" class="small-size-padding" />
    <Transition name="bigslide-fade-left">
      <div
        v-if="leftIsExpand || isFullScreen || isSwitching"
        class="left-sidebar" :style="{
          '--width': '240px',
        }" :class="{
          'fixed-small': isFixedSmall,
          'fixed': isFixed,
          'full-screen': isFullScreen,
        }"
      >
        <AppLeftSidebar
          v-model="leftIsExpand" :is-fixed-small="isFixedSmall" :is-fixed="isFixed"
          :is-full-screen="isFullScreen" :is-switching="isSwitching"
        />
      </div>
    </Transition>
    <Transition name="smallslide-fade-left">
      <div
        v-if="(!leftIsExpand && !isFullScreen) || isSwitching"
        class="left-sidebar small-side" :style="{
          '--width': '60px',
        }" :class="{
          'fixed-small': isFixedSmall,
          'fixed': isFixed,
          'full-screen': isFullScreen,
        }"
      >
        <AppLeftSidebarTiny
          v-model="leftIsExpand" :is-fixed-small="isFixedSmall" :is-fixed="isFixed"
          :is-full-screen="isFullScreen" :is-switching="isSwitching"
        />
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
        <div>
          <RouterView />
          <span style="color: red;font-size: 28px;">{{ isSwitching }}</span>
        </div>
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

<style>
:root {
  --tg-sidebar-width-lg: 240px;
  --tg-sidebar-width-sm: 60px;
}
</style>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.smallslide-fade-left-enter-active {
  // animation: smallslide-fade-left-in 0.3s ease-in-out;
  opacity: 0;
  margin-left: -60px;
  transition: all 0.3s linear;
}
.smallslide-fade-left-leave-active {
  // animation: smallslide-fade-left-out 0.01s ease-in-out;
  opacity: 0;
  margin-left: -60px;
  position: relative;
  z-index: -2;
}

@keyframes smallslide-fade-left-in {
  0% {
    // margin-left: 0px;
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    // margin-left: 0;
    opacity: 1;
  }
}

@keyframes smallslide-fade-left-out {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -60px;
  }
}

.bigslide-fade-left-enter-active {
  animation: bigslide-fade-left-in 0.3s linear;
}
.bigslide-fade-left-leave-active {
  animation: bigslide-fade-left-out 0.3s linear;
  margin-left: -60px;
}
@keyframes bigslide-fade-left-out {
  0% {
    // transform: translateX(0);
    margin-left: -60px;
  }
  20% {
    // transform: translateX(-120px);
    margin-left: -180px;
  }
  100% {
    // transform: translateX(-240px);
    margin-left: -240px;
  }
}
@keyframes bigslide-fade-left-in {
  0% {
    // transform: translateX(0);
    margin-left: -240px;
  }
  50% {
    // transform: translateX(-120px);
    margin-left: -180px;
  }
  100% {
    // transform: translateX(-240px);
    margin-left: 0;
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
  // --tg-text-black,使用scss将变量透明度设置为0.5
  background-color: var(--tg-black-0-5);
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
