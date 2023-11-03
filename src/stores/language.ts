import { acceptHMRUpdate, defineStore } from 'pinia'
import { getInitLangIndex, loadLanguageAsync } from '~/modules/i18n'
import { EnumLanguage } from '~/utils/enums'

export const useLanguageStore = defineStore('language', () => {
  /** 所有语言列表 */
  const AllLanguages = ref<Array<{
    title: string
    path: string
    icon: string
    value: EnumLanguage
  }>>([
    { title: '中文', path: '', icon: '', value: EnumLanguage['zh-CN'] },
    { title: 'Tiếng Việt', path: '', icon: '', value: EnumLanguage['vi-VN'] },
    { title: 'Português', path: '', icon: '', value: EnumLanguage['pt-BR'] },
  ])

  /** 当前选择的语言 */
  const userLanguage = ref(getInitLangIndex())

  /** 更换语言 */
  function changeLanguage(langIndex: EnumLanguage) {
    Local.set(STORAGE_LANGUAGE_KEY, langIndex)
    loadLanguageAsync(langIndex)
    userLanguage.value = langIndex
    location.reload()
  }

  return {
    AllLanguages,
    userLanguage,
    changeLanguage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLanguageStore, import.meta.hot))
