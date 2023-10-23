import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  /** 游戏提供商数据(PG,EVO,...) */
  const { list: platformList } = useList(ApiMemberPlatformList, {
    manual: false,
  })
  /** 是否登录，程序用这个变量来判断是否登录 */
  const { bool: isLogin, setTrue: setLoginTrue, setFalse: setLoginFalse } = useBoolean(!!getToken())
  /** 用户信息 */
  const { data: userInfo, runAsync: updateUserInfo } = useRequest(ApiMemberDetail, {
    ready: isLogin,
    manual: false,
  })
  const visibility = useDocumentVisibility()

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

  watch(visibility, (bool) => {
    // 如果页面可见，更新用户余额和用户信息
    if (bool === 'visible')
      updateUserInfo()
  })

  watch(userInfo, () => {
    // 如果有uid，连接socket
    if (userInfo.value?.uid)
      socketClient.connect()
  })

  return {
    isLogin,
    platformList,
    userInfo,
    setToken,
    setLoginTrue,
    setLoginFalse,
    removeToken,
    getToken,
    updateUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
