export const useLeftSidebar = createGlobalState(() => {
  const leftIsExpand = useDebouncedRef({ value: false, delay: 100, beforeTrigger, afterTrigger })
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

  return {
    leftIsExpand,
    isSwitching,
    switchTo,
  }
})
