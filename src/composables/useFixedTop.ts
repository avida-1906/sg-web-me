export function useFixedTop(className: string) {
  const page = document.querySelector(className)
  let scrollTop = 0
  let currentInput: EventTarget | null = null // 当前聚焦的输入框

  // 滚动时收起软键盘
  function stopMove() {
    if (currentInput) {
      (currentInput as HTMLElement).blur()
      currentInput = null
      window.removeEventListener('touchmove', stopMove)
      window.removeEventListener('scroll', handleScroll)
      // fixedEle.style.top = 0
    }
  }
  // webview发生平移
  function handleScroll() {
    if (document.documentElement.scrollTop <= 0)
      document.documentElement.scrollTop = 1
    // fixedEle.style.top = `${window.pageYOffset}px`
  }

  function handleFocusin(e: Event) {
    const el = e || window.event
    currentInput = el.target
    scrollTop = document.documentElement.scrollTop
    setTimeout(() => {
      if (scrollTop <= 0)
        document.documentElement.scrollTop = 1
    }, 100)
    // 添加滚动监听，为了软键盘出现 以及 从一个聚焦输入框聚焦到另外一个输入框时
    window.addEventListener('scroll', handleScroll)
    // 监听移动手势：
    // 1. 在软键盘出现后，如果想要滚动，则收起软键盘，解绑webview的滚动监听事件
    // 2. 在软键盘出现后，用户主动收起软键盘（如点击软键盘的收起/完成等按钮），此时用户没有做移动手势，那么就会在收起软键盘后只要做了移动手势，就仍然触发绑定事件，达到解绑滚动监听事件的目的，阻止监听到webview回弹效果导致的固定顶部元素发生位移。
    window.addEventListener('touchmove', stopMove)
  }
  page?.addEventListener('focusin', handleFocusin)
}
