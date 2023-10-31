export const useLeftSidebar = createGlobalState(() => {
  const leftIsExpand = useDebouncedRef({ value: window.innerWidth >= 1200, delay: 100, beforeTrigger, afterTrigger })
  const { bool: isSwitching, setTrue, setFalse } = useBoolean(false)
  const switchTo = ref<'big' | 'small' | ''>('')

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
  }
  function openLeftSidebar() {
    leftIsExpand.value = true
  }
  function closeLeftSidebar() {
    leftIsExpand.value = false
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
  }
})
