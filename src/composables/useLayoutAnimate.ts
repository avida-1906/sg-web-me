export function useLayoutAnimate({ aniMounted, aniRouteNameChange, waitSuspense }: { aniMounted?: boolean; aniRouteNameChange?: boolean; waitSuspense?: boolean }) {
  const route = useRoute()

  // const { bool: suspenseResolved, setFalse: setSusFalse, setTrue: setSusTrue } = useBoolean(false)
  const { bool: animatingMounted, setFalse: setMFalse, setTrue: setMTrue } = useBoolean(false)
  const { bool: animatingWatch, setFalse: setWFalse, setTrue: setWTrue } = useBoolean(false)

  function toggleMAni() {
    setMTrue()
    setTimeout(() => {
      setMFalse()
    }, 300)
  }

  function toggleWAni() {
    setWTrue()
    setTimeout(() => {
      setWFalse()
    }, 300)
  }

  const stop = watch(() => route.name, () => {
    if (aniRouteNameChange)
      toggleWAni()
  })

  onMounted(() => {
    if (aniMounted)
      toggleMAni()
    if (!aniRouteNameChange)
      stop()
  })

  return {
    animatingMounted,
    animatingWatch,
  }
}
