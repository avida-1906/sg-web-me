import { EnumLanguage } from './enums'
import type { ILanguageConfig } from './index.utils'

export const languageConfig: Map<EnumLanguage, ILanguageConfig> = new Map()
languageConfig.set(EnumLanguage.ZH_CN, {
  label: '中文',
  desc: '简体中文',
  language: 'zh-CN',
  currency: 'CNY',
})

languageConfig.set(EnumLanguage.EN_US, {
  label: 'English',
  desc: '英文',
  language: 'en-US',
  currency: 'USD',
})

languageConfig.set(EnumLanguage.HI_IN, {
  label: 'Hindi',
  desc: '印地语',
  language: 'hi-IN',
  currency: 'INR',
})

languageConfig.set(EnumLanguage.PT_BR, {
  label: 'Portuguese',
  desc: '葡萄牙语',
  language: 'pt-BR',
  currency: 'BRL',
})

languageConfig.set(EnumLanguage.VI_VN, {
  label: 'Vietnamese',
  desc: '越南语',
  language: 'vi-VN',
  currency: 'VND',
})

languageConfig.set(EnumLanguage.FR_FR, {
  label: 'EUR',
  desc: '欧元',
  language: 'fr-FR',
  currency: 'EUR',
})

languageConfig.set(EnumLanguage.JA_JP, {
  label: 'JPY',
  desc: '日元',
  language: 'ja-JP',
  currency: 'JPY',
})

languageConfig.set(EnumLanguage.EN_CA, {
  label: 'CAD',
  desc: '加元',
  language: 'en-CA',
  currency: 'CAD',
})
