import type { EnumCurrencyKey, TCurrencyObject } from '~/apis/types'
import type { TTreeListType } from '~/composables/useApiMemberTreeList'

type TBankTreeType<T extends TTreeListType | string>
= T extends TTreeListType ? TTreeListType : string

/**
 * 页面渲染的货币列表
 */
export interface CurrencyData<T extends TTreeListType | string = string> {
  /** 货币类型 */
  type: EnumCurrencyKey
  /** 余额 */
  balance: string
  /** 带货币符号的余额 */
  balanceWithSymbol: string
  /** 货币id */
  cur: string
  /** 银行列表 */
  bankTree: TBankTreeType<T>
  /** 货币符号 */
  prefix: string
}

interface CurrencyValue {
  prefix: string
  cur: string
  bankTree: string
}

export const currencyConfig: Record<EnumCurrencyKey, CurrencyValue> = {
  CNY: {
    prefix: '¥',
    cur: '701',
    bankTree: '002',
  },
  BRL: {
    prefix: 'R$',
    cur: '702',
    bankTree: '015',
  },
  INR: {
    prefix: '₹',
    cur: '703',
    bankTree: '016',
  },
  VND: {
    prefix: '₫',
    cur: '704',
    bankTree: '003',
  },
  THB: {
    prefix: '฿',
    cur: '705',
    bankTree: '017',
  },
  USDT: {
    prefix: 'USDT',
    cur: '706',
    bankTree: '',
  },
  BTC: {
    prefix: 'BTC',
    cur: '707',
    bankTree: '',
  },
  ETH: {
    prefix: 'ETG',
    cur: '708',
    bankTree: '',
  },
  BNB: {
    prefix: 'BNB',
    cur: '709',
    bankTree: '',
  },
}

/**
 * 使用货币数据
 */
export function useCurrencyData() {
  const appStore = useAppStore()
  const {
    userInfo,
    allContractList,
  } = storeToRefs(appStore)

  const {
    bool: hideZeroBalance,
    setBool: setHideZeroBalance,
  } = useBoolean(Local.get<boolean | undefined>(STORAGE_HIDE_ZERO_BALANCE_KEY)?.value)

  // 搜索内容
  const searchValue = ref('')
  // 是否隐藏零余额

  /** 当前全局选择的货币 */
  const currentGlobalCurrency = ref<EnumCurrencyKey>(getLocalCurrentGlobalCurrency())
  /** 当前选择的货币,用在充值和提现的下拉列表 */
  const currentCurrency = ref(currentGlobalCurrency.value)

  /**
   * 判断是不是虚拟货币
   * @param {EnumCurrencyKey} currency
   */
  const isVirtualCurrency = (currency: EnumCurrencyKey) => {
    const virtualList: EnumCurrencyKey[] = [
      'USDT',
      'BTC',
      'ETH',
      'BNB',
    ]
    return virtualList.includes(currency)
  }

  /** 用户当前选择的货币余额 */
  const currentGlobalCurrencyBalance = computed(() => {
    const currency = currentGlobalCurrency.value
    const balance = userInfo.value?.balance[currency]
    const symbol = isVirtualCurrency(currency) ? '' : currencyConfig[currency].prefix
    return balance ? symbol + balance : 0
  })

  /** 货币列表;含筛选 */
  const allCurrencyData = (currency: TCurrencyObject | undefined) => {
    if (!currency)
      return []

    const list: CurrencyData[] = []
    for (const key in currency) {
      const type = key as EnumCurrencyKey
      const balanceNumber = currency[type]
      if (Object.values(EnumCurrency).includes(type)) {
        // if (hideZeroBalance.value && Number(balanceNumber) === 0)
        //   continue
        list.push({
          type,
          balance: balanceNumber,
          balanceWithSymbol: `${
            isVirtualCurrency(type)
            ? ''
            : currencyConfig[type].prefix}${balanceNumber
          }`,
          cur: currencyConfig[type].cur,
          bankTree: currencyConfig[type].bankTree,
          prefix: currencyConfig[type].prefix,
        })
      }
    }
    if (searchValue.value)
      return list.filter(({ type }) => type.includes(searchValue.value.toLocaleUpperCase()))
    else
      return list
  }

  /** 钱包余额 */
  const renderBalanceList = computed(() => {
    return allCurrencyData(userInfo.value?.balance).filter(
      ({ balance }) => { return !(hideZeroBalance.value && (Number(balance) === 0)) },
    )
  })

  /** 保险库余额 */
  const renderBalanceLockerList = computed(() => {
    return allCurrencyData(userInfo.value?.balance_locker)
  })

  /** 钱包弹框，下拉选择 */
  const renderCurrencyList = computed(() => {
    return allCurrencyData(userInfo.value?.balance)
  })

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

  /** 虚拟币协议格式化 */
  const allContractListData = computed(() => {
    if (allContractList.value?.length) {
      const res: Record<string, { label: string; value: string }[]> = {}
      for (const item of allContractList.value) {
        if (item.pid === '1800') {
          res[item.name] = []
        }
        else {
          const parent = allContractList.value.find(i => i.id === item.pid)
          if (parent) {
            res[parent.name]
              ? res[parent.name].push({ label: item.name, value: item.id })
              : res[parent.name] = [{ label: item.name, value: item.id }]
          }
        }
      }
      return res
    }
    return {}
  })

  const getVirtualCurrencyContractType = (currency: EnumCurrencyKey) => {
    return allContractListData.value[currency]
  }

  /** 根据协议id获取对应的名称 */
  const getVirContractName = (id: string): string => {
    return allContractList.value?.find(item => item.id === id)?.name ?? ''
  }

  return {
    currentGlobalCurrency,
    currentGlobalCurrencyBalance,
    renderBalanceList,
    renderBalanceLockerList,
    currentCurrency,
    searchValue,
    hideZeroBalance,
    renderCurrencyList,
    allContractListData,
    isVirtualCurrency,
    clearSearchValue,
    changeGlobalCurrency,
    setHideZeroBalance,
    getVirtualCurrencyContractType,
    getVirContractName,
  }
}
