// casino
const casinoMenu = [
  { title: '收藏夹', path: '', icon: 'chess-star', list: [], domId: '' },
  { title: '近期游戏记录', path: '', icon: 'chess-game-record', list: [], domId: '' },
  { title: '挑战', path: '', icon: 'chess-challenge', list: [], domId: '' },
]
const casinoGameList = [
  { title: '老虎机', path: '', icon: 'chess-slot-machine', list: [], domId: '' },
  { title: '真人娱乐场', path: '', icon: 'chess-live-casino', list: [], domId: '' },
  { title: '游戏节目', path: '', icon: 'chess-gameshow', list: [], domId: '' },
  { title: '新游戏', path: '', icon: 'chess-newgame', list: [], domId: '' },
  { title: '可购买奖励回合', path: '', icon: 'chess-bonus-rounds', list: [], domId: '' },
  { title: 'RTP 增强化', path: '', icon: 'chess-rtp', list: [], domId: '' },
]
const casinoGameProvider = [{ title: '游戏提供商', path: '', icon: 'chess-game-provider', list: [], domId: '' }]

// sports
const sportsMenu = [
  { title: '滚球盘', path: '', icon: 'spt-ball-plate', list: [], domId: '' },
  { title: '即将开赛', path: '', icon: 'spt-timing', list: [], domId: '' },
  { title: '我的投注', path: '', icon: 'spt-user-bet', list: [], domId: '' },
]
const sportHotGames = [
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
]
const sportEsports = [
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
]
const sportGameList = [
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
]
const sportOddType = [
  {
    title: '赔率：',
    path: '',
    icon: 'chess-language',
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
]

const staticMenu1 = [
  {
    title: '个人资料',
    path: '',
    icon: 'navbar-user',
    list: [
      { title: '钱包', path: '', icon: 'navbar-wallet' },
      { title: '保险库', path: '', icon: 'navbar-cart' },
      { title: 'VIP', path: '', icon: 'chess-air-bonus' },
      { title: '统计数据', path: '', icon: 'uni-trend' },
      { title: '通知', path: '', icon: 'tabbar-bet' },
      { title: '体育投注', path: '', icon: 'spt-basketball' },
      { title: '设置', path: '', icon: 'uni-set' },
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
      { title: '推荐活动三', path: '', icon: 'navbar-user' },
      { title: '查看全部', path: '', icon: 'navbar-user' },
    ],
    domId: 'static-menu-promotion',
  },
  { title: '联盟计划', path: '', icon: 'spt-affiliate-pro', list: [], domId: '' },
  { title: 'VIP俱乐部', path: '', icon: 'chess-vipclub', list: [], domId: '' },
  { title: '博客', path: '', icon: 'chess-blog', list: [], domId: '' },
  { title: '论坛', path: '', icon: 'tabbar-chat', list: [], domId: '' },
]
const staticMenu2 = [
  {
    title: '赞助活动',
    path: '',
    icon: 'spt-sponsorship',
    list: [
      { title: '赞助活动一', path: '', icon: '' },
      { title: '赞助活动二', path: '', icon: '' },
      { title: '赞助活动三', path: '', icon: '' },
    ],
    domId: 'static-menu-sponsor',
  },
  { title: '负责任博彩', path: '', icon: 'spt-secure', list: [], domId: '' },
  { title: '在线支持', path: '', icon: 'spt-online-support', list: [], domId: '' },
  {
    title: '语言：',
    path: '',
    icon: 'chess-language',
    list: [
      { title: '中文', path: '', icon: '' },
      { title: '日文', path: '', icon: '' },
      { title: '英文', path: '', icon: '' },
    ],
    domId: 'static-menu-language',
  },
]

export function useMenuData() {
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
  }
}
