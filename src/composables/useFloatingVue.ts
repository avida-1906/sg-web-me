export function useFloatingVue() {
  const {
    bool: floatingState,
    setTrue: setFloatingTrue,
    setFalse: setFloatingFalse,
    toggle: toggleFloating,
  } = useBoolean(false)

  function eventHandler() {
    setFloatingFalse()
  }

  onMounted(() => {
    document.addEventListener('click', eventHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', eventHandler)
  })

  return {
    floatingState,
    toggleFloating,
    setFloatingTrue,
    setFloatingFalse,
  }
}
