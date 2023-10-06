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

export const useSportsStore = defineStore('sports', () => {
  /** 体育页面展示方式 */
  const sportsPanelType = ref(getSportsPanelType())
  /** 体育赔率展示方式 */
  const sportsOddsType = ref(getSportsOddsType())
  /** 投注单数据 */
  const betSlipData = ref<IBetSlipData[]>([])

  /** 设置当前体育数据展示方式 */
  function setSportsPanelType(type: EnumSportsPanelType) {
    sportsPanelType.value = type
    Local.set(STORAGE_SPORTS_PANEL_TYPE_KEY, type)
  }

  /** 获取当前体育数据展示方式 */
  function getSportsPanelType() {
    const value = Local.get<EnumSportsPanelType>(STORAGE_SPORTS_PANEL_TYPE_KEY)?.value
    if (value)
      return value
    else
      return EnumSportsPanelType.STANDARD
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
    sportsPanelType,
    sportsOddsType,
    betSlipData,
    setSportsPanelType,
    getSportsPanelType,
    setSportsOddsType,
    getSportsOddsType,
  }
})
