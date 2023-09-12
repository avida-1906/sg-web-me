import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  /**
   * @type {boolean}
   * @description 是否登录，程序用这个变量来判断是否登录
   */
  const isLogin = ref(false)
  /**
   * @type {string}
   * @description 当前语言
   */
  const defaultLanguage = import.meta.env.VITE_I18N_DEFAULT_LANG
  const localStorageLanguage = Local.get<typeof LanguageEnum | null>(LOCAL_STORAGE_LANGUAGE_KEY)?.value
  const language = ref(localStorageLanguage || LanguageEnum[defaultLanguage])

  return {
    isLogin,
    language,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
