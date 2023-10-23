import type { EnumCurrencyKey } from '~/apis'

/**
 * 页面渲染的货币列表
 */
export interface CurrencyData {
  /** 货币类型 */
  type: EnumCurrencyKey
  /** 余额 */
  balance: string
  /** 带货币符号的余额 */
  balanceWithSymbol: string
  /** 货币id */
  cur: string
}

interface CurrencyValue {
  prefix: string
  cur: string
}

export const currencyConfig: Record<EnumCurrencyKey, CurrencyValue> = {
  BRL: {
    prefix: 'R$',
    cur: '702',
  },
  CNY: {
    prefix: '¥',
    cur: '701',
  },
  INR: {
    prefix: '₹',
    cur: '703',
  },
  THB: {
    prefix: '฿',
    cur: '705',
  },
  VND: {
    prefix: '₫',
    cur: '704',
  },
  USDT: {
    prefix: '',
    cur: '706',
  },
  BTC: {
    prefix: '',
    cur: '707',
  },
}

/**
 * 使用货币数据
 */
export function useCurrencyData() {
  const appStore = useAppStore()
  const {
    userInfo,
  } = storeToRefs(appStore)

  // 搜索内容
  const searchValue = ref('')
  // 是否隐藏零余额
  const { bool: hideZeroBalance } = useBoolean(Local.get<boolean | undefined>(STORAGE_HIDE_ZERO_BALANCE_KEY)?.value)
  /** 当前选择的货币,用在充值和提现的下拉列表 */
  const currentCurrency = ref(EnumCurrency[0] as EnumCurrencyKey)
  /** 当前全局选择的货币 */
  const currentGlobalCurrency = ref<EnumCurrencyKey>(getLocalCurrentGlobalCurrency())

  /** 用户当前选择的货币余额 */
  const currentGlobalCurrencyBalance = computed(() => {
    const currency = currentGlobalCurrency.value
    const balance = userInfo.value?.balance[currency]
    return balance ?? 0
  })

  /** 页面渲染的货币列表 */
  const renderBalanceList = computed(() => {
    const balance = userInfo.value?.balance
    const list: CurrencyData[] = []

    for (const key in balance) {
      const type = key as EnumCurrencyKey
      const balanceNumber = balance[type]
      if (Object.values(EnumCurrency).includes(type)) {
        if (hideZeroBalance.value && Number(balanceNumber) === 0)
          continue

        list.push({
          type,
          balance: balanceNumber,
          balanceWithSymbol: `${currencyConfig[type].prefix}${balanceNumber}`,
          cur: currencyConfig[type].cur,
        })
      }
    }

    if (searchValue.value)
      return list.filter(({ type }) => type.includes(searchValue.value.toLocaleUpperCase()))
    else
      return list
  })

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

  /** 获取虚拟币协议类型 */
  const getVirtualCurrencyContractType = (currency: string) => {
    switch (currency) {
      case 'BTC': return [
        { label: 'BTC', value: 'BTC' },
      ]
      case 'USDT': return [
        { label: 'TRC20', value: 'TRC20' },
        { label: 'ERC20', value: 'ERC20' },
      ]
      default:return null
    }
  }

  /** 获取本地存储的当前全局选择的货币 */
  function getLocalCurrentGlobalCurrency(): EnumCurrencyKey {
    const currency = Local.get<
      EnumCurrencyKey
    >(STORAGE_CURRENT_GLOBAL_CURRENCY_KEY)?.value

    if (currency)
      return currency
    else
      return EnumCurrency[0] as EnumCurrencyKey
  }

  /** 设置本地存储的当前全局选择的货币 */
  function setLocalCurrentGlobalCurrency(currency: EnumCurrencyKey) {
    Local.set(STORAGE_CURRENT_GLOBAL_CURRENCY_KEY, currency)
  }

  /** 改变全局货币 */
  function changeGlobalCurrency(currency: EnumCurrencyKey) {
    currentGlobalCurrency.value = currency
    setLocalCurrentGlobalCurrency(currency)
  }

  /** 清空搜索内容 */
  function clearSearchValue() {
    searchValue.value = ''
  }

  return {
    currentGlobalCurrency,
    currentGlobalCurrencyBalance,
    renderBalanceList,
    currentCurrency,
    searchValue,
    hideZeroBalance,
    isVirtualCurrency,
    clearSearchValue,
    changeGlobalCurrency,
    getVirtualCurrencyContractType,
  }
}
