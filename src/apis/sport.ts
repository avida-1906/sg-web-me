import type { ILeagueItem } from './types'

/**
 * 获取所有体育计数
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b9bcba6d-49cf-4de9-a304-cf80caf8f46c
 */
export function ApiSportCount(data: {
  /** 是否取得串关数量
   *
   * 0:全部
   *
   * 1:支援串关
   *
   * 2:不支援串关 */
  ic: number
}) {
  return httpClient.post<{
    list: {
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
    }[]
  }>(`/sport/${getSportsPlatId()}/count`, data)
}

/**
 * 侧边栏列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=c4f949f2-ecca-470e-b7f1-f980bd7fb70c
 */
export function ApiSportSidebar() {
  return httpClient.post<{
    menu: {
      menu_id: number
      name: string
      list: {
        si: number
        sn: string
        list: {
          ci: string
          cn: string
        }[]
      }[]
    }[]
    all: {
      si: number
      sn: string
    }[]
    rbc: number
    rbl: {
      si: number
      sn: string
      c: number
    }[]
  }>(`/sport/${getSportsPlatId()}/sidebar`)
}

/**
 * 联赛列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=bb7c74b6-711c-4a6a-88bd-2e131eb95a95
 */
export function ApiSportCompetitionList(data: {
  /** 球种Id */
  si: number
  /** 种类
   *
   * normal:一般赛事
   *
   * outright:冠军赛 */
  kind: string
}) {
  return httpClient.post<{
    /** 热门联赛列表 */
    hot: {
      /** 地区Id */
      pgid: string
      /** 地区名称 */
      pgn: string
      /** count 总数 */
      c: number
      /** 联赛列表 */
      cl: {
        /** 联赛id */
        ci: string
        /** 联赛名称 */
        cn: string
        /** count 总数 */
        c: number
      }[]
    }[]
    /** 联赛列表 */
    list: {
      /** 地区Id */
      pgid: string
      /** 地区名称 */
      pgn: string
      /** count 总数 */
      c: number
      cl: {
        /** 联赛id */
        ci: string
        /** 联赛名称 */
        cn: string
        /** count 总数 */
        c: number
      }[]
    }[]
  }>(`/sport/${getSportsPlatId()}/competition/list`, data)
}

/**
 * 获取赛事列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=51d0dcf6-cfde-4672-884c-81ff05e0c07e
 */
export function ApiSportEventList(data: {
  /** 球种Id */
  si: number
  /** market
   * 0:取所有
   *
   * 1:早盘
   *
   * 2:今日
   *
   * 3:滚球
   *
   * 4:即将开赛
   *
   * 5:即将开赛及滚球 */
  m: number
  page: number
  page_size: number
}) {
  return httpClient.post<{
    /** 资料更新时间 */
    delta: number
    /** 联赛列表 */
    list: ILeagueItem[]
  }>(`/sport/${getSportsPlatId()}/event/list`, data)
}

/**
 * 获取赛事列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=4a7e9957-f7fe-4404-97ef-92840479a803
 */
export function ApiSportEventDelta(data: {
  /** 球种Id */
  si: number
  /** market 1:早盤 */
  m: string
  /** 1198399587 最后更新时间 */
  delta: number
}) {
  return httpClient.post<{
    /** 资料更新时间 */
    delta: number
    list: {
      /** 球种Id */
      si: number
      /** market 1:早盤 */
      m: number
      /** 赛事ID */
      ei: string
      /** Action
       *
       * 0:更新或次插入赛事
       *
       * 1:移除赛事 */
      ac: string
      /** 赛事更新时间 */
      ts: number
      /** 聯賽id */
      ci: string
      /** 地區id */
      pgid: string
      v: ILeagueItem[]
    }[]
  }>(`/sport/${getSportsPlatId()}/event/delta`, data)
}

/**
 * 单场赛事详情
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=6238fa9d-1a7e-4daf-a57c-0cc97163fdbb
 */
export function ApiSportEventInfo(data: {
  /** 球种Id */
  si: number
  /** 赛事ID */
  ei: string
}) {
  return httpClient.post<{
    /** 资料更新时间 */
    delta: number
    list: {
      /** 赛事ID */
      ei: string
      /** 球种Id */
      si: number
      /** market 1:早盤 */
      m: number
      /** 聯賽id */
      ci: string
      /** 联赛名称 */
      cn: string
      /** 主队id */
      hti: string
      /** 主队名称 */
      htn: string
      /** 客队id */
      ati: string
      /** 客队名称 */
      atn: string
      /** 滚球时间 */
      rbt: string
      /** RBTimeStatus */
      rbts: number
      /** 玩法总数 */
      mc: number
      /** 赛事开始时间 */
      ed: number
      /** 当前是第几盘或者第几局 */
      ep: number
      /** 赛事状态 */
      es: number
      /** 是否取得串關數量
       *
       * 0:全部
       *
       * 1:只限串關 */
      ic: number
      /** 是否热门 */
      hot: number
      /** orderNumber */
      on: number
      /** 主队比分 */
      hp: number
      /** 客队比分 */
      ap: number
      /** 比分列表 */
      pol: {
        [key: string]: number
      }
      /** 地區id */
      pgid: string
      /** 地区 */
      pgn: string
      /** 赛事是否有现场直播Url,
       *
       * 0:没有,
       *
       * 1:有 */
      ls: number
      /** 现场直播 URL清单 */
      lsu: []
      /** 赛事的更多信息。每个体育的额外信息将有所不同 */
      eifo: string
      /** 盘口标签列表 */
      tgl: {
        /** 盘口标签Id */
        tgi: number
        /** 盘口标签名称 */
        tgn: string
      }[]
      /** 盘口清单 */
      ml: {
        /** MarketlineId */
        mlid: string
        /** BetType */
        bt: number
        /** BetTypeName */
        btn: string
        pid: number
        /** PeriodName */
        pn: string
        /** MarketLineLevel */
        mll: number
        /** MarketlineStatusId */
        mls: number
        /** 对应的盘口标签 */
        tgis: number[]
        /** WagerSelections */
        ms: {
          /** WagerSelectionId */
          wid: string
          /** SelectionId */
          sid: string
          /** 球种名称 */
          sn: string
          /** Handicap */
          hdp: string
          /** Specifiers */
          sp: null
          /** OddsList 内的欧洲盘 OV */
          ov: string
        }[]
      }[]
      /** 赛事更新时间 */
      ts: 1699616882
    }[]
  }>(`/sport/${getSportsPlatId()}/event/info`, data)
}

/**
 * 首页大类
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=ae1fee09-d03e-4f27-a7bb-6a2bbdc4d74f
 */
export function ApiSportMenuMain() {
  return httpClient.post<{
    list: {
      menu_id: number
      menu_name: string
    }[]
  }>(`/sport/${getSportsPlatId()}/menu/main`)
}
