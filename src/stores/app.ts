import { acceptHMRUpdate, defineStore } from 'pinia'
import type { EnumCurrencyKey } from '~/apis/types'

export const useAppStore = defineStore('app', () => {
  /** 当前全局选择的货币 */
  const currentGlobalCurrency = ref<EnumCurrencyKey>(getLocalCurrentGlobalCurrency())

  /** 是否登录，程序用这个变量来判断是否登录 */
  const { bool: isLogin, setTrue: setLoginTrue, setFalse: setLoginFalse } = useBoolean(!!getToken())
  /** 用户信息 */
  const { data: _userInfo, runAsync: updateUserInfo } = useRequest(ApiMemberDetail, {
    ready: isLogin,
    manual: false,
  })
  /** 获取所有虚拟币协议 */
  const {
    data: allContractList,
  } = useApiMemberTreeList('018')
  /** 获取用户余额 */
  const { data: balanceData, runAsync: getBalanceData } = useRequest(ApiMemberBalance, {
    ready: isLogin,
    manual: false,
    throttleInterval: 1500,
    throttleOptions: {
      leading: true,
      trailing: false,
    },
  })
  /** 获取用户锁定余额 */
  const { data: lockerData, runAsync: getLockerData } = useRequest(ApiMemberBalanceLocker)
  const { data: brandPcDetail } = useRequest(ApiMemberBrandDetail, {
    manual: false,
    defaultParams: [
      {
        tag: 'pc',
      },
    ],
  })

  /** 公司信息 */
  const companyData = ref({
    name: 'Meibo',
    copyright: '2024 Meibo.com',
    email: 'support@meibo.com',
    // 合作伙伴邮箱
    partnerEmail: 'partners@meibo.com',
    // 新闻媒体邮箱
    newsEmail: 'press@meibo.com',
  })
  /**
   * Logo，Ico，Loading 图片
   */
  const logoAndIcoAndLoading = computed(() => {
    if (!brandPcDetail.value) {
      return {
        logo_white: '',
        logo_gray: '',
        ico: '',
        loadingImgUrl: '',
      }
    }

    const pcInfo = brandPcDetail.value

    return {
      logo_white: pcInfo?.logo_white,
      logo_gray: pcInfo?.logo_gray,
      ico: pcInfo?.icon || '',
      loadingImgUrl: pcInfo?.loading?.image,
    }
  })

  const icoUrl = computed(() => logoAndIcoAndLoading.value.ico)
  const visibility = useDocumentVisibility()
  const mqttConnectSuccessBus = useEventBus(MQTT_CONNECT_SUCCESS_BUS)
  const mqttDisconnectBus = useEventBus(MQTT_DISCONNECT_BUS)

  useIco(icoUrl)

  /** MQTT是否已连接 */
  const { bool: mqttIsConnected, setTrue: setMqttConnectedTrue, setFalse: setMqttConnectedFalse } = useBoolean(false)

  /** 汇率列表 */
  const {
    run: runGetExchangeRate,
    data: exchangeRateData,
  } = useRequest(ApiMemberExchangeRate, {
    manual: false,
  })

  const { run: runGetVipConfig, data: vipConfigData } = useRequest(ApiMemberVipConfig, {
    ready: isLogin,
    manual: false,
  })

  const userInfo = computed(() => {
    if (balanceData.value && _userInfo.value)
      _userInfo.value.balance = balanceData.value

    if (lockerData.value && _userInfo.value)
      _userInfo.value.balance_locker = lockerData.value

    return _userInfo.value
  })

  /** 用户当前选择的货币余额, 带有符号前缀 */
  const currentGlobalCurrencyBalance = computed(() => {
    const currency = currentGlobalCurrency.value
    const balance = userInfo.value?.balance[currency]
    // const symbol = application.isVirtualCurrency(currency)
    //   ? ''
    //   : currencyConfig[currency].prefix
    return balance || 0
  })

  /** 用户当前选择的货币余额, 数字 */
  const currentGlobalCurrencyBalanceNumber = computed(() => {
    const currency = currentGlobalCurrency.value
    const balance = userInfo.value?.balance[currency]
    return balance ? Number(balance) : 0
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

  function removeUserInfo() {
    _userInfo.value = undefined
  }

  /** 获取本地存储的当前全局选择的货币 */
  function getLocalCurrentGlobalCurrency(): EnumCurrencyKey {
    const currency = Local.get<
      EnumCurrencyKey
    >(STORAGE_CURRENT_GLOBAL_CURRENCY_KEY)?.value

    if (currency)
      return currency
    else
      return EnumCurrency[6] as EnumCurrencyKey
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

  watch(visibility, (bool) => {
    // 如果页面可见，更新用户余额
    if (bool === 'visible' && isLogin.value)
      getBalanceData()
  })

  onMounted(() => {
    mqttConnectSuccessBus.on(() => {
      console.log('设置mqtt连接成功')
      setMqttConnectedTrue()
    })
    mqttDisconnectBus.on(() => {
      console.log('设置mqtt连接失败')
      setMqttConnectedFalse()
    })
  })

  return {
    isLogin,
    userInfo,
    mqttIsConnected,
    allContractList,
    exchangeRateData,
    currentGlobalCurrency,
    vipConfigData,
    currentGlobalCurrencyBalance,
    currentGlobalCurrencyBalanceNumber,
    brandPcDetail,
    companyData,
    logoAndIcoAndLoading,
    setToken,
    setLoginTrue,
    setLoginFalse,
    removeToken,
    getToken,
    updateUserInfo,
    removeUserInfo,
    setMqttConnectedTrue,
    setMqttConnectedFalse,
    getBalanceData,
    runGetExchangeRate,
    getLockerData,
    runGetVipConfig,
    changeGlobalCurrency,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
