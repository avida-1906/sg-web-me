import type { EnumLanguage } from '~/utils/enums'

export interface MenuItem {
  title: string
  icon: string
  path?: string
  list?: Menu
  domId?: string
  token?: boolean
  modalQuery?: { [k: string]: any }
  type?: 'radio'
  value?: any
  radioChange?: (val: any) => void
  fixtureCount?: number
  callBack?: () => void
  useCloudImg?: boolean
}

export type Menu = Array<MenuItem>

export function useApiMenuData() {
  const { openWalletDialog } = useWalletDialog()
  const { openSafeDialog } = useSafeDialog()
  const { openVipDialog } = useVipDialog()
  const { openStatisticsDialog } = useStatisticsDialog()
  const { openLogoutDialog } = useLogoutDialog()
  const {
    openRightSidebar,
    closeRightSidebar,
    rightIsExpand,
    currentRightSidebarContent,
  } = useRightSidebar()

  const appStore = useAppStore()
  const { t } = useI18n()
  const { isLogin } = storeToRefs(appStore)
  const { casinoGameList } = storeToRefs(useCasinoStore())
  const languageStore = useLanguageStore()
  const { userLanguage, AllLanguages } = storeToRefs(languageStore)

  // casino
  const casinoMenu = ref<Menu>([
    {
      title: '收藏夹',
      path: '/casino/favourites',
      icon: 'chess-star',
      list: [],
      domId: '',
      token: true,
    },
    {
      title: '近期游戏记录',
      path: '/casino/recent',
      icon: 'chess-game-record',
      list: [],
      domId: '',
      token: true,
    },
  ])
  const casinoGameProvider = ref<Menu>([{ title: '游戏提供商', path: '/casino/collection/provider', icon: 'chess-game-provider', list: [], domId: '' }])

  // sports
  const sportHotGames = ref<Menu>([
    {
      title: '足球',
      path: '',
      icon: 'spt-soccer',
      list: [
        { title: 'Live & Upcoming', path: '', icon: 'spt-ball-plate' },
        { title: 'Outrights', path: '', icon: 'spt-timing' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
      ],
      domId: 'sports-hot-game-football',
    },
    {
      title: '网球',
      path: '',
      icon: 'spt-tennis',
      list: [
        { title: 'Live & Upcoming', path: '', icon: 'spt-ball-plate' },
        { title: 'Outrights', path: '', icon: 'spt-timing' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
      ],
      domId: 'sports-hot-game-tennis',
    },
    {
      title: '美式橄榄球',
      path: '',
      icon: 'spt-american-football',
      list: [
        { title: 'Live & Upcoming', path: '', icon: 'spt-ball-plate' },
        { title: 'Outrights', path: '', icon: 'spt-timing' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
      ],
      domId: 'sports-hot-game-use-football',
    },
    {
      title: '棒球',
      path: '',
      icon: 'spt-baseball',
      list: [
        { title: 'Live & Upcoming', path: '', icon: 'spt-ball-plate' },
        { title: 'Outrights', path: '', icon: 'spt-timing' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
      ],
      domId: 'sports-hot-game-use-baseball',
    },
    {
      title: '篮球',
      path: '',
      icon: 'spt-basketball',
      list: [
        { title: 'Live & Upcoming', path: '', icon: 'spt-ball-plate' },
        { title: 'Outrights', path: '', icon: 'spt-timing' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
      ],
      domId: 'sports-hot-game-use-basketball',
    },
  ])
  const sportEsports = ref<Menu>([
    {
      title: '所有电子竞技',
      path: '',
      icon: 'spt-all-esports',
      list: [
        { title: '彩虹六号', path: '', icon: '' },
        { title: '传说对决', path: '', icon: '' },
        { title: '刀塔2', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
        { title: '激斗峡谷', path: '', icon: '' },
      ],
      domId: 'sports-e-sports',
    },
  ])

  const getActiveShown = computed(() => {
    return (shown: string) => rightIsExpand.value
    && shown === currentRightSidebarContent.value
  })
  const staticMenu1 = computed(() => <Menu>[
    isLogin.value
      ? {
          title: '个人资料',
          path: '',
          icon: 'navbar-user',
          list: [
            {
              title: '钱包',
              path: '',
              icon: 'navbar-wallet',
              // modalQuery: { modal: 'vault', operation: 'deposit' },
              callBack: () => {
                openWalletDialog()
              },
            },
            {
              title: '保险库',
              path: '',
              icon: 'navbar-cart',
              callBack: () => openSafeDialog(),
            },
            {
              title: 'VIP',
              path: '',
              icon: 'chess-air-bonus',
              callBack: () => openVipDialog(),
            },
            {
              title: '统计数据',
              path: '',
              icon: 'uni-trend',
              callBack: () => openStatisticsDialog(),
            },
            {
              title: '通知',
              path: '',
              icon: 'tabbar-bet',
              callBack: () => {
                getActiveShown.value(EnumRightSidebarContent.NOTIFICATION)
                  ? closeRightSidebar()
                  : openRightSidebar(EnumRightSidebarContent.NOTIFICATION)
              },
            },
            // eslint-disable-next-line max-len
            { title: '体育投注', path: `/sports/${SPORTS_PLAT_ID}/my-bets`, icon: 'spt-basketball' },
            { title: '设置', path: '/settings/general', icon: 'uni-set' },
            {
              title: '登出',
              path: '',
              icon: 'uni-logout',
              callBack: () => openLogoutDialog(),
            },
          ],
          domId: 'static-menu-user',
        }
      : undefined,
    {
      title: '促销活动',
      path: '',
      icon: 'chess-gameshow',
      list: [
        { title: '推荐活动一', path: '', icon: 'navbar-user' },
        { title: '推荐活动二', path: '', icon: 'navbar-user' },
        {
          title: '推荐活动三',
          path: '/promotions/promotion/weekly-giveaway',
          icon: 'navbar-user',
        },
        { title: '查看全部', path: '/promotions', icon: 'navbar-user' },
      ],
      domId: 'static-menu-promotion',
    },
    {
      title: '联盟计划',
      path: '/affiliate/promotion-tutorial',
      icon: 'chess-affiliate',
      list: [],
      domId: '',
    },
    { title: 'VIP 俱乐部', path: '/vip-club', icon: 'chess-vipclub', list: [], domId: '' },
    { title: '博客', path: '/blog', icon: 'chess-blog', list: [], domId: '' },
    { title: '论坛', path: '', icon: 'tabbar-chat', list: [], domId: '' },
  ].filter(i => i !== undefined))
  const staticMenu2 = computed(() => <Menu>[
    {
      title: '赞助活动',
      path: '',
      icon: 'spt-sponsorship',
      list: [
        { title: '赞助活动一', path: '/drake', icon: '' },
        { title: '赞助活动二', path: '/sponsorships/ufc', icon: '' },
        { title: '赞助活动三', path: '', icon: '' },
      ],
      domId: 'static-menu-sponsor',
    },
    {
      title: '负责任博彩',
      path: '/responsible-gambling',
      icon: 'spt-secure',
      list: [],
      domId: '',
    },
    { title: '在线支持', path: '', icon: 'spt-online-support', list: [], domId: '' },
    {
      title: `${t('language_title')}： ${t('language_current')}`,
      path: '',
      icon: 'spt-odds',
      type: 'radio',
      value: userLanguage.value,
      radioChange: (val: EnumLanguage) => languageStore.changeLanguage(val),
      list: AllLanguages.value,
      domId: 'static-menu-language',
    },
  ])

  const router = useRouter()

  const route = useRoute()

  const { closeLeftSidebar, openLeftSidebar, leftIsExpand } = useLeftSidebar()

  const { isMobile, isLessThanLg } = storeToRefs(useWindowStore())

  function menuItemClick(item: MenuItem) {
    Local.set(STORAGE_MENU_EXPAND_DOMID, item.domId || '')
    if (item.path && item.path.length) {
      if ((isMobile.value || isLessThanLg.value) && leftIsExpand.value)
        closeLeftSidebar()

      router.push(Sports.replaceSportsPlatId(item.path))
    }
    else if (item.list && item.list.length) {
      openLeftSidebar()
    }
    else if (item.callBack) {
      item.callBack()
    }
    else if (item.modalQuery) {
      if (isMobile.value)
        closeLeftSidebar()
      router.push({
        path: route.path,
        query: { ...route.query, ...item.modalQuery },
      })
    }
  }

  return {
    casinoMenu,
    casinoGameList,
    casinoGameProvider,
    sportHotGames,
    sportEsports,
    staticMenu1,
    staticMenu2,
    menuItemClick,
  }
}
