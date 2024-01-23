import type { ISportEventInfo, ISportOutrightsInfo, TOS } from '~/apis/types'

export type EnumLanguageKey = keyof typeof EnumLanguage

export interface Room {
  icon: string
  label: string
  value: EnumLanguageKey
}

export interface IBreadCrumbItem {
  /** 面包屑点击跳转的地址 */
  path: string
  /** 面包屑显示的名称 */
  title: string
}

export interface PanelTypeItem {
  title?: string
  homeTeam: string
  awayTeam: string
}

/** 面板数据类型 */
export interface IBasePanelType {
  /** 球种id */
  si: number
  /** 开始时间 */
  startTime: string
  /** 主队名称 */
  homeTeamName: string
  /** 客队名称 */
  awayTeamName: string
  /** 备注 */
  remark: string
  /** 主队分数 */
  homeTeamScore: number
  /** 客队分数 */
  awayTeamScore: number
  /** 客队图标 */
  atpic: string
  /** 主队图标 */
  htpic: string
  /** 球种图标 */
  spic: string
  /** 角球 */
  corner?: {
    /** 主队角球数量 */
    homeTeam: number | string
    /** 客队角球数量 */
    awayTeam: number | string
  }
  /** 红牌 */
  redCard?: {
    /** 主队红牌数量 */
    homeTeam: number | string
    /** 客队红牌数量 */
    awayTeam: number | string
  }
  /** 黄牌 */
  yellowCard?: {
    /** 主队黄牌数量 */
    homeTeam: number | string
    /** 客队黄牌数量 */
    awayTeam: number | string
  }
  period?: PanelTypeItem[]
  gameScore?: {
    homeTeam: number
    awayTeam: number
  }
  /** 加时数据 */
  overtime?: {
    /** 主队加时数据 */
    homeTeam: number
    /** 客队加时数据 */
    awayTeam: number
  }
  pol: {
    [key: string]: number
  }
}

/**
 * 体育投注数据类型
 */
export interface IBetInfo {
  rei: string
  /** 投注项id，最内层id 大小玩法选择大的投注选项id */
  wid: string
  /** 盘口id， 让球、大小 那层的id */
  mlid: string
  /** 坑位 (当有多个不同分数的让分盘时，各盘口的序号) */
  mll: number
  /**
   * 1:全场
   *
   * 2:上半场
   *
   * 3:下半场
   */
  pid: number
  /**
   * 玩法id
   *
   * 玩法种类id
   *
   * ex:让球 1
   *
   * 大小 2
   *
   * 独赢 3
   */
  bt: number
  /** 赔率 */
  ov: string
  /**
   * 1:早盘
   *
   * 2:今日
   *
   * 3:滚球
   */
  m: number
  /** 赛事id */
  ei: string
  /** 球种Id */
  si: number
  /** handicap */
  hdp: string
  /**
   * 下注种类id，ex: 大小裡面的大=1 小=2
   */
  sid: string
  sp: string
}

/**
 * 赛事信息
 *
 * 用来存储赛事信息的数据结构，用在右侧投注面板和获取赛事信息的接口
 */
export type ICartInfo = {
  /** 主队名称 */
  homeTeamName: string
  /** 客队名称 */
  awayTeamName: string

  /** 盘口名称 */
  btn: string

  /** 选项名称 */
  sn: string

  /** 是否取得串关数量
   *
   * 1:支援串关
   *
   * 2:不支援串关 */
  ic: 1 | 2
  /** 开赛时间 */
  ed: number
  /** 地区Id */
  pgid: string
  /** 联赛id */
  ci: string
  /** 客队比分 */
  ap: number
  /** 主队比分 */
  hp: number
} & IBetInfo

/**
 * 购物车数据
 * @desc 相对于 ICartInfo 带有amount，用来存储购物车中的金额
 */
export type ICartInfoData = ICartInfo & {
  amount: number
  os: TOS
  /** 最⼤投注额 */
  maa: number
  /** 最⼩投注额 */
  mia: number
  /** 是否变成了结果 */
  result?: 'fulfilled' | 'rejected'
  /** 实际赛事ID */
  cei?: string
  /** 串关类型 */
  pt: number
  /** 客队比分 */
  ap: number
  /** 主队比分 */
  hp: number
  /** 新的盘口Id */
  new_wid: string
  sp: string
}

// /**
//  * 更新购物车数据，反应数据是否有变化
//  */
// export interface IUpdateCartData {
//   /** 赔率是否改变 */
//   ovIsChange: boolean
//   /** 是否有更低的赔率 */
//   ovIsLower: boolean
// }

/**
 * 赛事信息改变回调函数
 */
export type IBetInfoChangeCallback = (
  data: {
    /** os和ov有变化的数据 */
    osOvIsChangeList: ISportListToCartData[]
  }
) => void

/**
 * 列表通知回调函数
 */
// export type IListToCartCallback = (data: IUpdateCartData) => void

/**
 * 赛事根据联赛组合
 */
export type ISportDataGroupedByLeague = {
  ci: string
  cn: string
  list: ISportEventInfo[]
}[]

/**
 * 赛事根据联赛组合
 */
export type IOutrightDataGroupedByLeague = {
  ci: string
  cn: string
  list: ISportOutrightsInfo[]
}[]

/**
 * 列表和购物车通知传递的数据类型
 */
export interface ISportListToCartData {
  /** 盘口id */
  wid: string
  /** 赔率 */
  ov: string
  os: TOS
  /** 盘口id， 让球、大小 那层的id */
  mlid: string
}

/**
 * 体育面包屑类型
 */
export interface ISportsBreadcrumbs {
  label: string
  value: string
  path: string
}

/**
 * Banner 类型
 */
export interface BannerItem {
  imgUrl: string
  type: number
  backgroundUrl: string
  rightImageUrl: string
  content: string
  banner_style3_background: string
  banner_style: 1 | 2 | 3
  button?: {
    text: string
    url: string
    type: number
  }
  align: 'left' | 'right'
}
