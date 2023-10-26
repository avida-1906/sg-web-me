/**
 * 语言枚举
 */
export enum EnumLanguage {
  /**
   * 中文
   */
  'zh-CN',

  /**
   * 葡萄牙语 Portuguese
   */
  'pt-BR',

  /**
   * 越南语 Vietnamese
   */
  'vi-VN',
}

/**
 * 货币枚举
 */
export enum EnumCurrency {
  /**
   * BTC
   * @description 比特币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://bitcoin.org/zh_CN/
   */
  BTC,
  /**
   * USDT
   * @description 泰达币是一种基于稳定币的加密货币，其价值与美元等价。
   * @see https://tether.to/
   */
  USDT,
  /**
   * INR
   * @description 印度卢比
   * @see https://www.rbi.org.in/
   */
  INR,
  /**
   * CNY
   * @description 人名币
   * @see https://www.rbi.org.in/
   */
  CNY,
  /**
   * VND
   * @description 越南盾
   * @see https://www.rbi.org.in/
   */
  VND,
  /**
   * THB
   * @description 泰铢
   * @see https://www.rbi.org.in/
   */
  THB,
  /**
   * BRL
   * @description 巴西雷亚尔
   * @see https://www.rbi.org.in/
   */
  BRL,
  /**
   * BRL
   * @description 以太币
   * @see https://www.rbi.org.in/
   */
  ETH,
  /**
   * BRL
   * @description 币安币
   * @see https://www.rbi.org.in/
   */
  BNB,
}

/**
 * casino游戏类型枚举
 */
export enum EnumCasinoGameType {
  /** 真人 */
  LIVE = 'live',
  /** 电子 */
  SLOT = 'slot',
}

/**
 * casino游戏类型接口参数枚举
 */
export enum EnumCasinoApiGameType {
  /** 真人 */
  LIVE = 1,
  /** 电子 */
  SLOT = 3,
}

/**
 * casino游戏排序枚举
 */
export enum EnumCasinoSortType {
  /** 名称a-z */
  nameA = 'en_name:asc',
  /** 名称z-a */
  nameZ = 'en_name:desc',
  /** 热门 */
  hot = 'sorting:asc',
  /** 推荐 */
  recommend = 'created_at:desc',
}

/**
 * 体育下注单分类枚举
 */
export enum EnumsBetSlipTabs {
  betSlip, // 投注单
  myBets, // 我的投注
  single, // 单项投注
  multi, // 复式投注
  active, // 活跃
  settled, // 已结算
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
