import { acceptHMRUpdate, defineStore } from 'pinia'
import { getInitLangIndex, loadLanguageAsync } from '~/modules/i18n'
import { EnumLanguage } from '~/utils/enums'

export const AllLanguages = [
  { title: '中文', path: '', icon: '', value: EnumLanguage['zh-CN'] },
  { title: 'Tiếng Việt', path: '', icon: '', value: EnumLanguage['vi-VN'] },
  { title: 'Português', path: '', icon: '', value: EnumLanguage['pt-BR'] },
]

export const useAppStore = defineStore('app', () => {
  /** 当前选择的语言 */
  const userLanguage = ref(getInitLangIndex())

  /** 导航排序 */
  const navButtons = ref<any>([])
  useRequest(ApiMemberGameCateIndex, {
    manual: false,
    onSuccess(res) {
      navButtons.value = res.map((a) => {
        return { ...a, title: a.name === '娱乐城' ? 'casino' : 'sports' }
      })
    },
  })

  /** 是否登录，程序用这个变量来判断是否登录 */
  const { bool: isLogin, setTrue: setLoginTrue, setFalse: setLoginFalse } = useBoolean(!!getToken())
  /** 用户信息 */
  const { data: userInfo, runAsync: updateUserInfo } = useRequest(ApiMemberDetail, {
    ready: isLogin,
    manual: false,
  })
  const visibility = useDocumentVisibility()

  /** 更换语言 */
  function changeLanguage(langIndex: EnumLanguage) {
    Local.set(STORAGE_LANGUAGE_KEY, langIndex)
    loadLanguageAsync(langIndex)
    userLanguage.value = langIndex
  }

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
    userInfo,
    setToken,
    setLoginTrue,
    setLoginFalse,
    removeToken,
    getToken,
    updateUserInfo,
    navButtons,
    userLanguage,
    changeLanguage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
