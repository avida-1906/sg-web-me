import { an } from 'vitest/dist/types-198fd1d9'
import type { EnumLanguage, LanguageCurrencyEnum } from './enums'

interface IUtils {
}

/**
 * Utils 函数参数
 */
interface IUtilsConfig extends IUtils {
  language: EnumLanguage
}

interface ILanguageConfig {
  /**
   * 语言名称
   */
  label: string
  /**
   * 语言描述
   */
  desc: string
  language: 'zh-CN' | 'en-US' | 'hi-IN' | 'pt-BR' | 'vi-VN' | 'fr-FR' | 'ja-JP' | 'en-CA'
  currency: 'CNY' | 'USD' | 'INR' | 'BRL' | 'VND' | 'EUR' | 'JPY' | 'CAD'
}

interface ILocalStorageValue<T = any> {
  value: T
}
