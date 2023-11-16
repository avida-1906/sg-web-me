/** 货币的Key */
export type EnumCurrencyKey = keyof typeof EnumCurrency

/** 版型ID */
export type TPat = 1 | 2 | 3 | 4

/** 后端金额接口数据 */
export type TCurrencyObject = Prettify<{
  uid: string
} & {
  -readonly [K in EnumCurrencyKey]: string;
}>

export interface INotNotice {
  noNotify?: boolean
}

/** 后端返回数组时候的数据结构 */
export interface IResponseList<T> {
  d: T[]
  t: number
  s: number
}

/** 绑定的钱包银行卡对象 */
export interface BankCard {
  id: string
  uid: string
  username: string
  currency_id: string
  open_name: string
  bank_name: string
  bank_account: string
  bank_area_cpf: string
  is_default: number
  state: number
}

/** 绑定的钱包虚拟币地址对象 */
export interface VirtualCoin {
  id: string
  uid: string
  state: number
  /** 合约类型 */
  contract_type: string
  /** 货币名称 */
  currency_name: string
  created_at: number
  updated_at: number
  /** 是否默认：1：是，2否 */
  is_default: number
  /** 用户名 */
  username: string
  /** 钱包地址 */
  address: string
}

/** 用户信息 */
export interface IUserInfo {
  uid: string
  phone: string
  telegram: string
  facebook: string
  zalo: string
  line: string
  viber: string
  whatsapp: string
  twitter: string
  wechat: string
  qq: string
  area_code: string
  /** 性别 1=男，2=女 */
  sex: number | string
  cpf: string
}

/** 用户详情  */
export interface IMemberDetail {
  uid: string
  username: string
  email: string
  /** 邮箱是否验证 1=已验证，2=未验证 */
  email_check_state: number
  password: string
  created_at: number
  created_ip: string
  level_id: string
  vip: string
  top_uid: string
  top_name: string
  parent_uid: string
  parent_name: string
  tester: string
  avatar: number
  device_number: string
  last_login_ip: string
  last_login_at: number
  last_login_device: string
  last_login_domain: string
  reg_domain: string
  reg_ip: string
  reg_device_no: string
  agency_rebate_state: number
  state: string
  source: string
  member_type: number
  bonus_state: number
  bonus_note: string
  note: string
  deposit_count: number
  withdraw_count: number
  deposit_amount: string
  withdraw_amount: string
  /** 谷歌验证吗key */
  google_key: string
  /** 1谷歌未认证 2谷歌已认证 */
  google_verify: number
  /** 是否设置资金密码 0=未设置 1=已设置 */
  pay_password: string
  online: string
  /** 账户余额 */
  balance: TCurrencyObject
  /** 保险库余额 */
  balance_locker: TCurrencyObject
  /** 用户信息 */
  ext: IUserInfo
}

export interface IMemberBalanceLockerUpdate {
  /** 1:转入 2转出 */
  flag: 1 | 2
  currency_id: number
  amount: string
  password?: string
}

export interface IMemberReg {
  email?: string
  username: string
  password: string
  birthday?: string
  /** 上级id，没有留空 */
  parent_id?: string
  device_number: string
}
export interface CasinoLobbyGameItem {
  platform_id: string
  id: string
  game_id: string
  img: string
  name: string
}

/** 场馆item */
export interface ProviderItem {
  id: string
  en_name: string
  game_type: string
  state: number
  maintained: string
  seq: number
  logo: string
  created_at: number
  updated_at: number
  updated_uid: string
  updated_name: string
  zh_name: string
  pt_name: string
  vn_name: string
  th_name: string
  game_num: number
  name: string
}

/** 汇率数据对象 */
export interface ExchangeRateData {
  date: number
  rates: {
    [k in EnumCurrencyKey]: {
      [k in EnumCurrencyKey]: string
    }
  }
}

/** ================= 体育 ====================== */
/** 联赛item */
export interface ILeagueItem {
  /** 球种Id */
  si: number
  /** market
   *
   * 1:早盘
   *
   * 2:今日
   *
   * 3:滚球 */
  m: number
  /** 赛事ID */
  ei: string
  /** 地区id */
  pgid: string
  /** 地区名称 */
  pgn: string
  /** 联赛ID */
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
  /** 赛事进行时间 */
  est: string
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
  /** 是否取得串关数量
   *
   * 1:支援串关
   *
   * 2:不支援串关 */
  ic: string
  /** 是否热门 */
  hot: number
  /** 主队比分 */
  hp: number
  /** 客队比分 */
  ap: number
  /** 特别字段，需要询问后端 */
  pol: {
    [key: string]: number
  }
  /** 赛事是否有现场直播Url
   *
   * 0:没有
   *
   * 1:有 */
  ls: number
  /** 现场直播 URL清单 */
  lsu: []
  /** 赛事的更多信息。每个体育的额外信息将有所不同 */
  eifo: string
  /** 盘口清单 */
  ml: {
    /** MarketlineId */
    mlid: string
    mlei: string
    /** BetType */
    bt: number
    /** BetTypeName */
    btn: string
    /** PeriodId */
    pid: number
    /** PeriodName */
    pn: string
    /** MarketLineLevel */
    mll: number
    /** MarketlineStatusId */
    mls: number
    /**  WagerSelections */
    ms: {
      /** WagerSelectionId */
      wid: string
      /** SelectionId */
      sid: string
      /** SelectionName */
      sn: string
      /** Handicap */
      hdp: string
      /** Specifiers */
      sp: null
      /**  OddsList 内的欧洲盘 OV */
      ov: string
    }[]
  }[]
  /** 赛事更新时间 */
  ts: number
}

/** 赛事详情 */
export interface ISportEventInfo {
  /** 赛事ID */
  ei: string
  /** 球种Id */
  si: number
  /** 球种名称 */
  sn: string
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
    /** 版型id */
    pat: TPat
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
}

/** 冠军盘口数据 */
export interface ISportOutrightsInfo {
  si: number
  sn: string
  pgid: string
  pgn: string
  ci: string
  cn: string
  ei: string
  oen: string
  ed: number
  mc: number
  ml: {
    mlid: string
    bt: number
    btn: string
    pid: number
    pn: string
    mll: number
    mls: number
    ms: {
      wid: string
      sid: string
      sn: string
      hdp: string
      sp?: any
      ov: string
    }[]
  }[]
}
