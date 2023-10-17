import { acceptHMRUpdate, defineStore } from 'pinia'
import type { EnumCurrencyKey, IMemberCurrencyConfig, TCurrencyObject } from '~/apis'
import { EnumCurrency } from '~/utils/enums'

/** 页面渲染的货币对象 */
export type IUserCurrencyList = {
  /** 货币类型 */
  type: EnumCurrencyKey
  /** 余额 */
  balance: string
  /** 带余额的前缀 */
  balanceWithSymbol: string
} & Pick<IMemberCurrencyConfig, 'cur' | 'bank_tree' | 'symbol' | 'contract_type'>

/**
 * 生成用户货币数据
 * @param currency 用户余额数据
 * @param currencyConfig 货币配置
 * @returns  {IUserCurrencyList} 前端渲染的货币对象数组
 */
export function generateCurrencyData(
  currency: TCurrencyObject,
  currencyConfig: IMemberCurrencyConfig[],
) {
  const list: IUserCurrencyList[] = []
  for (let i = 0; i < currencyConfig.length; i++) {
    const type = currencyConfig[i].cur_name
    const balance = currency[type]
    const symbol = currencyConfig[i].symbol
    const balanceWithSymbol = symbol + balance
    const cur = currencyConfig[i].cur
    const bank_tree = currencyConfig[i].bank_tree
    const contract_type = currencyConfig[i].contract_type ?? []
    list.push({
      type,
      balance,
      symbol,
      balanceWithSymbol,
      cur,
      bank_tree,
      contract_type,
    })
  }
  return list
}

export const useAppStore = defineStore('app', () => {
  /** 游戏提供商数据(PG,EVO,...) */
  const { list: platformList } = useList(ApiMemberPlatformList, {
    manual: false,
  })
  /** 是否登录，程序用这个变量来判断是否登录 */
  const { bool: isLogin, setTrue: setLoginTrue, setFalse: setLoginFalse } = useBoolean(!!getToken())
  /** 用户余额数据 */
  const {
    data: balanceMap,
    runAsync: updateUserBalance,
  } = useRequest(ApiMemberBalanceList, {
    ready: isLogin,
    manual: false,
  })
  /** 货币配置 */
  const { data: currencyConfig } = useRequest(ApiMemberCurrencyConfig, {
    manual: false,
  })
  /** 用户信息 */
  const { data: userInfo, runAsync: updateUserInfo } = useRequest(ApiMemberDetail, {
    ready: isLogin,
    manual: false,
  })
  const visibility = useDocumentVisibility()

  /** 当前全局选择的货币 */
  const currentGlobalCurrency = ref<EnumCurrencyKey>(EnumCurrency[0] as EnumCurrencyKey)

  /**
   * 用户货币数据
   *
   * 结合货币配置和用户余额数据，计算出用户各个货币的余额
   * @returns {IUserCurrencyList}
   */
  const userCurrencyList = computed(() => {
    if (balanceMap.value && currencyConfig.value)
      return generateCurrencyData(balanceMap.value, currencyConfig.value)

    return []
  })

  /** 当前选择货币的金额 */
  const currentGlobalCurrencyBalance = computed(() => {
    const balance = userCurrencyList.value.find(item => item.type === currentGlobalCurrency.value)?.balanceWithSymbol ?? '-'
    return balance
  })

  function setToken(token: string) {
    // 将token加密后存储到本地
    const _token = window.btoa(token)
    Local.set(STORAGE_TOKEN_KEY, _token)
    setLoginTrue()
  }

  function getToken() {
    const _token = Local.get<string | undefined>(STORAGE_TOKEN_KEY)?.value
    if (_token)
      return window.atob(_token)
    else
      return undefined
  }

  function removeToken() {
    Local.remove(STORAGE_TOKEN_KEY)
    setLoginFalse()
  }

  /** 判断输入金额是否足够 */
  function isBalanceEnough(amount: number, currency: EnumCurrency) {
    return true
  }

  /**
   * 改变当前全局选择的货币
   * @param {EnumCurrencyKey} currency
   */
  function changeCurrentGlobalCurrency(currency: EnumCurrencyKey) {
    currentGlobalCurrency.value = currency
  }

  watch(visibility, (bool) => {
    // 如果页面可见，更新用户余额和用户信息
    if (bool === 'visible') {
      updateUserBalance()
      updateUserInfo()
    }
  })

  watch(userInfo, () => {
    // 如果有uid，连接socket
    if (userInfo.value?.uid)
      socketClient.connect()
  })

  return {
    isLogin,
    platformList,
    currentGlobalCurrency,
    userCurrencyList,
    currentGlobalCurrencyBalance,
    userInfo,
    currencyConfig,
    setToken,
    setLoginTrue,
    setLoginFalse,
    removeToken,
    getToken,
    isBalanceEnough,
    changeCurrentGlobalCurrency,
    updateUserInfo,
    updateUserBalance,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
