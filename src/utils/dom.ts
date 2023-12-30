/**
 * dom1和dom2之间的过渡动画
 * @param dom1
 * @param dom2
 * @param options
 */
export function domTransition(
  startDom: HTMLElement,
  endDom: HTMLElement,
  options?: {
    duration?: number
    easing?: string
    height?: string
    backgroundColor?: string
    topOffset?: number
  }) {
  const defaultOptions = {
    duration: 500,
    easing: 'ease',
    height: '30px',
    backgroundColor: 'var(--tg-text-blue)',
    topOffset: 0,
  }

  // 合并默认选项和传入的选项
  const mergedOptions = { ...defaultOptions, ...options }

  // 获取dom1和dom2的位置、宽度和高度
  const startDomRect = startDom.getBoundingClientRect()
  const endDomRect = endDom.getBoundingClientRect()

  // 创建一个新的div元素，用于动画效果
  const animatedDiv = document.createElement('div')
  animatedDiv.style.position = 'fixed'
  animatedDiv.style.left = `${startDomRect.left}px`
  animatedDiv.style.top = `${startDomRect.top}px`
  animatedDiv.style.width = `${startDomRect.width}px`
  animatedDiv.style.height = `${startDomRect.height}px`
  animatedDiv.style.background = mergedOptions.backgroundColor
  animatedDiv.style.opacity = '1'
  animatedDiv.style.zIndex = '9999'

  // 将动画元素添加到DOM中
  document.body.appendChild(animatedDiv)

  // 设置动画的过渡效果
  animatedDiv.style.transition = `all ${mergedOptions.duration}ms ${mergedOptions.easing}`

  // 使用requestAnimationFrame触发动画
  requestAnimationFrame(() => {
    animatedDiv.style.left = `${endDomRect.left}px`
    animatedDiv.style.top = `${endDomRect.top - mergedOptions.topOffset}px`
    animatedDiv.style.width = `${endDomRect.width}px`
    animatedDiv.style.height = mergedOptions.height
    animatedDiv.style.opacity = '0.07'

    // 动画结束后移除动画元素
    animatedDiv.addEventListener('transitionend', () => {
      animatedDiv.remove()
    })
  })
}

/**
 * 获取dom的样式值
 * @param dom
 * @param styleName
 */
export function getStyle(dom: HTMLElement, styleName: any) {
  return window.getComputedStyle(dom)[styleName]
}

/**
 * 滚动到顶部
 */
export function scrollToTop() {
  setTimeout(() => {
    const temp = document.getElementById('main-content-scrollable')
    if (temp)
      temp.scrollTop = -20
    document.documentElement.scrollTop = document.body.scrollTop = -20
    document.querySelector('.only-for-get-width')?.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'center' })
  }, 0)
}
