import type { EnumLanguageKeys } from '~/modules/i18n'

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
  clazz?: string
}

export type Menu = Array<MenuItem>

export function useApiMenuData() {
  const { openWalletDialog } = useWalletDialog()
  const { openSafeDialog } = useSafeDialog()
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
  const { casinoSidebar: casinoGameList } = storeToRefs(useCasinoStore())
  const languageStore = useLanguageStore()
  const { userLanguage, AllLanguages } = storeToRefs(languageStore)
  const { openService } = useService()

  // casino
  const casinoMenu = computed<Menu>(() => [
    {
      title: t('sports_tab_favourites'),
      path: '/casino/favourites',
      icon: 'chess-star',
      list: [],
      domId: '',
      token: true,
    },
    {
      title: t('recent_game_record'),
      path: '/casino/recent',
      icon: 'chess-game-record',
      list: [],
      domId: '',
      token: true,
    },
    {
      title: t('my_bets'),
      path: '/casino/my-bets?type=casino',
      icon: 'spt-user-bet',
      list: [],
      domId: '',
      token: true,
    },
  ])
  const casinoGameProvider = computed<Menu>(() => [{ title: t('casino_provider'), path: '/casino/collection/provider', icon: 'chess-game-provider', list: [], domId: '' }])

  const getActiveShown = computed(() => {
    return (shown: string) => rightIsExpand.value
    && shown === currentRightSidebarContent.value
  })
  const staticMenu1 = computed(() => <Menu>[
    isLogin.value
      ? {
          title: t('profile'),
          path: '',
          icon: 'navbar-user',
          list: [
            {
              title: t('wallet'),
              path: '',
              icon: 'navbar-wallet',
              // modalQuery: { modal: 'vault', operation: 'deposit' },
              callBack: () => {
                openWalletDialog()
              },
            },
            {
              title: t('safe'),
              path: '',
              icon: 'navbar-cart',
              callBack: () => openSafeDialog(),
            },
            {
              title: 'VIP',
              path: '/vip/promotion-bonus',
              icon: 'chess-vipclub',
            },
            {
              title: t('statistical_data'),
              path: '',
              icon: 'uni-trend',
              callBack: () => openStatisticsDialog(),
            },
            {
              title: t('notification'),
              path: '',
              icon: 'tabbar-bet',
              callBack: () => {
                getActiveShown.value(EnumRightSidebarContent.NOTIFICATION)
                  ? closeRightSidebar()
                  : openRightSidebar(EnumRightSidebarContent.NOTIFICATION)
              },
            },

            // { title: t('sports_betting'), path: `/sports/${SPORTS_PLAT_ID}/my-bets?type=sports`, icon: 'spt-basketball' },
            { title: t('setting'), path: '/settings/general', icon: 'uni-set' },
            {
              title: t('logout'),
              path: '',
              icon: 'uni-logout',
              callBack: () => openLogoutDialog(),
              clazz: 'has-line',
            },
          ],
          domId: 'static-menu-user',
        }
      : undefined,
    {
      title: t('promo_activity'),
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
        {
          title: t('view_all'),
          path: '/promotions',
          icon: 'chess-gameshow',
          clazz: 'has-line',
        },
      ],
      domId: 'static-menu-promotion',
    },
    {
      title: t('affiliate'),
      path: '/affiliate/promotion-tutorial',
      icon: 'chess-affiliate',
      list: [],
      domId: '',
    },
    {
      title: `VIP ${t('club')}`,
      path: '/vip-club',
      icon: 'chess-vipclub',
      list: [],
      domId: '',
    },
    // { title: t('blog'), path: '/blog', icon: 'chess-blog', list: [], domId: '' },
    // { title: t('chat_forum'), path: '', icon: 'tabbar-chat', list: [], domId: '' },
  ].filter(i => i !== void 0))
  const staticMenu2 = computed(() => <Menu>[
    {
      title: t('sponsor_activity'),
      path: '',
      icon: 'spt-sponsorship',
      list: [
        // { title: '赞助活动一', path: '/drake', icon: '' },
        // { title: '赞助活动二', path: '/sponsorships/ufc', icon: '' },
        // { title: '赞助活动三', path: '', icon: '' },
      ],
      domId: 'static-menu-sponsor',
    },
    {
      title: t('responsible_casino'),
      path: '/responsible-gambling',
      icon: 'spt-secure',
      list: [],
      domId: '',
    },
    {
      title: t('online_support'),
      path: '',
      icon: 'spt-online-support',
      list: [],
      domId: '',
      callBack: () => openService(),
    },
    {
      title: `
        ${t('language_title')}${userLanguage.value === 'en-US' ? '：' : ': '}
        ${AllLanguages.value.filter(a => a.value === userLanguage.value)[0]?.title}
      `,
      path: '',
      icon: 'spt-odds',
      type: 'radio',
      value: userLanguage.value,
      radioChange: (val: EnumLanguageKeys) => languageStore.changeLanguage(val),
      list: AllLanguages.value,
      domId: 'static-menu-language',
    },
  ])

  const router = useLocalRouter()

  const { closeLeftSidebar, openLeftSidebar, leftIsExpand } = useLeftSidebar()

  const { isMobile, isLessThanLg } = storeToRefs(useWindowStore())
  const menuStore = useMenuStore()

  function menuItemClick(item: MenuItem) {
    Local.set(STORAGE_MENU_EXPAND_DOMID, item.domId || '')
    if (item.path && item.path.length) {
      if ((isMobile.value || isLessThanLg.value) && leftIsExpand.value) {
        closeLeftSidebar(() => {
          router.push(replaceSportsPlatId(item.path!))
        })
      }
      else {
        router.push(replaceSportsPlatId(item.path))
      }
      menuStore.setSideBigActiveMenu(item.path)
    }
    else if (item.list && item.list.length) {
      openLeftSidebar()
    }
    else if (item.callBack) {
      item.callBack()
    }
    // else if (item.modalQuery) {
    // if (isMobile.value)
    //   closeLeftSidebar()
    // router.push({
    //   path: route.path,
    //   query: { ...route.query, ...item.modalQuery },
    // })
    // }
  }

  return {
    casinoMenu,
    casinoGameList,
    casinoGameProvider,
    staticMenu1,
    staticMenu2,
    menuItemClick,
  }
}
