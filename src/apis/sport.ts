/**
 * 获取所有体育计数
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b9bcba6d-49cf-4de9-a304-cf80caf8f46c
 */
export function ApiSportCount(data: {
  /** 是否取得串关数量 0:全部 1:支援串关 2:不支援串关 */
  ic: number
}) {
  return httpClient.post<{
    /** 球种Id */
    si: number
    /** 球种名称 */
    sn: string
    /** earlyCount 早盘数量 */
    ec: number
    /** todayCount 今日数量 */
    tc: number
    /** liveCount 滚球数量 */
    lc: number
    /** outrightCount 冠军赛数量 */
    oc: number
    /** count 总数 */
    c: number
  }[]>('/sport/401/count', data)
}

/**
 * 侧边栏列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=c4f949f2-ecca-470e-b7f1-f980bd7fb70c
 */
export function ApiSportSidebar() {
  return httpClient.post<{
    top: {
      /** 球种Id */
      si: number
      /** 球种名称 */
      sn: string
      /** 热门联赛 */
      list: {
        /** 联赛id */
        ci: number
        /** 联赛名称 */
        cn: string
      }[]
    }[]
    all: {
      /** 球种Id */
      si: number
      /** 球种名称 */
      sn: string
    }[]
    /** 滚球赛事总数 */
    rbc: number
    /** 滚球赛事 */
    rbl: {
      /** 球种Id */
      si: number
      /** 球种名称 */
      sn: string
      /** 数量 */
      c: number
    }[]
  }>('/sport/401/sidebar')
}

/**
 * 联赛列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=bb7c74b6-711c-4a6a-88bd-2e131eb95a95
 */
export function ApiSportCompetitionList(data: {
  /** 球种Id */
  si: number
  /** 种类 normal:一般赛事 outright:冠军赛 */
  kind: string
}) {
  return httpClient.post<{
    hot: []
    list: []
  }>('/sport/401/competition/list', data)
}
