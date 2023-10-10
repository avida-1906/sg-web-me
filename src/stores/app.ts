import { acceptHMRUpdate, defineStore } from 'pinia'
import type { EnumCurrencyKey } from '~/apis'
import { EnumCurrency } from '~/utils/enums'

/** 页面渲染的货币对象 */
export interface IUserCurrencyList {
  /** 货币类型 */
  type: EnumCurrencyKey
  /** 余额 */
  balance: string
  /** 前缀 */
  symbol: string
  /** 带余额的前缀 */
  balanceWithSymbol: string
}

export const useAppStore = defineStore('app', () => {
  /** 游戏提供商数据(PG,EVO,...) */
  const { list: platformList } = useList(ApiMemberPlatformList, {
    manual: false,
  })
  /** 是否登录，程序用这个变量来判断是否登录 */
  const { bool: isLogin, setTrue: setLoginTrue, setFalse: setLoginFalse } = useBoolean(!!getToken())
  /** 用户余额数据 */
  const { data: balanceMap } = useRequest(ApiMemberBalanceList, {
    ready: isLogin,
    manual: false,
  })
  /** 货币配置 */
  const { data: currencyConfig } = useRequest(ApiMemberCurrencyConfig, {
    manual: false,
  })
  /** 用户信息 */
  const { data: userInfo } = useRequest(ApiMemberDetail, {
    ready: isLogin,
    manual: false,
  })

  /** 当前全局选择的货币 */
  const currentGlobalCurrency = ref<EnumCurrencyKey>(EnumCurrency[0] as EnumCurrencyKey)

  /**
   * 用户货币数据
   *
   * 结合货币配置和用户余额数据，计算出用户各个货币的余额
   * @returns {IUserCurrencyList}
   */
  const userCurrencyList = computed(() => {
    const list: IUserCurrencyList[] = []
    if (balanceMap.value && currencyConfig.value) {
      for (let i = 0; i < currencyConfig.value.length; i++) {
        const type = currencyConfig.value[i].cur_name
        const balance = balanceMap.value[type]
        const symbol = currencyConfig.value[i].symbol
        const balanceWithSymbol = symbol + balance
        list.push({
          type,
          balance,
          symbol,
          balanceWithSymbol,
        })
      }
    }
    return list
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

  watchEffect(() => {
    console.log('balanceMap', balanceMap.value, currencyConfig.value, userCurrencyList.value)
  })

  return {
    isLogin,
    platformList,
    currentGlobalCurrency,
    userCurrencyList,
    currentGlobalCurrencyBalance,
    userInfo,
    setToken,
    setLoginTrue,
    setLoginFalse,
    removeToken,
    getToken,
    isBalanceEnough,
    changeCurrentGlobalCurrency,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
