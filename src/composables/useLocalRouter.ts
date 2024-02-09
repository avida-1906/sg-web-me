export function useLocalRouter() {
  const router = useRouter()

  /**
   * 判断是否是外部链接
   * @param path
   */
  function isExternal(path: string) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

  /**
   * 路由跳转
   * @desc 如果带有http(s)前缀，则直接替换当前页面，否则使用vue-router进行跳转
   * @desc 如果path中包含了 SPORTS_PLAT_ID，则替换为当前的 SPORTS_PLAT_ID
   * @param path
   * @returns
   */
  function push(path: string) {
    if (!path)
      return

    if (isExternal(path)) {
      window.open(path, '_blank')
      return
    }

    const uid = router.currentRoute.value.query.uid

    const _path = `/${getCurrentUrlLanguage()}${path}`
    const isExistQuery = _path.includes('?')

    if (isExistQuery)
      router.push(`${_path}${uid ? `&uid=${uid}` : ''}`)
    else
      router.push(`${_path}${uid ? `?uid=${uid}` : ''}`)
  }

  return {
    ...router,
    isExternal,
    push,
  }
}
