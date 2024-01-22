export const useBrandBaseDetail = createGlobalState(() => {
  const { isLogin } = storeToRefs(useAppStore())
  const {
    data: brandBaseDetail,
  } = useRequest(ApiMemberBrandDetail, {
    ready: isLogin,
    manual: false,
    defaultParams: [
      {
        tag: 'base',
      },
    ],
  })

  const {
    loading: loadingAuthConfig,
    data: authConfig,
    run: runMemberAuthConfig,
  } = useRequest(ApiMemberAuthConfig, {
    ready: isLogin,
    manual: false,
  })
  const isSetAuth = computed(() => {
    return authConfig.value?.is_secret === '1'
  })
  const isSetPayPwd = computed(() => {
    return authConfig.value?.is_pay_password === '1'
  })
  const isOpenVerify = computed(() => {
    return [1, 3].includes(brandBaseDetail.value?.check)
  })
  const isOpenPayPwd = computed(() => {
    return [2, 3].includes(brandBaseDetail.value?.check)
  })
  return {
    /** 站点基础信息 check：1-谷歌验证 2-资金密码 3-全部 */
    brandBaseDetail,
    /** 用户双重验证配置 */
    authConfig,
    /** 用户是否配置资金密码 */
    isSetPayPwd,
    /** 用户是否配置双重验证 */
    isSetAuth,
    /** 站点是否开启双重验证 */
    isOpenVerify,
    /** 站点是否开启资金密码 */
    isOpenPayPwd,
    loadingAuthConfig,
    runMemberAuthConfig,
  }
})
