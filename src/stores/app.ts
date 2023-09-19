import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  /**
   * @type {boolean}
   * @description 是否登录，程序用这个变量来判断是否登录
   */
  const { bool: isLogin, toggle } = useBoolean(false)

  return {
    isLogin,
    toggle,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
