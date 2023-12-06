/**
 * Ico Hook
 * @param link  ico的链接
 */
export function useIco(link: Ref<string>) {
  const defaultLink = '/webp/favicon.ico'

  watch(link, (val) => {
    if (val) {
      console.error('val', val)
      const link = document.createElement('link')
      link.rel = 'shortcut icon'
      link.href = val

      // 监听加载失败，如果加载失败，就使用默认的ico
      link.onerror = () => {
        console.error('加载失败，使用默认的ico')
        link.href = defaultLink
      }

      // 加载成功后，将ico添加到head中
      link.onload = () => {
        console.error('加载成功，使用自定义的ico')
        document.getElementsByTagName('head')[0].appendChild(link)
      }
    }
  })
}
