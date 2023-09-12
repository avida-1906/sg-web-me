import { LanguageEnum } from './enums'
import type { IUtilsConfig } from './index.utils'

const defaultLanguage = import.meta.env.VITE_I18N_DEFAULT_LANG

/**
 * @description 时间戳转换成当前国家的时间
 * @param {number} timestamp 时间戳
 * @param {IUtilsConfig} options 语言
 * @returns {string} 格式化后的时间
 */
export function timestampToTime(timestamp: number, options?: IUtilsConfig): string {
  const localStorageLanguage = Local.get(LOCAL_STORAGE_LANGUAGE_KEY)?.value as LanguageEnum | null
  let languageIndex: number
  if (options?.language || options?.language === 0)
    languageIndex = options.language

  else
    languageIndex = Number(localStorageLanguage || LanguageEnum[defaultLanguage])

  const languageStr = languageConfig.get(languageIndex)!.language
  return new Intl.DateTimeFormat(languageStr, { dateStyle: 'medium', timeStyle: 'medium' }).format(timestamp)
}

/**
 * @description 将数字转换为指定国家的货币格式
 * @param {number} number 数字
 * @param {IUtilsConfig} options 语言
 * @returns {string} 格式化后的货币
 */
export function numberToCurrency(number: number, options?: IUtilsConfig): string {
  const localStorageLanguage = Local.get<LanguageEnum | null>(LOCAL_STORAGE_LANGUAGE_KEY)?.value
  let languageIndex: number
  if (options?.language || options?.language === 0)
    languageIndex = options.language

  else
    languageIndex = Number(localStorageLanguage || LanguageEnum[defaultLanguage])

  const languageMap = languageConfig.get(languageIndex)
  return new Intl.NumberFormat(languageMap?.language, { style: 'currency', currency: languageMap?.currency }).format(number)
}

/**
 * @description 生成一个 uuid
 * @returns {uuid}
 */
export function getUuid() {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}
