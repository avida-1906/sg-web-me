/**
 * Ico Hook
 * @param link  ico的链接
 */
export function useIco(link: Ref<string>) {
  const { VITE_CASINO_IMG_CLOUD_URL } = getEnv()
  watch(link, (val) => {
    if (val) {
      const link = document.createElement('link')
      link.rel = 'shortcut icon'
      link.href = `${VITE_CASINO_IMG_CLOUD_URL}/${val}`
      document.head.appendChild(link)
    }
  })
}
