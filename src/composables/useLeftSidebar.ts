export const useLeftSidebar = createGlobalState(() => {
  let initExpand = false
  if (window.innerWidth <= 768)
    initExpand = !!Local.get<boolean>(STORAGE_MENU_LEFT_EXPAND)?.value

  const leftIsExpand = useDebouncedRef({ value: window.innerWidth >= 1200 ? true : initExpand, delay: 100, beforeTrigger, afterTrigger })
  const { bool: isSwitching, setTrue, setFalse } = useBoolean(false)
  const switchTo = ref<'big' | 'small' | ''>('')
  const after = ref()
  /** 导航排序 */
  const navButtons = ref<{ title: string }[]>([
    { title: 'casino' },
    { title: 'sports' },
  ])
  // useRequest(ApiMemberGameCateIndex, {
  //   manual: false,
  //   onSuccess(res) {
  //     navButtons.value = res.map((a) => {
  //       return {
  //         ...a,
  //         title: a.id === '1'
  //           ? 'casino'
  //           : a.id === '2' ? 'sports' : '_',
  //       }
  //     })
  //   },
  // })

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
    after.value = undefined
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
