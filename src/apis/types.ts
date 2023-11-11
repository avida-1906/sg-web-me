/** 货币的Key */
export type EnumCurrencyKey = keyof typeof EnumCurrency

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
  locker: TCurrencyObject
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
