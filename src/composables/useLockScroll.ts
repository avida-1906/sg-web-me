export function useLockScroll(
  ...depends: Array<Ref | ComputedRef>
) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  const scrollTop = ref(0)
  const b = toRefs(depends)

  function preventTMove(e: TouchEvent) {
    e.preventDefault()
  }

  function setScrollTop() {
    scrollTop.value = document.scrollingElement?.scrollTop
                        || document.documentElement.scrollTop
                        || document.body.scrollTop
  }

  function lockScroll() {
    if (isSafari) {
      document.body.classList.add('tg-popup-parent--hidden--safari')
      // document.body.style.top = `${-scrollTop.value}px`
      // document.addEventListener('touchmove', preventTMove, { passive: false })
      const app = document.getElementById('TgMainContent')
      if (app)
        app.addEventListener('touchmove', preventTMove, { passive: false })
    }
    else { document.body.classList.add('tg-popup-parent--hidden') }
  }

  function unlockScroll() {
    if (isSafari) {
      document.body.classList.remove('tg-popup-parent--hidden--safari')
      // document.documentElement.scrollTop = document.body.scrollTop = scrollTop.value
      // document.removeEventListener('touchmove', preventTMove)
      const app = document.getElementById('TgMainContent')
      if (app)
        app.removeEventListener('touchmove', preventTMove)
    }
    else { document.body.classList.remove('tg-popup-parent--hidden') }
  }

  const stop = watch(b, (val) => {
    if (depends !== void 0) {
      const temp = val.filter(r => r === true).length > 0
      // if (temp)
      //   setScrollTop()
      nextTick(() => {
        setTimeout(() => {
          if (temp)
            lockScroll()
          else
            unlockScroll()
        }, 50)
      })
    }
  })

  if (depends === void 0)
    stop()

  onMounted(() => {
    if (depends !== void 0) {
      const temp = b.filter(r => r.value === true).length > 0
      // if (temp)
      //   setScrollTop()
      nextTick(() => {
        setTimeout(() => {
          if (temp)
            lockScroll()
          else
            unlockScroll()
        }, 50)
      })
    }
  })

  return {
    setScrollTop,
    lockScroll,
    unlockScroll,
  }
}
