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
