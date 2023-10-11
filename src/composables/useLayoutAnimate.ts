export function useLayoutAnimate({ aniMounted, aniRouteNameChange, aniSuspense }: { aniMounted?: boolean; aniRouteNameChange?: boolean; aniSuspense?: boolean }) {
  const route = useRoute()

  // const { bool: suspenseResolved, setFalse: setSusFalse, setTrue: setSusTrue } = useBoolean(false)
  const { bool: animatingMounted, setFalse: setMFalse, setTrue: setMTrue } = useBoolean(false)
  const { bool: animatingWatch, setFalse: setWFalse, setTrue: setWTrue } = useBoolean(false)
  const { bool: animatingSuspense, setFalse: setSFalse, setTrue: setSTrue } = useBoolean(false)
  const suspenseStatus = ref()

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

  function toggleSAni() {
    setSTrue()
    setTimeout(() => {
      setSFalse()
    }, 300)
  }

  function getSuspenseStatus(status: any) {
    console.log('status === ', status)
    suspenseStatus.value = status
    setTimeout(() => {
      suspenseStatus.value = ''
    }, 100)
  }

  const stopWatchSus = watch(suspenseStatus, (val) => {
    if (val === 'SuspenseResolved' && aniSuspense) {
      nextTick(() => {
        toggleSAni()
      })
    }
  })

  const stop = watch(() => route.name, () => {
    if (aniRouteNameChange) {
      nextTick(() => {
        toggleWAni()
      })
    }
  })

  onMounted(() => {
    if (aniMounted) {
      nextTick(() => {
        toggleMAni()
      })
    }
    if (!aniRouteNameChange)
      stop()
    if (!aniSuspense)
      stopWatchSus()
  })

  return {
    animatingMounted,
    animatingWatch,
    animatingSuspense,
    getSuspenseStatus,
  }
}
