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
   * ETH
   * @description 以太坊是一个开源的有智能合约功能的公共区块链平台，通过其专用加密货币以太币提供去中心化的虚拟机来处理点对点合约。
   * @see https://ethereum.org/zh/
   */
  ETH,

  /**
   * LTC
   * @description 莱特币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://litecoin.org/zh/
   */
  LTC,

  /**
   * USDT
   * @description 泰达币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://tether.to/
   */
  USDT,

  /**
   * DOGE
   * @description 狗狗币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://dogecoin.com/
   */
  DOGE,

  /**
   * BCH
   * @description 比特币现金是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://www.bitcoincash.org/
   */
  BCH,

  /**
   * XRP
   * @description 瑞波币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://ripple.com/xrp/
   */
  XRP,

  /**
   * EOS
   * @description 柚子币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://eos.io/
   */
  EOS,

  /**
   * TRX
   * @description 波场币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://tron.network/
   */
  TRX,

  /**
   * BNB
   * @description 币安币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://www.binance.com/
   */
  BNB,

  /**
   * USDC
   * @description 美元币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://www.centre.io/usdc
   */
  USDC,

  /**
   * APE
   * @description 猩猩币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see http://www.apecoin.org/
   */
  APE,

  /**
   * BUSD
   * @description 币安美元是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://www.binance.com/
   */
  BUSD,

  /**
   * CRO
   * @description 信用币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://crypto.com/
   */
  CRO,

  /**
   * DAI
   * @description DAI是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://makerdao.com/en/
   */
  DAI,

  /**
   * LINK
   * @description 链接币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://chain.link/
   */
  LINK,

  /**
   * SAND
   * @description 沙子币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * @see https://www.sandbox.game/en/
   */
  SAND,

  /**
   * SHIB
   * @description 狗狗币是一种点对点的数字货币，基于开源软件协议，不受中央机构管控。
   * SHIB是一个社区驱动的实验性去中心化的匿名代币，它的创始人是一个叫做“狗狗”的匿名人士。
   * @see https://shibatoken.com/
   */
  SHIB,

  /**
   * UNI
   * @description Uniswap是一个基于以太坊的去中心化交易协议，用于在以太坊上交换ERC20代币。
   * @see https://uniswap.org/
   */
  UNI,

  /**
   * MATIC
   * @description Polygon是一个基于以太坊的去中心化交易协议，用于在以太坊上交换ERC20代币。
   * @see https://polygon.technology/
   */
  MATIC,

  /**
   * EUR
   * @description 欧元
   * @see https://www.ecb.europa.eu/home/html/index.en.html
   */
  EUR,

  /**
   * JPY
   * @description 日元
   * @see https://www.boj.or.jp/en/index.htm/
   */
  JPY,

  /**
   * BRL
   * @description 巴西雷亚尔
   * @see https://www.bcb.gov.br/en/home
   */
  BRL,

  /**
   * CAD
   * @description 加拿大元
   * @see https://www.bankofcanada.ca/
   */
  CAD,

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
}

/**
 * casino游戏类型枚举
 */
export enum EnumCasinoGameType {
  /** 真人 */
  LIVE = 'live',
  /** 老虎机 */
  SLOT = 'slot',
}
