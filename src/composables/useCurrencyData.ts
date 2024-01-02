import type { EnumCurrencyKey, TCurrencyObject, availableCurrency } from '~/apis/types'
import type { TTreeListType } from '~/composables/useApiMemberTreeList'

type TBankTreeType<T extends TTreeListType | string>
= T extends TTreeListType ? TTreeListType : string

/**
 * 币种 code
 */
export type CurrencyCode =
  '701' | '702' | '703' | '704' | '705' | '706' | '707' | '708' | '709' | '710' | '711' | '712' | '713' | '714' | '715' | '716' | '717' | '718' | '719' | '720' | '721' | '722' | '723' | '724' | '725' | '726' | '727' | '728' | '729' | '730' | '731' | '732'

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
  cur: CurrencyCode
  /** 银行列表 */
  bankTree: TBankTreeType<T>
  /** 货币符号 */
  prefix: string
}

interface CurrencyValue {
  prefix: string
  cur: CurrencyCode
  bankTree: string
}

export const currencyConfig: Record<EnumCurrencyKey, CurrencyValue> = {
  CNY: {
    prefix: '¥',
    cur: '701',
    bankTree: '019001',
  },
  BRL: {
    prefix: 'R$',
    cur: '702',
    bankTree: '019002',
  },
  INR: {
    prefix: '₹',
    cur: '703',
    bankTree: '019003',
  },
  VND: {
    prefix: '₫',
    cur: '704',
    bankTree: '019004',
  },
  THB: {
    prefix: '฿',
    cur: '705',
    bankTree: '019005',
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
    prefix: 'ETH',
    cur: '708',
    bankTree: '',
  },
  BNB: {
    prefix: 'BNB',
    cur: '709',
    bankTree: '',
  },
  // 新增货币
  EUR: {
    prefix: '€',
    cur: '710',
    bankTree: '019006',
  },
  JPY: {
    prefix: '¥',
    cur: '711',
    bankTree: '019007',
  },
  CAD: {
    prefix: 'CA$',
    cur: '712',
    bankTree: '019008',
  },
  ARS: {
    prefix: 'ARS',
    cur: '713',
    bankTree: '019009',
  },
  CLP: {
    prefix: 'CLP',
    cur: '714',
    bankTree: '019010',
  },
  PEN: {
    prefix: 'PEN',
    cur: '715',
    bankTree: '019011',
  },
  MXN: {
    prefix: 'MXN',
    cur: '716',
    bankTree: '019012',
  },
  LTC: {
    prefix: 'Ł',
    cur: '717',
    bankTree: '',
  },
  DOGE: {
    prefix: 'Ð',
    cur: '718',
    bankTree: '',
  },
  BCH: {
    prefix: '₿',
    cur: '719',
    bankTree: '',
  },
  XRP: {
    prefix: 'XRP',
    cur: '720',
    bankTree: '',
  },
  EOS: {
    prefix: 'EOS',
    cur: '721',
    bankTree: '',
  },
  TRX: {
    prefix: 'TRX',
    cur: '722',
    bankTree: '',
  },
  USDC: {
    prefix: 'USDC',
    cur: '723',
    bankTree: '',
  },
  APE: {
    prefix: 'APE',
    cur: '724',
    bankTree: '',
  },
  BUSD: {
    prefix: 'BUSD',
    cur: '725',
    bankTree: '',
  },
  CRO: {
    prefix: 'CRO',
    cur: '726',
    bankTree: '',
  },
  DAI: {
    prefix: 'DAI',
    cur: '727',
    bankTree: '',
  },
  LINK: {
    prefix: 'LINK',
    cur: '728',
    bankTree: '',
  },
  SAND: {
    prefix: 'SAND',
    cur: '729',
    bankTree: '',
  },
  SHIB: {
    prefix: 'SHIB',
    cur: '730',
    bankTree: '',
  },
  UNI: {
    prefix: 'UNI',
    cur: '731',
    bankTree: '',
  },
  MATIC: {
    prefix: 'MATIC',
    cur: '732',
    bankTree: '',
  },
}

/**
 * 获取货币下拉列表
 * @returns
 */
export function getCurrencyOptions() {
  const options: {
    value: CurrencyCode
    label: EnumCurrencyKey
  }[] = []
  for (const key in currencyConfig) {
    options.push({
      value: currencyConfig[key as EnumCurrencyKey].cur,
      label: key as EnumCurrencyKey,
    })
  }
  return options
}

/**
 *  获取货币配置
 * @param currency 货币类型
 * @returns
 */
export function getCurrencyConfig(currency: EnumCurrencyKey) {
  return currencyConfig[currency]
}
export function getCurrencyConfigByCode(currencyCode: CurrencyCode): {
  prefix: string
  cur: CurrencyCode
  bankTree: string
  name: EnumCurrencyKey
} {
  return Object.entries(currencyConfig)
    .map(([k, v]: [string, any]) =>
      ({ name: k, ...v })).filter(i => i.cur === currencyCode)[0]!
}

/**
 * 使用货币数据
 */
export function useCurrencyData() {
  const appStore = useAppStore()
  const {
    userInfo,
    allContractList,
    currentGlobalCurrency,
  } = storeToRefs(appStore)

  const {
    bool: hideZeroBalance,
    setBool: setHideZeroBalance,
  } = useBoolean(Local.get<boolean | undefined>(STORAGE_HIDE_ZERO_BALANCE_KEY)?.value)

  // 搜索内容
  const searchValue = ref('')

  /** 当前选择的货币,用在充值和提现的下拉列表 */
  const currentCurrency = ref(currentGlobalCurrency.value)

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
            application.isVirtualCurrency(type)
            ? ''
            : getCurrencyConfig(type).prefix} ${balanceNumber
          }`,
          cur: getCurrencyConfig(type).cur,
          bankTree: getCurrencyConfig(type).bankTree,
          prefix: getCurrencyConfig(type).prefix,
        })
      }
    }
    if (searchValue.value)
      return list.filter(({ type }) => type.includes(searchValue.value.toLocaleUpperCase()))
    else
      return list
  }

  /** 货币列表;含筛选 */
  const financeCurrencyData = (currency: availableCurrency[]) => {
    const list: CurrencyData[] = []
    for (const item of currency) {
      const type = item.currency_name
      list.push({
        type,
        balance: item.balance ?? '',
        balanceWithSymbol: `${application.isVirtualCurrency(type)
          ? ''
          : getCurrencyConfig(type).prefix} ${item.balance ?? ''}`,
        cur: item.currency_id,
        bankTree: getCurrencyConfig(type).bankTree,
        prefix: getCurrencyConfig(type).prefix,
      })
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

  /** 钱包弹框，下拉选择 */
  const renderFinanceCurrencyList = computed(() => (financeList: availableCurrency[]) => {
    return financeCurrencyData(financeList)
  })

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
    renderBalanceList,
    renderBalanceLockerList,
    currentCurrency,
    searchValue,
    hideZeroBalance,
    renderCurrencyList,
    allContractListData,
    renderFinanceCurrencyList,
    clearSearchValue,
    setHideZeroBalance,
    getVirtualCurrencyContractType,
    getVirContractName,
  }
}
