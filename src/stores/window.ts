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

  const { width } = useWindowSize()

  // 宽度边界 638 xs
  const widthBoundaryXs = ref(638)
  // 宽度边界 768 sm
  const widthBoundarySm = ref(768)
  // 宽度边界 975 md
  const widthBoundaryMd = ref(975)
  // 宽度边界 1200 lg
  const widthBoundaryLg = ref(1200)
  // 宽度边界 1290 xl
  const widthBoundaryXl = ref(1290)

  const isFixed = computed(() => width.value < widthBoundaryLg.value)
  const isFixedSmall = computed(() => width.value > widthBoundarySm.value)
  const isFullScreen = computed(() => width.value <= widthBoundarySm.value)

  return {
    widthBoundaryLg,
    widthBoundarySm,
    width,
    isFixed,
    isFixedSmall,
    isFullScreen,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWindowStore, import.meta.hot))
