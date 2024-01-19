/** * 货币枚举 */
export enum EnumCurrency {
  /**
   * @description BRL 巴西雷亚尔
   */
  BRL,

  /**
   * @description CNY 人民币
   */
  CNY,

  /**
   * @description INR 印度卢比
   */
  INR,

  /**
   * @description VND 越南盾
   */
  VND,

  /**
   * @description THB 泰铢
   */
  THB,

  /**
   * @description USDT 泰达币
   */
  USDT,

  /**
   * @description BTC 比特币
   */
  BTC,

  /**
   * @description ETH 以太坊
   */
  ETH,

  /**
   * @description BNB 币安币
   */
  BNB,

  /**
   * @description EUR 欧元
   */
  EUR,

  /**
   * @description JPY 日元
   */
  JPY,

  /**
   * @description CAD 加拿大元
   */
  CAD,

  /**
   * @description ARS 阿根廷比索
   */
  ARS,

  /**
   * @description CLP 智利比索
   */
  CLP,

  /**
   * @description PEN 秘鲁索尔
   */
  PEN,

  /**
   * @description MXN 墨西哥比索
   */
  MXN,

  /**
   * @description LTC 莱特币
   */
  LTC,

  /**
   * @description DOGE 狗狗币
   */
  DOGE,

  /**
   * @description BCH 比特币现金
   */
  BCH,

  /**
   * @description XRP 瑞波币
   */
  XRP,

  /**
   * @description EOS 柚子币
   */
  EOS,

  /**
   * @description TRX 波场币
   */
  TRX,

  /**
   * @description USDC 美元稳定币
   */
  USDC,

  /**
   * @description APE 猿猴币
   */
  APE,

  /**
   * @description BUSD 币安美元
   */
  BUSD,

  /**
   * @description CRO 加密.com币
   */
  CRO,

  /**
   * @description DAI 戴稳定币
   */
  DAI,

  /**
   * @description LINK 链接币
   */
  LINK,

  /**
   * @description SAND 沙子币
   */
  SAND,

  /**
   * @description SHIB 柴犬币
   */
  SHIB,

  /**
   * @description UNI 联合币
   */
  UNI,

  /**
   * @description MATIC 多边形币
   */
  MATIC,
}

/** * casino游戏排序枚举 */
export enum EnumCasinoSortType {
  /** 名称a-z */
  nameA = 'name:asc',
  /** 名称z-a */
  nameZ = 'name:desc',
  /** 热门 */
  hot = 'sorting:asc',
  /** 重点介绍 */
  recommend = 'created_at:desc',
}

/**
 * 体育下注单状态枚举 (Head)
 */
export enum EnumsBetSlipHeadStatus {
  /** 投注单 */
  betSlip,
  /** 我的投注 */
  myBets,
}

/**
 * 体育下注单状态枚举 (投注单-Tab)
 */
export enum EnumsBetSlipBetSlipTabStatus {
  /** 单项投注 */
  single,
  /** 复式投注 */
  multi,
}

/**
 * 体育下注单状态枚举 (我的投注-Tab)
 */
export enum EnumsBetSlipMyBetsTabStatus {
  /** 活跃 */
  active,
  /** 已结算 */
  settled,
}

/**
 * 投注赔率变化枚举
 */
export enum EnumOddsChange {
  /** 接受任何赔率变化 */
  acceptAnyOddsChange = 2,
  /** 只接受更高的赔率 */
  acceptHigherOdds = 1,
  /** 不接受任何赔率变化 */
  notAcceptAnyOddsChange = 0,
}

/**
 * 所有体育类型枚举
 */
export enum EnumSportType {
  /** 网球 */
  'tennis',
  /** 足球 */
  'soccer',
  /** 美式橄榄球 */
  'american-football',
  /** 篮球 */
  'basketball',
  /** 乒乓球 */
  'table-tennis',
  /** 冰上曲棍球 */
  'ice-hockey',
  /** 棒球 */
  'baseball',
  /** 板球 */
  'cricket',
  /** 电子板球 */
  'ecricket',
  /** 英雄联盟 */
  'league-of-legends',
  /** CS:GO/CS2 */
  'counter-strike',
  /** 综合格斗 */
  'mma',
  /** 英式橄榄球 */
  'rugby',
  /** 传说对决 */
  'arena-of-valor',
  /** 澳洲足球 */
  'aussie-rules',
  /** 羽毛球 */
  'badminton',
  /** 拳击 */
  'boxing',
  /** 飞镖 */
  'darts',
  /** 刀塔2 */
  'dota-2',
  /** FIFA */
  'fifa',
  /** 地板球 */
  'floorball',
  /** 五人制足球 */
  'futsal',
  /** 光环 */
  'halo',
  /** 手球 */
  'handball',
  /** 王者荣耀 */
  'kings-of-glory',
  /** 无尽对决 */
  'mobile-legends',
  /** NBA2K */
  'nba2k',
  /** 彩虹六号 */
  'rainbow-six',
  /** 桌球 */
  'snooker',
  /** 星际争霸2 */
  'starcraft-2',
  /** 星际争霸 I */
  'starcraft-1',
  /** 无畏契约 */
  'valorant',
  /** 排球 */
  'volleyball',
  /** 水球 */
  'waterpolo',
  /** 登山 */
  'alpine-skiing',
  /** 改装车比赛 */
  'stock-car-racing',
  /** 盖尔式板棍球 */
  'gaelic-hurling',
  /** 盖尔式足球 */
  'gaelic-football',
  /** 高尔夫 */
  'golf',
  /** 高山滑雪 */
  'ski-jumping',
  /** 滑雪和射击 */
  'biathlon',
  /** 摩托车竞速 */
  'motorcycle-racing',
  /** 沙滩排球 */
  'beach-volley',
  /** 特技比赛 */
  'politics-entertainment',
  /** 一级方程式 */
  'formula-1',
  /** 越野赛 */
  'cross-country',
  /** 自行车赛 */
  'cycling',
}

/** 体育盘口类型枚举 */
export enum EnumSportMarketType {
  /** 获胜盘 */
  WINNER = 'winner',
  /** 让分盘 */
  HANDICAP = 'handicap',
  /** 总分盘 */
  TOTAL = 'total',
}

/**
 * 体育EndDom枚举
 */
export enum EnumSportEndDomID {
  /** PC样式 购物车的EndDom */
  PC_CART_END_DOM = 'PC_CART_END_DOM',
  /** H5样式 下的EndDom */
  H5_CART_END_DOM = 'H5_CART_END_DOM',
}

/**
 *  活动红利相关的帐变类型
 */
export enum PromoTransactionType {
  /** 会员返水 */
  'rebate' = 814,
  /** 活动红利 */
  'activity' = 815,
  /** 人工红利派发 */
  'admin_activity' = 816,
  /** 存款优惠 */
  'deposit_bonus' = 817,
  /** vip晋级礼金 */
  'vip_upgrade' = 818,
  /** vip日红包 */
  'vip_day' = 819,
  /** vip周红包 */
  'vip_week' = 820,
  /** vip月红包 */
  'vip_monthly' = 821,
  /** vip生日礼金 */
  'vip_birthday' = 822,
}

/**
 * 游戏类型枚举
 */
export enum EnumGlobalGameType {
  /** 真人 */
  'casino' = 1,
  /** 捕鱼 */
  'fish' = 2,
  /** 电子 */
  'slot' = 3,
  /** 体育 */
  'sports' = 4,
}

/**
 * 体育场馆
 */
export enum EnumSportVenue {
  IM = 401,
}
