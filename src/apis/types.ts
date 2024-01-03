import type { CurrencyCode } from '~/composables/useCurrencyData'
import type { ICartInfo, ICartInfoData } from '~/types'

/** 货币的Key */
export type EnumCurrencyKey = keyof typeof EnumCurrency

/** 版型ID */
export type TPat = 1 | 2 | 3 | 4 | 5 | 6

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
  [k: string]: any
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
  third_id?: string
  third_type?: string
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
  score: string
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
  parent_uid?: string
  device_number: string
}

export interface IMemberThirdReg {
  email: string
  username: string
  parent_uid?: string
  device_number: string
  third_type: number
  third_id: string
}

export interface CasinoLobbyGameItem {
  platform_id: string
  venue_id: string
  platform_name: string
  id: string
  game_type: string
  game_id: string
  img: string
  name: string
  sorting: number
  created_at: number
  is_hot: number
  is_new: number
  is_fav: number
  currencys?: any
  maintained: string
}

export interface ICasinoBetRecordItem {
  bill_no: string
  bet_time: number
  platform_id: string
  platform_name: string
  username: string
  game_class: string
  game_name: string
  game_code: string
  bet_amount: string
  valid_bet_amount: string
  net_amount: string
  currency_id: CurrencyCode
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
  venue_id: string
  [k: string]: any
}

export interface CasinoProviderItem {
  id: string
  venue_id: string
  name: string
  en_name: string
  zh_name: string
  pt_name: string
  vn_name: string
  th_name: string
  game_type: string
  zk_state: string
  state: string
  maintained: string
  seq: number
  logo: string
  nav: string
  background: string
  currency: string
  lang: string
  created_at: number
  updated_at: number
  updated_uid: string
  updated_name: string
  maintained_st: number
  maintained_et: number
  game_num: number
}

/** 汇率数据对象 */
export interface ExchangeRateData {
  date: number
  rates: {
    [k in CurrencyCode]: {
      [k in CurrencyCode]: string
    }
  }
}

/** vip 等级配置对象 */
export interface VipConfig {
  /** 等级 */
  level: string
  /** 等级别称 */
  alias: string
  /** 会员人数 */
  member_count: number
  /** 经验要求 */
  score: string
  /** 晋级礼金 */
  up_gift: string
  /** 每日礼金 */
  daily_gift: string
  /** 每周礼金 */
  weekly_gift: string
  /** 每月礼金 */
  monthly_gift: string
  /** 是否默认 */
  is_default: 0 | 1
  /** 返水配置 */
  rebate_config: {
    game_type: string
    data: {
      id: string
      rate: string
      name: string
      [k: string]: string
    }[]
  }[]
  /** 添加时间 */
  created_at: number
  /** 修改时间 */
  updated_at: number
}

/** ================= 体育 ====================== */
/** 赛事详情 ml-ms */
export interface ISportEventInfoMlMs {
  /** WagerSelectionId */
  wid: string
  /** SelectionId */
  sid: string
  /** 球种名称 */
  sn: string
  /** Handicap */
  hdp: string
  /** Specifiers */
  sp: string
  /** OddsList 内的欧洲盘 OV */
  ov: string
  /** 需要传递给组件的props，用于加入到购物车的 */
  cartInfo: ICartInfo
}

/** 赛事详情 ml */
export interface ISportEventInfoMl {
  rei: string
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
  /** 0:关盘  1:开盘  2:锁盘 */
  mls: number
  /** 版型id */
  pat: TPat
  /** 对应的盘口标签 */
  tgis: number[]
  /** WagerSelections */
  ms: ISportEventInfoMlMs[]
  /** 用来组装接口返回的数据，比如后端返回的list中，其中两条在某些条件上是表现一样的，前端页面上是用一个元素显示 */
  other: ISportEventInfoMlMs[]
  /** 版型6的字段 */
  pat6: {
    titleList: string[]
    list: ISportEventInfoMlMs[]
  }
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
  /** 是否取得串关数量
   *
   * 1:支援串关
   *
   * 2:不支援串关 */
  ic: 1 | 2
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
  ml: ISportEventInfoMl[]
  /** 赛事更新时间 */
  ts: 1699616882
  /** 客队图标 */
  atpic: string
  /** 主队图标 */
  htpic: string
  /** 球种图标 */
  spic: string
  /** 赛事进度 半场 上半场 下半场 休息 */
  rbtd: string
  /** 赛事进行时间 分:秒 */
  rbtt: string
  /** 背景图 */
  sbgpic: string
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
      cartInfo: any
      wid: string
      sid: string
      sn: string
      hdp: string
      sp?: any
      ov: string
    }[]
  }[]
}

/** 存款请求接口对象 */
export interface DepositInfo {
  /** 金额 */
  amount: string
  /** 支付通道ID */
  cid: string
  /** 货币ID */
  currency_id: string
  /** 货币名称 */
  currency_name: string
  /** 支付方式ID */
  mid: string
  /** 银行编码-三方支付存款时使用 payment_type = 1 */
  bank_code?: string
  /** 存款人姓名-法币公司入款存款使用 payment_type = 2 */
  realname?: string
  /** 法币公司入款存款 虚拟币存款 使用 */
  bankcard_id?: string
}

/**
 * 3:不支援的币种
 *
 * 4:只接受两位小数
 *
 * 5:要10的倍数
 *
 * 6:只接受小数点后5位
 */
export type IBetInfoDl = 3 | 4 | 5 | 6
/**
 * 3:不支援的币种
 */
export type IBetInfoStatus = 1 | 2 | 3
/** 盘口状态
 *
 * 0:关盘
 *
 * 1:开盘
 *
 * 2:不支援串关
 *
 * 3: 赔率<1.1，不支援串关
*/
export type TOS = 0 | 1 | 2 | 3
/**
 * 投注信息详情
 */
export interface IBetInfoBack {
  /** 盘口资讯 */
  wsi?: {
    /** 盘口Id */
    wid: string
    /** 赔率 */
    ov: string
    os: TOS
    /**
     * 1:早盘
     *
     * 2:今日
     *
     * 3:滚球
     */
    m: number
    /** 主队比分 */
    hp: number
    /** 客队比分 */
    ap: number
    /** 新的盘口Id */
    new_wid: string
  }[]
  dl: IBetInfoDl
  /**
   * 3:不支援的币种
   */
  status: IBetInfoStatus
  /** 下注资讯 */
  bi?: {
    /** 盘口id */
    wid: string
    /** 最大下注额 */
    maa: number
    /** 最小下注额 */
    mia: number
    /** 赔率 */
    ov: string
    /** 串关类型 */
    pt: number
    /** 注单数量 */
    bc: number
    /** 实际赛事ID */
    cei: string
  }[]
}

/**
 * 体育投注参数
 */
export interface IBetArgs {
  /**
   * 0:不接受任何赔率变化
   *
   * 1:接受更高赔率
   *
   * 2:接受任何赔率
   */
  ao: 0 | 1 | 2
  bl: {
    /** 串关类型(betinfo 接口返回) */
    pt: number
    /** 投注金额 */
    a: number
    bi: ICartInfoData[]
  }[]
  /** 货币 */
  cur: CurrencyCode
}

export interface ISportsMyBetSlipItem {
  /** 投注金额 */
  a: number
  /** 赔率 */
  ov: string
  /** 最多可赢 */
  mwa: number
  /** 投注时间 */
  bt: number
  /** 注单号 */
  ono: string
  /** 注单状态 0未结算 1已结算 2待处理 3已拒绝(危险球取消) 4已取消 */
  os: number
  /** 0:未结算 1:赢 2:输 3:平 4:赢一半 5:输一半 6:输部分 */
  oc: number
  /** 净盈利(输赢多少钱) */
  pa: number
  /** 结算时间 */
  st: number
  bi: {
    pol: {
      [text: string]: number
    }
    /** 盘口类型 */
    bt: number
    /** 下注类型名称 */
    btn: string
    /** 球种Id */
    si: number
    /** 赛事ID */
    ei: string
    /** 赔率 */
    ov: string
    /** 下注选项 */
    sn: string
    /** 赛果 */
    re: string
    /** 盘口 */
    hdp: string
    /** 主队名 */
    htn: string
    /** 客队名 */
    atn: string
    atpic: string
    htpic: string
    /** 开赛时间 */
    ed: number
    hp: number
    ap: number
    /** 地区Id */
    pgid: string
    /** 联赛id */
    ci: string
    /** 联赛名 */
    cn: string
    /**
     * 1：显示主客队名称
     *
     * 2：显示联赛名称
     */
    et: 1 | 2
    /**
     * 0 不支持重新投注
     *
     * 1 支持重新投注
     */
    reb: 0 | 1
    wid: string
    mlid: string
    mll: number
    ic: 1 | 2
    m: number
    pid: number
    sid: string
    /** 球种icon */
    spic: string
  }[]
}

export interface ISportsBetListArgs {
  /** 是否结算，0:未结算 1:已结算 */
  settle: number
  /** 进入货币 */
  cur: CurrencyCode
  page?: number
  page_size?: number
}

/**
 * 赛事列表数据
 */
export interface ISportEventList {
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
  v: ISportEventInfo[]
}

/**
 * 交易记录，存取款数据
 */
export interface PayInfo {
  /** 订单号 */
  order_number: string
  /** 状态：1：成功，2：失败，3，支付中，4：删除，5:待审核 6：取消 */
  state: 1 | 2 | 3 | 4 | 5 | 6
  /** 建立时间 */
  created_at: number
  /** 金额 */
  finally_amount: string
  /** 货币id */
  currency_id: CurrencyCode
  /** 货币名称 */
  currency_name: EnumCurrencyKey
  /** 交易编号 */
  trans_no: string
  /** 金额 */
  amount: string
  /** 种类id */
  cash_type: string
  /** 种类名称 */
  cash_type_name: string
}

export type IBrandDetailTag =
  'base' | 'deposit' | 'withdraw' | 'reg' | 'third' | 'customer' | 'pc' | 'area'
export interface IBrandDetailBase {}
export interface IBrandDetailDeposit {}
export interface IBrandDetailWithdraw {}
export interface IBrandDetailReg {}
export interface IBrandDetailThird {}
export interface IBrandDetailCustomer {}
export interface IBrandDetailPc {
  loading: {
    image: string
  }
  icon: {
    image: string
  }
  logo: {
    image: string
  }
}
export interface IBrandDetailArea {}

export interface ISportsInfo {
  /** 资料更新时间 */
  delta: number
  list: ISportEventInfo[]
  /**
   * 1:成功
   *
   * 3:赛事已结束
   */
  status: 1 | 3
}

/**
 * 钱包存款取款可用货币列表
 */
export interface availableCurrency {
  /** 货币id */
  currency_id: CurrencyCode
  /** 货币名称 */
  currency_name: EnumCurrencyKey
  /** 余额 */
  balance?: string
}
