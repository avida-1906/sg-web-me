import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  /** 游戏提供商数据(PG,EVO,...) */
  const { list: platformList } = useList(ApiMemberPlatformList, {
    manual: false,
  })
  /** 是否登录，程序用这个变量来判断是否登录 */
  const { bool: isLogin, setTrue: setLoginTrue, setFalse: setLoginFalse } = useBoolean(!!getToken())
  /** 用户余额数据 */
  const { data: balanceList } = useRequest(ApiMemberBalanceList, {
    ready: isLogin,
    manual: false,
  })
  /** 货币配置 */
  const { data: currencyConfig } = useRequest(ApiMemberCurrencyConfig, {
    manual: false,
  })

  function setToken(token: string) {
    // 将token加密后存储到本地
    const _token = window.btoa(token)
    Local.set(STORAGE_TOKEN_KEY, _token)
    setLoginTrue()
  }
  function getToken() {
    const _token = Local.get<string | undefined>(STORAGE_TOKEN_KEY)?.value
    if (_token)
      return window.atob(_token)
    else
      return undefined
  }
  function removeToken() {
    Local.remove(STORAGE_TOKEN_KEY)
    setLoginFalse()
  }

  watchEffect(() => {
    console.log('balanceList', balanceList.value, currencyConfig.value)
  })

  return {
    isLogin,
    platformList,
    balanceList,
    setToken,
    setLoginTrue,
    setLoginFalse,
    removeToken,
    getToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
