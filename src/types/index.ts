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

/** 面板数据类型 */
export interface IBasePanelType {
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
  /** 角球 */
  corner?: {
    /** 主队角球 */
    homeTeam: number
    /** 客队角球 */
    awayTeam: number
  }
  /** 红牌 */
  redCard?: {
    /** 主队红牌 */
    homeTeam: number
    /** 客队红牌 */
    awayTeam: number
  }
  /** 黄牌 */
  yellowCard?: {
    /** 主队黄牌 */
    homeTeam: number
    /** 客队黄牌 */
    awayTeam: number
  }
}

/**
 * 体育投注数据类型
 */
export interface IBetInfo {
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
} & IBetInfo

/**
 * 购物车数据
 * @desc 相对于 ICartInfo 带有amount，用来存储购物车中的金额
 */
export type ICartInfoData = ICartInfo & {
  amount: number
  /** 0:关盘 1:开盘 */
  os: 0 | 1
  /** 最⼤投注额 */
  maa: number
  /** 最⼩投注额 */
  mia: number
}

/**
 * 赛事信息改变回调函数
 * @param {boolean} ovIsChange 赔率是否改变
 */
export type IBetInfoChangeCallback = (ovIsChange: boolean) => void
