export const useLeftSidebar = createGlobalState(() => {
  const leftIsExpand = useDebouncedRef({ value: window.innerWidth >= 1200, delay: 100, beforeTrigger, afterTrigger })
  const { bool: isSwitching, setTrue, setFalse } = useBoolean(false)
  const switchTo = ref<'big' | 'small' | ''>('')
  const after = ref()
  /** 导航排序 */
  const navButtons = ref<{ title: string }[]>([])
  useRequest(ApiMemberGameCateIndex, {
    manual: false,
    onSuccess(res) {
      navButtons.value = res.map((a) => {
        return {
          ...a,
          title: +a.id === 2
            ? 'casino'
            : +a.id === 3 ? 'sports' : '_',
        }
      })
    },
  })

  function beforeTrigger(expand_cur: boolean) {
    setTrue()
    if (expand_cur)
      switchTo.value = 'small'
    else
      switchTo.value = 'big'
  }
  function afterTrigger() {
    setFalse()
    switchTo.value = ''
    after.value && after.value()
  }
  function openLeftSidebar() {
    leftIsExpand.value = true
  }
  function closeLeftSidebar(fn?: () => void) {
    leftIsExpand.value = false
    after.value = fn
  }
  function triggerLeftSidebar() {
    leftIsExpand.value = !leftIsExpand.value
  }

  return {
    leftIsExpand,
    isSwitching,
    switchTo,
    openLeftSidebar,
    closeLeftSidebar,
    triggerLeftSidebar,
    navButtons,
  }
})
