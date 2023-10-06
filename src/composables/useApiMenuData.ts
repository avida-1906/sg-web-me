import { changeLanguage } from '~/modules/i18n'
import { EnumLanguage } from '~/utils/enums'

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
}

export type Menu = Array<MenuItem>

export function useApiMenuData() {
  const { locale } = useI18n()

  // casino
  const casinoMenu = ref<Menu>([
    { title: '收藏夹', path: '/casino/favourites', icon: 'chess-star', list: [], domId: '', token: true },
    { title: '近期游戏记录', path: '/casino/recent', icon: 'chess-game-record', list: [], domId: '', token: true },
    { title: '挑战', path: '/casino/challenges', icon: 'chess-challenge', list: [], domId: '' },
  ])
  const casinoGameList = ref<Menu>([
    { title: '老虎机', path: '/casino/group/slot', icon: 'chess-slot-machine', list: [], domId: '' },
    { title: '真人娱乐场', path: '/casino/group/live', icon: 'chess-live-casino', list: [], domId: '' },
    { title: '游戏节目', path: '/casino/group/game-shows', icon: 'chess-gameshow', list: [], domId: '' },
    { title: '新游戏', path: '/casino/group/new-releases', icon: 'chess-newgame', list: [], domId: '' },
    { title: '可购买奖励回合', path: '/casino/group/feature-buy-in', icon: 'chess-bonus-rounds', list: [], domId: '' },
    { title: 'RTP 增强化', path: '/casino/group/enhanced-rtp', icon: 'chess-rtp', list: [], domId: '' },
  ])
  const casinoGameProvider = ref<Menu>([{ title: '游戏提供商', path: '/casino/collection/provider', icon: 'chess-game-provider', list: [], domId: '' }])

  // sports
  const sportsMenu = ref<Menu>([
    { title: '滚球盘', path: '/sports/live', icon: 'spt-ball-plate', list: [], domId: '' },
    { title: '即将开赛', path: '/sports/upcoming', icon: 'spt-timing', list: [], domId: '' },
    { title: '我的投注', path: '/sports/my-bets', icon: 'spt-user-bet', list: [], domId: '', token: true },
  ])
  const sportHotGames = ref<Menu>([
    {
      title: '足球',
      path: '',
      icon: 'spt-football',
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
      icon: 'spt-america',
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
  const sportGameList = ref<Menu>([
    {
      title: '体育项目',
      path: '',
      icon: 'spt-basketball',
      list: [
        { title: '澳洲足球', path: '', icon: '' },
        { title: '板球', path: '', icon: '' },
        { title: '棒球', path: '', icon: '' },
        { title: '足球', path: '', icon: '' },
        { title: '篮球', path: '', icon: '' },
        { title: '桌球', path: '', icon: '' },
        { title: '登山', path: '', icon: '' },
      ],
      domId: 'sports-game-list',
    },
  ])
  const sportOddType = ref<Menu>([
    {
      title: '赔率：',
      path: '',
      icon: 'spt-odds',
      list: [
        { title: '小数式', path: '', icon: '' },
        { title: '分数式', path: '', icon: '' },
        { title: '美式', path: '', icon: '' },
        { title: '印尼格式', path: '', icon: '' },
        { title: '香港格式', path: '', icon: '' },
        { title: '马来格式', path: '', icon: '' },
      ],
      domId: 'sports-odd-type',
    },
  ])

  const staticMenu1 = ref<Menu>([
    {
      title: '个人资料',
      path: '',
      icon: 'navbar-user',
      list: [
        { title: '钱包', path: '', icon: 'navbar-wallet', modalQuery: { modal: 'vault', operation: 'deposit' } },
        { title: '保险库', path: '', icon: 'navbar-cart' },
        { title: 'VIP', path: '', icon: 'chess-air-bonus' },
        { title: '统计数据', path: '', icon: 'uni-trend' },
        { title: '通知', path: '', icon: 'tabbar-bet' },
        { title: '体育投注', path: '/sports/my-bets', icon: 'spt-basketball' },
        { title: '设置', path: '/settings/general', icon: 'uni-set' },
        { title: '登出', path: '', icon: 'uni-logout' },
      ],
      domId: 'static-menu-user',
    },
    {
      title: '促销活动',
      path: '',
      icon: 'chess-gameshow',
      list: [
        { title: '推荐活动一', path: '', icon: 'navbar-user' },
        { title: '推荐活动二', path: '', icon: 'navbar-user' },
        { title: '推荐活动三', path: '/promotions/promotion/weekly-giveaway', icon: 'navbar-user' },
        { title: '查看全部', path: '/promotions', icon: 'navbar-user' },
      ],
      domId: 'static-menu-promotion',
    },
    { title: '联盟计划', path: '/affiliate/overview', icon: 'chess-affiliate', list: [], domId: '' },
    { title: 'VIP俱乐部', path: '/vip-club', icon: 'chess-vipclub', list: [], domId: '' },
    { title: '博客', path: '/blog', icon: 'chess-blog', list: [], domId: '' },
    { title: '论坛', path: '', icon: 'tabbar-chat', list: [], domId: '' },
  ])
  const staticMenu2 = ref<Menu>([
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
    { title: '负责任博彩', path: '/responsible-gambling', icon: 'spt-secure', list: [], domId: '' },
    { title: '在线支持', path: '', icon: 'spt-online-support', list: [], domId: '' },
    {
      title: '语言：',
      path: '',
      icon: 'spt-odds',
      type: 'radio',
      value: EnumLanguage[locale.value as any],
      radioChange: (val: EnumLanguage) => changeLanguage(val),
      list: [
        { title: '中文', path: '', icon: '', value: EnumLanguage['zh-CN'] },
        { title: '越南语', path: '', icon: '', value: EnumLanguage['vi-VN'] },
        { title: '巴西', path: '', icon: '', value: EnumLanguage['pt-BR'] },
      ],
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

      router.push(item.path)
    }
    else if (item.list && item.list.length) {
      openLeftSidebar()
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
    sportsMenu,
    sportHotGames,
    sportEsports,
    sportGameList,
    sportOddType,
    staticMenu1,
    staticMenu2,
    menuItemClick,
  }
}
