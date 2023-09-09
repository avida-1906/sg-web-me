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
const widthBoundaryLg = ref(1200)
// 宽度边界 768
const widthBoundaryMd = ref(768)

const { width } = useWindowSize()

// 左侧是否展开
const leftIsExpand = ref(false)
// home-overlay 是否显示
const homeOverlayIsShow = computed(() => {
  return leftIsExpand.value && width.value < widthBoundaryLg.value
})

// 左侧侧边栏宽度
const leftSidebarWidth = computed(() => {
  return `${leftIsExpand.value ? 240 : 60}px`
})
</script>

<template>
  <main class="wrap">
    <div v-if="homeOverlayIsShow" class="home-overlay" @click="leftIsExpand = !leftIsExpand" />
    <div v-if="width < widthBoundaryLg && width > widthBoundaryMd" class="small-size-padding" />
    <div
      class="left-sidebar"
      :style="{
        '--width': leftSidebarWidth,
      }"
      :class="{
        'fixed-small': width > widthBoundaryMd,
        'fixed': width < widthBoundaryLg,
        'full-screen': width <= widthBoundaryMd,
      }"
    >
      <div>
        <button @click="leftIsExpand = !leftIsExpand">
          切换
        </button>
      </div>
    </div>
    <div class="main-content">
      <header class="navigation">
        <div class="group">
          <div class="container">
            {{ $t('active_day_ago', { days: 10 }) }}
          </div>
          <p>
            真人娱乐场
          </p>
        </div>
      </header>
      <div class="scrollable">
        <RouterView />
      </div>
    </div>
    <div class="right-sidebar">
      右侧
    </div>
  </main>
</template>

<style scoped lang="scss">
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
  // background-color: var(--app-secondary-dark);
  background-color: red;
  transition: width 0.3s ease-in-out, top .2s ease-in-out;
  z-index: var(--tg-z-index-20);
  &.fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
  }
  &.full-screen {
    width: 100%;
    top: var(--tg-header-height);
    padding-bottom: var(--tg-footer-height),
  }
  .fixed-small {
    width: var(--width);
  }
}
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;

  & > .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: black;
    color: white;
    font-weight: 600;

    & > .group {
      width: 100%;
      padding: 0 3vw;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  & > .scrollable {
    flex: 1;
    overflow: auto;
  }
}
</style>
