import { an } from 'vitest/dist/types-198fd1d9'
import type { LanguageEnum, LanguageCurrencyEnum } from './enums'

interface IUtils {
}

/**
 * Utils 函数参数
 */
interface IUtilsConfig extends IUtils {
  language: LanguageEnum
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
  /**
   * 语言 zh-CN en-US hi-IN pt-BR vi-VN
   */
  language: string
  /**
   * 货币 CNY USD INR BRL VND
   */
  currency: 'CNY' | 'USD' | 'INR' | 'BRL' | 'VND'
}

interface ILocalStorageValue {
  value: any
}