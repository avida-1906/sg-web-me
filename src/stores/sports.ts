enum EnumSportsPanelType {
  /** 三项投注 */
  THREE = 'THREE',
  /** 标准 */
  STANDARD = 'STANDARD',
}

export const useSportsStore = defineStore('sports', () => {
  /** 体育数据展示方式 */
  const sportsPanelType = ref(getSportsPanelType())

  function setSportsPanelType(type: EnumSportsPanelType) {
    sportsPanelType.value = type
    Local.set(STORAGE_SPORTS_PANEL_TYPE_KEY, type)
  }

  function getSportsPanelType() {
    const value = Local.get<EnumSportsPanelType>(STORAGE_SPORTS_PANEL_TYPE_KEY)?.value
    if (value)
      return value
    else
      return EnumSportsPanelType.STANDARD
  }

  return {
    sportsPanelType,
    setSportsPanelType,
    getSportsPanelType,
  }
})
