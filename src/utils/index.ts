class Application {
  /** 数字货币默认保留小数长度 */
  #CURRENCY_DEFAULT_DECIMAL = 8

  defaultLanguage = import.meta.env.VITE_I18N_DEFAULT_LANG

  constructor() {
    console.log('Appliction constructor')
  }

  /**
   * @description 时间戳转换成指定国家的时间
   * @param {number} timestamp 时间戳
   * @param {EnumLanguage} language 语言
   * @returns {string} 格式化后的时间
   */
  timestampToTime(timestamp: number, language = EnumLanguage[this.defaultLanguage]): string {
    const languageStr = EnumLanguage[language]
    return new Intl.DateTimeFormat(languageStr, { dateStyle: 'short', timeStyle: 'medium' }).format(timestamp)
  }

  /**
   * @description 将数字转换为货币
   * @param {number} number 数字
   * @param {typeof EnumCurrency} language 语言
   * @returns {string} 格式化后的货币
   */
  numberToCurrency(number: number, language = EnumCurrency.BTC): string {
    // 法定货币列表
    const fiatCurrencyList = [
      EnumCurrency.EUR,
      EnumCurrency.JPY,
      EnumCurrency.BRL,
      EnumCurrency.CAD,
      EnumCurrency.INR,
    ]

    if (fiatCurrencyList.includes(language))
      return new Intl.NumberFormat(EnumCurrency[language], { style: 'currency', currency: EnumCurrency[language] }).format(Number(toFixed(number, 2)))

    else
      return toFixed(number, this.#CURRENCY_DEFAULT_DECIMAL)
  }

  copy(str: string) {
    const { copy: _copy, copied } = useClipboard()
    _copy(str).then(() => {
      if (copied.value)
        toast('Copied')
    })
  }

  getDeviceNumber() {
    return 'testwebwebwebwebewb'
  }
}

export const application = new Application()
