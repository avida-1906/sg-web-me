// const vipIconMap = ['', 'chat-star-1']

export function useVipInfo() {
  const appStore = useAppStore()

  const { userInfo, vipConfigData } = storeToRefs(appStore)

  const vip = computed(() => userInfo.value?.vip ?? '0')
  const score = computed(() => userInfo.value && +userInfo.value >= 0 ? +userInfo.value : 0)

  const prevLevel = computed(() => {
    if (vipConfigData.value)
      return vipConfigData.value[`v${+vip.value - 1}`]
  })
  const currentLevel = computed(() => {
    if (vipConfigData.value)
      return vipConfigData.value[`v${vip.value}`]
  })
  const nextLevel = computed(() => {
    if (vipConfigData.value)
      return vipConfigData.value[`v${+vip.value + 1}`]
  })
  const isMinLevel = computed(() => !(+vip.value > 0))
  const isMaxLevel = computed(() => nextLevel.value === undefined)
  const progress = computed(() => {
    if (nextLevel.value)
      return floor(score.value / +nextLevel.value.score, 1)
    return 100
  })

  return {
    vip,
    score,
    prevLevel,
    currentLevel,
    nextLevel,
    isMinLevel,
    isMaxLevel,
    progress,
  }
}
