import { acceptHMRUpdate, defineStore } from 'pinia'

export const useWindowStore = defineStore('window', () => {
  const { width, height: windowHeight } = useWindowSize()

  /** 内容区域宽度 */
  const appContentWidth = ref(0)

  /** 宽度边界 638 xs */
  const widthBoundaryXs = ref(638)
  /** 宽度边界 768 sm */
  const widthBoundarySm = ref(768)
  /** 宽度边界 975 md */
  const widthBoundaryMd = ref(975)
  /** 宽度边界 1200 lg */
  const widthBoundaryLg = ref(1200)
  /** 宽度边界 1290 xl */
  const widthBoundaryXl = ref(1290)

  const isXs = computed(() => width.value < widthBoundaryXs.value)
  const isSm = computed(() => width.value < widthBoundarySm.value && width.value >= widthBoundaryXs.value)
  const isMd = computed(() => width.value < widthBoundaryMd.value && width.value >= widthBoundarySm.value)
  const isLg = computed(() => width.value < widthBoundaryLg.value && width.value >= widthBoundaryMd.value)
  const isXl = computed(() => width.value < widthBoundaryXl.value && width.value >= widthBoundaryLg.value)

  const isLessThanXs = computed(() => width.value < widthBoundaryXs.value)
  const isLessThanSm = computed(() => width.value < widthBoundarySm.value)
  const isLessThanMd = computed(() => width.value < widthBoundaryMd.value)
  const isLessThanLg = computed(() => width.value < widthBoundaryLg.value) // isFixed
  const isLessThanXl = computed(() => width.value < widthBoundaryXl.value)

  const isGreaterThanXs = computed(() => width.value > widthBoundaryXs.value)
  const isGreaterThanSm = computed(() => width.value > widthBoundarySm.value) // isFixedSmall
  const isGreaterThanMd = computed(() => width.value > widthBoundaryMd.value)
  const isGreaterThanLg = computed(() => width.value > widthBoundaryLg.value)
  const isGreaterThanXl = computed(() => width.value > widthBoundaryXl.value)

  const isMobile = computed(() => width.value <= widthBoundarySm.value) // isFullScreen

  const setAppContentWidth = (width: number) => {
    appContentWidth.value = width
  }

  return {
    widthBoundaryXs,
    widthBoundarySm,
    widthBoundaryMd,
    widthBoundaryLg,
    widthBoundaryXl,
    width,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isLessThanXs,
    isLessThanSm,
    isLessThanMd,
    isLessThanLg,
    isLessThanXl,
    isGreaterThanXs,
    isGreaterThanSm,
    isGreaterThanMd,
    isGreaterThanLg,
    isGreaterThanXl,
    isMobile,
    appContentWidth,
    windowHeight,
    setAppContentWidth,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWindowStore, import.meta.hot))
