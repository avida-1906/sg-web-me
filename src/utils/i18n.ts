import type { EnumLanguageKeys, EnumLanguageValues } from '~/modules/i18n'

const { VITE_I18N_DEFAULT_LANG } = getEnv()

/**
 * 获取当前路由对应的前端语言
 * @returns EnumLanguageKeys
 */
export function getCurrentLanguageForFrontend(): EnumLanguageKeys {
  const pathname = window.location.pathname
  const lang = pathname.split('/')[1]
  const langKeys = Object.keys(EnumLanguage)
  if (isExistRouterLanguage(lang)) {
    const langKey = langKeys.find((key) => {
      return key.startsWith(lang)
    })
    if (langKey)
      return langKey as EnumLanguageKeys
  }
  return VITE_I18N_DEFAULT_LANG
}

/**
   * 获取当前路由对应的后端语言
   * @returns EnumLanguageValues
   */
export function getCurrentLanguageForBackend(): EnumLanguageValues {
  const pathname = window.location.pathname
  const lang = pathname.split('/')[1]
  const langKeys = Object.keys(EnumLanguage)
  if (isExistRouterLanguage(lang)) {
    const langKey = langKeys.find((key) => {
      return key.startsWith(lang)
    })
    if (langKey)
      return EnumLanguage[langKey as EnumLanguageKeys]
  }
  return EnumLanguage[VITE_I18N_DEFAULT_LANG]
}

/**
   * 根据传入的语言获取路由应该显示的语言
   * 例如：zh-CN => zh
   */
export function getLocalUrlToUrlLang(lang?: EnumLanguageKeys): string {
  const _lang = lang || VITE_I18N_DEFAULT_LANG
  return _lang.split('-')[0]
}

/**
   * 获取当前url的显示语言
   * @returns EnumLanguageKeys
   */
export function getCurrentUrlLanguage(): string {
  const pathname = window.location.pathname
  const lang = pathname.split('/')[1]
  const langKeys = Object.keys(EnumLanguage)
  if (isExistRouterLanguage(lang)) {
    const langKey = langKeys.find((key) => {
      return key.startsWith(lang)
    })
    if (langKey)
      return getLocalUrlToUrlLang(langKey as EnumLanguageKeys)
  }
  return getLocalUrlToUrlLang(VITE_I18N_DEFAULT_LANG)
}

/**
   * 判断路由语言是否存是项目中的语言
   * @param lang
   */
export function isExistRouterLanguage(lang: string): boolean {
    type EnumLanguageKeys = keyof typeof EnumLanguage
    const langs = Object.keys(EnumLanguage).map((key) => {
      return getLocalUrlToUrlLang(key as EnumLanguageKeys)
    })

    return langs.includes(lang)
}
