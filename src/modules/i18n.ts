import type { App } from 'vue'
import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
export const i18n = createI18n({
  legacy: false,
  locale: '',
  fallbackFormat: 'zh-CN',
  messages: {},
})

const { VITE_I18N_DEFAULT_LANG } = getEnv()

export type EnumLanguageKeys = keyof typeof EnumLanguage
export type EnumLanguageValues = typeof EnumLanguage[EnumLanguageKeys]

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export function install(app: App<Element>) {
  app.use(i18n)
  loadLanguageAsync(getCurrentLanguageForFrontend())
}

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
