import type { EnumCurrencyKey } from '~/apis'

/**
 * 使用货币数据
 */
export function useCurrencyData() {
  const appStore = useAppStore()
  const { currentGlobalCurrency, currentGlobalCurrencyBalance, userCurrencyList } = storeToRefs(appStore)

  // 搜索内容
  const searchValue = ref('')

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

  return {
    currentGlobalCurrency,
    currentGlobalCurrencyBalance,
    searchValue,
    renderCurrencyList,
    changeCurrency,
    clearSearchValue,
  }
}
