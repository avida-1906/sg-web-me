import { acceptHMRUpdate, defineStore } from 'pinia'
import type { EnumLanguageKeys } from '~/modules/i18n'

export const useLanguageStore = defineStore('language', () => {
  const router = useRouter()
  /** 所有语言列表 */
  const AllLanguages = ref<Array<{
    title: string
    path: string
    icon: string
    value: EnumLanguageKeys
    phone: string
    phoneId: string
    prefix: string
  }>>([
    {
      title: '中文',
      path: '',
      icon: '',
      value: 'zh-CN',
      phone: '+86',
      phoneId: '1137',
      prefix: 'zh',
    },
    {
      title: 'English',
      path: '',
      icon: '',
      value: 'en-US',
      phone: '+1',
      phoneId: '1283',
      prefix: 'en',
    },
    {
      title: 'Tiếng Việt',
      path: '',
      icon: '',
      value: 'vi-VN',
      phone: '+84',
      phoneId: '1287',
      prefix: 'vn',
    },
    {
      title: 'Português',
      path: '',
      icon: '',
      value: 'pt-BR',
      phone: '+55',
      phoneId: '1125',
      prefix: 'pt',
    },
    {
      title: 'ไทย',
      path: '',
      icon: '',
      value: 'th-TH',
      phone: '+66',
      phoneId: '66',
      prefix: 'th',
    },
  ])

  /** 当前选择的语言 */
  const userLanguage = ref(getCurrentLanguageForFrontend())

  /** 更换语言 */
  async function changeLanguage(enumLangKeys: EnumLanguageKeys) {
    const _fullPath = router.currentRoute.value.fullPath.replace(`/${getCurrentUrlLanguage()}`, getLocalUrlToUrlLang(enumLangKeys))
    router.push(`/${_fullPath}`)
    setTimeout(() => {
      location.reload()
    }, 30)
  }

  return {
    AllLanguages,
    userLanguage,
    changeLanguage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLanguageStore, import.meta.hot))
