import type { EnumCurrencyKey } from '~/apis/types'

export function useExchangeRate() {
  const appStore = useAppStore()
  const { exchangeRateData } = storeToRefs(appStore)

  /**
   * 获取计算后的汇率 USDT -> 人民币
   * @param baseCurrency 基础货币 默认数量为 1
   * @param targetCurrency 目标货币
   */
  const getRate = (baseCurrency: EnumCurrencyKey, targetCurrency: EnumCurrencyKey, keepBit = 2) => {
    if (baseCurrency === targetCurrency) {
      return {
        baseNum: 1,
        targetNum: toFixed(1, keepBit),
      }
    }

    const baseCurrencyMap = getCurrencyConfig(baseCurrency)
    const targetCurrencyMap = getCurrencyConfig(targetCurrency)

    const baseRates = exchangeRateData.value?.rates[baseCurrencyMap.cur]
    if (baseRates) {
      return {
        baseNum: 1,
        targetNum: toFixed(+baseRates[targetCurrencyMap.cur], keepBit),
      }
    }
  }

  const runGetExchangeRate = () => appStore.runGetExchangeRate()

  return {
    getRate,
    runGetExchangeRate,
  }
}
