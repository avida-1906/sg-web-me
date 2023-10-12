import { httpClient } from '~/http'

/** 货币的Key */
export type EnumCurrencyKey = keyof typeof EnumCurrency

/** 后端金额接口数据 */
export type TCurrencyObject = Prettify<{
  uid: string
} & {
  -readonly [K in EnumCurrencyKey]: string;
}>

/** 后端返回数组时候的数据结构 */
interface IResponseList<T> {
  d: T[]
  t: number
  s: number
}
export interface IMemberDetail {
  uid: string
  /** 真实姓名，多个语言的用逗号隔开 */
  realname: string
  phone: string
  email: string
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
  /** 邮箱是否验证 1=已验证，2=未验证 */
  email_check_state: number
  /** 性别 1=男，2=女 */
  sex: number
  username: string
}
export interface IMemberBalanceLockerUpdate {
  type: 'add' | 'remove'
  currency_name: string
  amount: string
}

export interface IMemberCurrencyConfig {
  /** 货币ID */
  cur: string
  /** 货币名称（CNY,...） */
  cur_name: EnumCurrencyKey
  /** 货币小数位数 */
  decimal_places: number
  /** 货币前缀 */
  symbol: string
}

/**
 * 用户登录
 */
export function ApiMemberLogin(
  data: {
    username: string
    password: string
    device_number: string
  },
) {
  return httpClient.post<string>('/member/login', data)
}

/**
 * 用户注册
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b9e7b167-6221-4721-b3f0-dce161b8f522
 */
export function ApiMemberReg(
  data: {
    email: string
    username: string
    password: string
    birthday?: string
    parent_id?: string// 上级id，没有留空
    device_number: string
  },
) {
  return httpClient.post<string>('/member/reg', data)
}

/**
 * 发送短信或者邮件验证码
 */
export function ApiSmsSend(
  data: {
    tel: string
    flag: 'text' | 'voice'
    ty: 1 | 2
  },
) {
  return httpClient.post<{
    data: string
  }>('/api/v1/home/ip', data)
}

/**
 * 游戏列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=ee80d925-48b5-43e4-aa04-3893dfce1e06
 */
export function ApiMemberGameList(params?: {
  page?: number
  page_size?: number
  /** 游戏类型:1=真人,3=电子 */
  game_type?: 1 | 3
  /** 是否热门 1是 2否 */
  is_hot?: 1 | 2
  /** 是否新游戏 1是 2否 */
  is_new?: 1 | 2
  /** 游戏标签 */
  tag_id?: number
  /** 场馆id（evo真人）（需要转成字符串） */
  platform_id?: string
  /** 排序sorting,en_name,created_at 三个字段支持排序，格式为 sorting:asc sorting:desc */
  sort?: string
}) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    is_fav: number
  }>>('/member/game/list', params)
}

/**
 * 游戏详情
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2aa03c22-4083-40c9-8a1f-0908901eabfe
 */
export function ApiMemberGameDetail(id: string) {
  return httpClient.get<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>(`/member/game/detail?id=${id}`)
}

/**
 * 启动游戏
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b75f9a13-ec49-4eea-bc24-1e7de8bb9e7a
 */
export function ApiGameLunch(pid: string, game_id: string, cur: string) {
  return httpClient.get<string>(`/game/launch/${pid}`, { code: game_id, cur })
}

/**
 * 搜索游戏
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=3a3a1a44-450d-40ea-a37e-1e88ed074895
 */
export function ApiMemberGameSearch(params: { w: string }) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>>('/member/game/search', params)
}

/**
 * 游戏收藏列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=cde927eb-45af-40aa-be78-18426224daf6
 */
export function ApiMemberFavList(
  params?: {
    page?: number
    page_size?: number
  }) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>>('/member/fav/list', params)
}

/**
 * 新增收藏
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=73c0d845-b1b6-4231-ae8e-bd72aefb6242
 */
export function ApiMemberFavInsert(id: string) {
  return httpClient.get(`/member/fav/insert?id=${id}`)
}

/**
 * 删除收藏
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=e79ee42a-504c-416a-b4d0-810ee949ede0
 */
export function ApiMemberFavDelete(id: string) {
  return httpClient.get(`/member/fav/delete?id=${id}`)
}

/**
 * 推荐游戏列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=1a5800ea-da6f-466d-bd42-27e3c39c5bf1
 */
export function ApiMemberGameRecList(params?: {
  page?: number
  page_size?: number
  /** 排序sorting,en_name,created_at 三个字段支持排序，格式为 sorting:asc sorting:desc */
  sort?: string
}) {
  return httpClient.get<IResponseList<{
    id: string
    platform_id: string
    name: string
    zh_name: string
    en_name: string
    pt_name: string
    th_name: string
    vn_name: string
    client_type: string
    game_type: number
    game_id: string
    img: string
    online: number
    is_hot: number
    sorting: number
    created_at: number
    is_new: number
    tag_id: string
    currency: string
    lang: string
    is_fav: number
  }>>('/member/game/rec/list', params)
}

/**
 * 场馆列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=d8e0da7a-92e4-4c67-bc62-8549304bada9
 */
export function ApiMemberPlatformList(
  params?: {
    page?: number
    page_size?: number
  }) {
  return httpClient.get<IResponseList<{
    id: string
    en_name: string
    game_type: number
    state: number
    maintained: number
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
  }>>('/member/platform/list', params)
}

/**
 * 虚拟钱包列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b5a4e1b7-5297-4210-9d76-17a6a8efb4b4
 */
export function ApiMemberWalletList(
  params: {
    /** 合约类型 */
    contract_type: string
    /** 货币id */
    currency_id: string
    page?: number
    page_size?: number
  },
) {
  return httpClient.get<IResponseList<{
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
    wallet_address: string
  }>>('/member/wallet/list', params)
}

/**
 * 保险库加减
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=925fc8cb-c68a-4825-aa56-34c425aa8752
 */
export function ApiMemberBalanceLockerUpdate(data: IMemberBalanceLockerUpdate) {
  return httpClient.post('/member/balance_locker/update', data)
}

/**
 * 保险库余额
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=86000030-4588-4690-9384-baa0584ea7d5
 */
export function ApiMemberBalanceLockerShow() {
  return httpClient.get<TCurrencyObject>('/member/balance_locker/show')
}

/**
 * 银行卡列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=3b3a818d-668f-41fc-ab45-3a8cbc3b3f40
 */
export function ApiMemberBankcardList(params: {
  page_size?: string
  page?: string
  currency_id: string
}) {
  return httpClient.get<IResponseList<{
    id: string
    uid: string
    username: string
    currency_id: string
    open_name: string
    bank_name: string
    bank_account: string
    bank_area_cpf: string
    is_default: number
  }>>('/member/bankcard/list', params)
}

/**
 * 辅助数据
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=eef5fa8c-373d-49fb-88cb-5f43d5223d6e
 * level: 001=数字货币分类，002=中国银行列表，
 *        003=越南银行列表，004=支付方式列表，
 *        005=支付类型列表，006=国家列表，
 *        007=币种列表，008=账变类型列表
 *        011=国际电话区号
 */
export function ApiMemberTreeList(params: {
  level: string
}) {
  return httpClient.get<{
    id: string
    name: string
    pid: string
    sortlevel: string
  }[]>('/member/tree/list', params)
}

/**
 * 银行卡添加
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=96b12d9e-536b-4aa3-b6bc-0a8a6fc4d17d
 */
export function ApiMemberBankcardInsert(data: {
  currency_id: string
  open_name: string
  bank_name: string
  bank_account: string
  bank_area_cpf?: string
  is_default?: number
}) {
  return httpClient.post<string>('/member/bankcard/insert', data)
}

/**
 * 添加虚拟币钱包地址
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2d1b9bf2-3557-421d-8f93-b5cfc3637afc
 */
export function ApiMemberWalletInsert(data: {
  /** 合约类型 */
  contract_type: string
  /** 货币名称 */
  currency_name: string
  /** 钱包地址 */
  wallet_address: string
  /** 是否默认：1：是，2否 */
  is_default?: number
}) {
  return httpClient.post<string>('/member/wallet/insert', data)
}

/**
 * 退出登陆
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=714a7e70-5d38-4c04-969d-f251710adf6b
 */
export function ApiMemberLoginout() {
  return httpClient.post<string>('/member/login_out')
}

/**
 * 修改登录密码
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=8099f10a-3710-4854-b933-61068636900f
 */
export function ApiMemberPasswordUpdate(data: {
  /** 原密码 */
  password: string
  /** 新密码 */
  new_password: string
}) {
  return httpClient.post<string>('/member/password/update', data)
}

/**
 * 查询余额
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=9aabea35-99e8-4d35-b58a-abbcb05ba837
 */
export function ApiMemberBalanceList() {
  return httpClient.get<TCurrencyObject>('/member/balance')
}

/**
 * 会员资料详情
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=a7da5a93-3c50-438f-b0aa-c7c9faada194
 */
export function ApiMemberDetail() {
  return httpClient.get<IMemberDetail>('/member/detail')
}

/**
 * 会员资料修改
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=4f939a92-0ef0-41fb-b7e7-339b196b6d63
 */
export function ApiMemberUpdate(data: IMemberDetail) {
  return httpClient.post<string>('/member/update', data)
}

/**
 * 货币配置信息
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=df9ed49c-03c3-452d-b5c8-ed7a73575049
 */
export function ApiMemberCurrencyConfig() {
  return httpClient.get<IMemberCurrencyConfig[]>('/member/currency/config')
}

/**
 * 邮箱验证申请
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=1114f62c-7a42-4784-8ed8-824d9c196ecb
 */
export function ApiMemberEmailCheckRequest(data: {
  email: string
}) {
  return httpClient.post<string>('/member/email/check/request', data)
}

/**
 * 邮箱验证
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b53f7df8-f7c1-47c7-bf0f-f4d7248d129f
 */
export function ApiMemberEmailCheck(data: {
  email: string
  captcha: string
  uid: string
}) {
  return httpClient.post<string>('/member/email/check', data)
}

/**
* 设置交易密码
* @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=7f28bcd5-c379-4de4-9027-cf3ce6f23695
*/
export function ApiMemberPayPasswordUpdate(data: {
  /** 交易密码 */
  pay_password: string
  /** 邮箱验证码 */
  code: string
}) {
  return httpClient.post<string>('/member/pay/password/update', data)
}

/**
* 发送邮箱验证码
* @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=80a6d16c-b13e-4647-91e1-3a18e73cef4c
*/
export function ApiMemberSendMailCode() {
  return httpClient.get<string>('/member/send/mail/code')
}
