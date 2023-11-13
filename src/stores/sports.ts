import type { Menu } from '~/composables/useApiMenuData'

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
  const { t } = useI18n()
  /** 体育赔率展示方式 */
  const sportsOddsType = ref(getSportsOddsType())
  /** 投注单数据 */
  const betSlipData = ref<IBetSlipData[]>([])
  /** 当前场馆ID */
  const currentProvider = ref(Local.get<string>(STORAGE_SPORTS_CURRENT_PROVIDER)?.value ?? '')
  /** 当前滚球选中的体育项目 */
  const currentLiveNav = ref(0)

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

  /** 体育计数源 */
  const { data: allSportsCount } = useRequest(() => ApiSportCount({ ic: 0 }), { manual: false })
  /** 当前滚球计数 */
  const liveCount = computed(() => {
    if (allSportsCount.value) {
      return allSportsCount.value.list.reduce((acc, cur) => {
        return acc + cur.lc
      }, 0)
    }
    return 0
  })

  /** 侧边栏数据源 */
  const { data: sidebarData } = useRequest(ApiSportSidebar, {
    manual: false,
    onSuccess(res) {
      currentLiveNav.value = res.rbl[0]?.si ?? 0
    },
  })

  /** 侧边栏菜单 */
  const sportsMenu = computed(() => {
    return [
      {
        title: '滚球盘',
        path: `/sports/${SPORTS_PLAT_ID}/live`,
        icon: 'spt-ball-plate',
        list: [],
        domId: '',
        fixtureCount: liveCount.value,
      },
      // eslint-disable-next-line max-len
      { title: '即将开赛', path: `/sports/${SPORTS_PLAT_ID}/upcoming`, icon: 'spt-timing', list: [], domId: '' },
      {
        title: '我的投注',
        path: `/sports/${SPORTS_PLAT_ID}/my-bets`,
        icon: 'spt-user-bet',
        list: [],
        domId: '',
        token: true,
      },
    ]
  })
  /** 顶级体育项目 */
  const sportHotGames = computed<Menu>(() => {
    if (sidebarData.value) {
      // eslint-disable-next-line max-len
      const topGamesObj = sidebarData.value.menu.find(a => a.menu_id === 3) ?? { list: [] }

      return topGamesObj?.list.map((sport) => {
        return {
          title: sport.sn,
          path: '',
          icon: 'spt-soccer',
          domId: `sports-hot-game-${sport.si}`,
          list: [
            // eslint-disable-next-line max-len
            { title: 'Live & Upcoming', path: `/sports/${SPORTS_PLAT_ID}/${sport.si}`, icon: 'spt-ball-plate' },
            // eslint-disable-next-line max-len
            { title: 'Outrights', path: `/sports/${SPORTS_PLAT_ID}/${sport.si}/outrights`, icon: 'spt-timing' },
            ...sport.list.map((league) => {
              return {
                title: league.cn,
                icon: 'spt-soccer',
                path: `/sports/${SPORTS_PLAT_ID}/${sport.si}/${league.ci}`,
              }
            }),
          ],
        }
      })
    }
    return []
  })
  /** 体育项目 */
  const sportGameList = computed(() => {
    if (sidebarData.value) {
      const list = sidebarData.value.all.map((item) => {
        return {
          title: item.sn,
          path: `/sports/${SPORTS_PLAT_ID}/${item.si}`,
          icon: 'spt-basketball',
        }
      })
      return [
        {
          title: '体育项目',
          path: '',
          icon: 'spt-basketball',
          list,
          domId: 'sports-game-list',
        },
      ]
    }
    return []
  })
  /** 滚球导航 */
  const sportLiveNavs = computed(() => {
    if (sidebarData.value) {
      return sidebarData.value.rbl.map((item) => {
        return {
          ...item,
          icon: 'spt-american-football',
        }
      })
    }
    return []
  })

  const sportOddType = computed(() => <Menu>[
    {
      title: `${t('sports_odds_title')}： ${t(`sports_odds_${sportsOddsType.value}`)}`,
      path: '',
      icon: 'spt-odds',
      type: 'radio',
      value: sportsOddsType.value,
      radioChange: (val: EnumSportsOddsType) => setSportsOddsType(val),
      list: AllOddsTypes,
      domId: 'sports-odds-type',
    },
  ])

  /** 切换场馆 */
  function changeProvider(id: string) {
    if (currentProvider.value === id)
      return
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
    sportOddType,
    betSlipData,
    renderOdds,
    setSportsOddsType,
    getSportsOddsType,
    currentProvider,
    providerList,
    changeProvider,
    allSportsCount,
    sidebarData,
    liveCount,
    sportsMenu,
    sportHotGames,
    sportGameList,
    sportLiveNavs,
    currentLiveNav,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSportsStore, import.meta.hot))
