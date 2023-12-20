export const useService = createGlobalState(() => {
  const { bool: serviceState, setBool } = useBoolean(false)

  /**
   * 打开客服
   */
  function openService() {
    setBool(true)
  }

  /**
   * 关闭客服
   */
  function closeService() {
    setBool(false)
  }

  return {
    serviceState,
    openService,
    closeService,
  }
})
