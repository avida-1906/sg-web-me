import { acceptHMRUpdate, defineStore } from 'pinia'

export const useWindowStore = defineStore('window', () => {
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
  const { width } = useWindowSize()
  const isFixed = computed(() => width.value < widthBoundaryXl.value)
  const isFixedSmall = computed(() => width.value > widthBoundaryMd.value)
  const isFullScreen = computed(() => width.value <= widthBoundaryMd.value)

  return {
    widthBoundaryXl,
    widthBoundaryMd,
    width,
    isFixed,
    isFixedSmall,
    isFullScreen,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWindowStore, import.meta.hot))
