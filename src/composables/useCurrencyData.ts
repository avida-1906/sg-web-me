import type { EnumCurrencyKey } from '~/apis'

/**
 * 使用货币数据
 */
export function useCurrencyData() {
  const appStore = useAppStore()
  const { currentGlobalCurrency, currentGlobalCurrencyBalance, userCurrencyList } = storeToRefs(appStore)

  // 搜索内容
  const searchValue = ref('')
  // 当前选择的货币
  const currentCurrency = ref(currentGlobalCurrency.value)
  // const currentCurrency = ref(EnumCurrency[0] as EnumCurrencyKey)

  // 渲染货币列表
  const renderCurrencyList = computed(() => {
    if (searchValue.value)
      return userCurrencyList.value.filter(item => item.type.includes(searchValue.value.toLocaleUpperCase()))

    return userCurrencyList.value
  })

  const changeCurrency = (type: EnumCurrencyKey) => {
    appStore.changeCurrentGlobalCurrency(type)
  }

  const clearSearchValue = () => {
    searchValue.value = ''
  }

  /**
   * 改变当前选择的货币
   * @param {EnumCurrencyKey} currency
   */
  const changeCurrentCurrency = (currency: EnumCurrencyKey) => {
    currentCurrency.value = currency
  }

  /**
   * 判断是不是虚拟货币
   * @param {EnumCurrencyKey} currency
   */
  const isVirtualCurrency = (currency: EnumCurrencyKey) => {
    const virtualList: EnumCurrencyKey[] = [
      'USDT',
      'BTC',
    ]
    return virtualList.includes(currency)
  }

  return {
    currentGlobalCurrency,
    currentGlobalCurrencyBalance,
    currentCurrency,
    searchValue,
    renderCurrencyList,
    changeCurrency,
    clearSearchValue,
    changeCurrentCurrency,
    isVirtualCurrency,
  }
}
