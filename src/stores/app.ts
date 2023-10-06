import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const { list: platformList } = useList(ApiMemberPlatformList, {
    manual: false,
  })

  /**
   * @type {boolean}
   * @description 是否登录，程序用这个变量来判断是否登录
   */
  const { bool: isLogin, setTrue: setLoginTrue, setFalse: setLoginFalse } = useBoolean(!!getToken())
  /**
   * @type {boolean}
   * @description 路由变化时，是否需要动画
   */
  const { bool: needAnimate, setBool: setNeedAnimateBool } = useBoolean(false)

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

  return {
    isLogin,
    platformList,
    needAnimate,
    setToken,
    setLoginTrue,
    setLoginFalse,
    removeToken,
    getToken,
    setNeedAnimateBool,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
