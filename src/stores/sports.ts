export enum EnumSportsPanelType {
  /** 三项投注 */
  THREE = 'THREE',
  /** 标准 */
  STANDARD = 'STANDARD',
}

export enum EnumSportsOddsType {
  /** 小数式 */
  DECIMAL = 'DECIMAL',
  /** 分数式 */
  FRACTION = 'FRACTION',
  /** 美式 */
  AMERICAN = 'AMERICAN',
  /** 印尼格式 */
  INDONESIA = 'INDONESIA',
  /** 马来格式 */
  MALAYSIA = 'MALAYSIA',
  /** 香港格式 */
  HONGKONG = 'HONGKONG',
}

/** 投注单数据格式 */
interface IBetSlipData {
  // 测试
  [key: string]: any
}

export const AllOddsTypes: Array<{
  title: string
  path: string
  icon: string
  value: EnumSportsOddsType
}> = [
  { title: '小数式', path: '', icon: '', value: EnumSportsOddsType.DECIMAL },
  { title: '分数式', path: '', icon: '', value: EnumSportsOddsType.FRACTION },
  { title: '美式', path: '', icon: '', value: EnumSportsOddsType.AMERICAN },
  { title: '印尼格式', path: '', icon: '', value: EnumSportsOddsType.INDONESIA },
  { title: '香港格式', path: '', icon: '', value: EnumSportsOddsType.HONGKONG },
  { title: '马来格式', path: '', icon: '', value: EnumSportsOddsType.MALAYSIA },
]

export const useSportsStore = defineStore('sports', () => {
  /** 体育赔率展示方式 */
  const sportsOddsType = ref(getSportsOddsType())
  /** 投注单数据 */
  const betSlipData = ref<IBetSlipData[]>([])
  /** 当前场馆ID */
  const currentProvider = ref(Local.get<string>(STORAGE_SPORTS_CURRENT_PROVIDER)?.value ?? '')

  /** 获取场馆列表 */
  const {
    run: runSportsProvider,
    data: sportsProviderData,
  } = useList(ApiMemberPlatformList, {
    onSuccess(res) {
      if (res.d && !Local.get<string>(STORAGE_SPORTS_CURRENT_PROVIDER)) {
        currentProvider.value = res.d[0].id
        Local.set(STORAGE_SPORTS_CURRENT_PROVIDER, res.d[0].id)
      }
    },
  })
  runSportsProvider({ game_type: 4 })

  /** 场馆列表 */
  const providerList = computed(() => {
    return sportsProviderData.value && sportsProviderData.value.d
      ? sportsProviderData.value.d
      : []
  })

  /** 切换场馆 */
  function changeProvider(id: string) {
    currentProvider.value = id
    Local.set(STORAGE_SPORTS_CURRENT_PROVIDER, id)
  }

  /** 渲染赔率 */
  const renderOdds = (odds: number) => {
    return computed(() => {
      return Number(SportsOdds.convert(odds, sportsOddsType.value))
    })
  }

  /** 设置当前体育赔率展示方式 */
  function setSportsOddsType(type: EnumSportsOddsType) {
    sportsOddsType.value = type
    Local.set(STORAGE_SPORTS_ODDS_TYPE_KEY, type)
  }

  /** 获取当前体育赔率展示方式 */
  function getSportsOddsType() {
    const value = Local.get<EnumSportsOddsType>(STORAGE_SPORTS_ODDS_TYPE_KEY)?.value
    if (value)
      return value
    else
      return EnumSportsOddsType.DECIMAL
  }

  return {
    sportsOddsType,
    betSlipData,
    renderOdds,
    setSportsOddsType,
    getSportsOddsType,
    currentProvider,
    providerList,
    changeProvider,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSportsStore, import.meta.hot))
