export function useFixedTop(className: string) {
  const page = document.querySelector(className)
  let currentInput: EventTarget | null = null // 当前聚焦的输入框
  const fixedEle = document.body
  const { bool: startMove, setBool: setStartMove } = useBoolean(false) // 记录是否发生了滑动手势
  let keyboardHeight = 0 // 软键盘高度
  const height = window.innerHeight

  function handleTouchmove() {
    setStartMove(true)
    page?.addEventListener('touchend', handleTouchend)
  }

  function handleTouchend() {
    setStartMove(false)
    page?.removeEventListener('touchend', handleTouchend)
  }

  // H5容器发生滚动到顶部或底部时，就收起软键盘。这个属于优化，看个人喜好要不要加
  // 不加的话就会体验不太好，滚动完h5容器顶部或底部后，需要等h5容器滚动条消失后再滚动才是让webview平移，容易让用户一开始觉得是滚不动了，这样误以为底下的内容无法查看。
  function handlePageScroll() {
    if (page && (page.scrollTop < 0 || page.scrollTop + page.clientHeight > page.scrollHeight))
      return triggerBlur()
  }

  // webview发生平移，则及时更新fixed元素的定位
  function handleWdinowScroll() {
  // 当平移时H5的内容已经滚动到顶部或底部，且 是因为发生滑动手势引起的scroll事件，此时就输入框失焦收起软键盘
  // 聚焦到输入框也会引起scroll事件，所以要加startMove区分开是滑动手势引起的
    if (page && (page.scrollTop === 0 || page.scrollTop + page.clientHeight >= page.scrollHeight) && startMove.value)
      return triggerBlur()

    // 聚焦输入框引起的平移
    fixedEle.style.top = `${window.pageYOffset}px`
  }

  // 当页面里的输入框聚焦时（随后会出现软键盘）
  function handleFocusin(e: Event) {
    const el = e || window.event
    currentInput = el.target
    if (window.visualViewport) {
      setTimeout(() => {
        // 计算过就不用再计算了，一般软键盘的高度是固定的，这样做还有一个顾虑：有些情况下，滚动的时候window.innerHeight和visualViewport.height还会变化，不能如实反馈，因此减少多次计算。
        keyboardHeight || (keyboardHeight = height - window.visualViewport.height)
        window.scrollTo({ top: keyboardHeight })
      }, 400)
    }
    // 因为上一个聚焦的输入框因为失焦导致top置为0了，如果新聚焦的输入框不会触发webview平移，则沿用当时的位移就好了
    fixedEle.style.top = `${window.pageYOffset}px`
    // 添加滚动监听，为了软键盘出现 以及 从一个聚焦输入框聚焦到另外一个输入框时， 重新定位fixed元素（其实这里不用滚动事件监听变化也可以用setTimeout来更新定位）
    window.addEventListener('scroll', handleWdinowScroll)
    page?.addEventListener('touchmove', handleTouchmove)
    page?.addEventListener('scroll', handlePageScroll)
  }

  // 主动失焦
  function triggerBlur() {
    currentInput && (currentInput as HTMLElement).blur()
  }

  // 失焦时，重置一些数据
  function handleBlur() {
    currentInput = null
    window.removeEventListener('scroll', handleWdinowScroll)
    page?.removeEventListener('touchmove', handleTouchmove)
    page?.removeEventListener('scroll', handlePageScroll)
    fixedEle.style.top = '0'
    setStartMove(false)
  }

  page?.addEventListener('focusin', handleFocusin)
  page?.addEventListener('focusout', handleBlur)
}
