import { EnumCurrency, EnumLanguage } from './enums'

export const CurrencyConfig = new Map<EnumCurrency, any>()

CurrencyConfig.set(EnumCurrency.EUR, {
  des: '欧元',
  language: EnumLanguage.FR_FR,
})

CurrencyConfig.set(EnumCurrency.JPY, {
  des: '日元',
  language: EnumLanguage.JA_JP,
})

CurrencyConfig.set(EnumCurrency.BRL, {
  des: '雷亚尔',
  language: EnumLanguage.PT_BR,
})

CurrencyConfig.set(EnumCurrency.CAD, {
  des: '加元',
  language: EnumLanguage.EN_CA,
})

CurrencyConfig.set(EnumCurrency.INR, {
  des: '印度卢比',
  language: EnumLanguage.HI_IN,
})
