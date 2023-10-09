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
