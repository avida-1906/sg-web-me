import type {
  BankCard,
  CasinoLobbyGameItem,
  CasinoProviderItem,
  DepositInfo,
  EnumCurrencyKey,
  ExchangeRateData,
  IBrandDetailTag,
  ICasinoBetRecordItem,
  IMemberBalanceLockerUpdate,
  IMemberDetail,
  IMemberReg,
  IMemberThirdReg,
  INotNotice,
  IResponseList,
  IUserInfo,
  PayInfo,
  ProviderItem,
  TCurrencyObject,
  VipConfig,
  VirtualCoin,
  availableCurrency,
} from './types'
import type { CurrencyCode } from '~/composables/useCurrencyData'
import { httpClient } from '~/http'

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
export function ApiMemberReg(data: IMemberReg) {
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
  /** 游戏类型:1=真人,2=捕鱼,3=电子 */
  game_type?: 1 | 2 | 3
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
    game_type: string
    game_id: string
    img: string
    online: number
    is_hot: string
    sorting: number
    created_at: number
    is_new: string
    tag_id: string
    is_fav: string
  }>>('/member/game/list', { params })
}

/**
 * 游戏详情
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2aa03c22-4083-40c9-8a1f-0908901eabfe
 */
export function ApiMemberGameDetail(id: string, pid: string, game_id: string) {
  return httpClient.get<{
    id: string
    platform_id: string
    name: string
    game_type: string
    zk_online: number
    online: number
    game_id: string
    img: string
    sorting: number
    created_at: number
    rtp: string
    percent: string
    updated_at: string
    is_hot: string
    is_new: string
    is_fav: string
    currencys: EnumCurrencyKey[]
  }>(`/member/game/detail?id=${id}&pid=${pid}&game_id=${game_id}`)
}

/**
 * 启动游戏
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b75f9a13-ec49-4eea-bc24-1e7de8bb9e7a
 */
export function ApiGameLunch(pid: string, game_id: string, cur: string) {
  return httpClient.get<string>(`/game/launch/${pid}`, { params: { code: game_id, cur } })
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
    is_hot: string
    sorting: number
    created_at: number
    is_new: string
    tag_id: string
    currency: string
    lang: string
    is_fav: string
  }>>('/member/game/search', { params })
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
    is_hot: string
    sorting: number
    created_at: number
    is_new: string
    tag_id: string
    currency: string
    lang: string
    is_fav: string
  }>>('/member/fav/list', { params })
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
 * 查询场馆是否开启
 *  1在线，2下线
 */
export function ApiMemberPlatformState(pid: string) {
  return httpClient.get<1 | 2>('/member/platform/state', { params: { pid } })
}

/**
 * 查询类别是否开启
 *  1在线，2下线
 */
export function ApiMemberCateState(cid: string) {
  return httpClient.get<1 | 2>('/member/game/cate/state', { params: { cid } })
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
    is_hot: string
    sorting: number
    created_at: number
    is_new: string
    tag_id: string
    currency: string
    lang: string
    is_fav: string
  }>>('/member/game/rec/list', { params })
}

/**
 * 大厅游戏数据
 * ty = 1类别， ty = 2场馆
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=52e8029a-59b0-4669-a6c1-bc2d3c36d4e3
 */
export function ApiMemberGameLobby() {
  return httpClient.get<{
    id: string
    name: string
    icon: string
    navs: {
      ty: number
      cid: string
      platform_id: string
      name: string
      icon: string
      background: string
    }[]
    items: {
      ty: number
      cid: string
      platform_id: string
      name: string
      icon: string
      total: number
      games: CasinoLobbyGameItem[]
    }[]
    sidebars: {
      ty: number
      cid: string
      platform_id: string
      name: string
      icon: string
      background: string
    }[]
  }>('/member/game/lobby')
}

/**
* 游戏类别数据
* @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=dbde6b56-3f8f-4af4-8477-0ba93841c35a
*/
export function ApiMemberGameCate(params: { cid: string }) {
  return httpClient.get<{
    id: string
    name: string
    icon: string
    total: number
    sums: {
      platform_id: string
      platform_name: string
      total: number
    }[]
    games: CasinoLobbyGameItem[]
  }>('/member/game/cate', { params })
}

/**
 * 游戏类别游戏列表（翻页）
 */
export function ApiMemberGameCateGames(params: {
  cid: string
  page?: number
  page_size?: number
}) {
  return httpClient.get<IResponseList<{
    platform_id: string
    id: string
    game_id: string
    img: string
    name: string
    seq: number
  }>>('/member/game/cate/games', { params })
}
/**
 * 导航娱乐城体育按钮顺序
 */
export function ApiMemberGameCateIndex() {
  return httpClient.get<{
    id: string
    name: string
    seq: number
  }[]>('/member/game/cate/index')
}

/**
   * 场馆列表
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=d8e0da7a-92e4-4c67-bc62-8549304bada9
   */
export function ApiMemberPlatformList(params: {
  page?: number
  page_size?: number
  game_type: number
} = { page: 1, page_size: 100, game_type: 0 },
) {
  return httpClient.get<IResponseList<ProviderItem>>('/member/platform/list', { params })
}

/**
 * 娱乐城场馆列表
 *  /member/platform/venue/list
 */
export function ApiMemberPlatformVenueList(params: {
  page?: number
  page_size?: number
  game_type: number
} = { page: 1, page_size: 100, game_type: 0 },
) {
  return httpClient.get<IResponseList<CasinoProviderItem>>('/member/platform/venue/list', { params })
}

/**
 * 娱乐城投注记录
 * /member/casino/record/list
 */
export function ApiMemberCasinoRecordList(params: {
  page?: number
  page_size?: number
}) {
  return httpClient.get<IResponseList<ICasinoBetRecordItem>>('/member/casino/record/list', { params })
}

/**
   * 虚拟钱包列表
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b5a4e1b7-5297-4210-9d76-17a6a8efb4b4
   */
export function ApiFinanceWithdrawWallet(
  params: {
    /** 合约类型 */
    contract_type: string
    /** 货币id */
    currency_id: string
    page?: number
    page_size?: number
  },
) {
  return httpClient.get<IResponseList<VirtualCoin>>('/finance/withdraw/wallet', { params })
}

/**
   * 保险库加减
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=925fc8cb-c68a-4825-aa56-34c425aa8752
   */
export function ApiMemberBalanceLockerUpdate(data: IMemberBalanceLockerUpdate) {
  return httpClient.post('/member/balance/locker/update', data)
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
  return httpClient.get<IResponseList<BankCard>>('/member/bankcard/list', { params })
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
    /** 电话号码区号 */
    attr: string
    id: string
    /** 国家地区名称 */
    name: string
    pid: string
    sortlevel: string
  }[]>('/member/tree/list', { params })
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
  /**
   * 1:是
   *
   * 2:否
   */
  is_default?: number
  pay_password: string
  country: string
  city: string
  address: string
  /**
   * 1:谷歌
   *
   * 2:资金密码
   */
  auth_type: 1 | 2
}) {
  return httpClient.post<string>('/member/bankcard/insert', data)
}

/**
   * 添加虚拟币钱包地址
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2d1b9bf2-3557-421d-8f93-b5cfc3637afc
   */
export function ApiMemberWalletInsert(data: {
  /** 合约类型 */
  contract_type: number
  /** 货币id */
  currency_id: string
  /** 钱包地址 */
  address: string
  /** 是否默认：1：是，2否 */
  is_default?: number
  /** 资金密码 */
  pay_password: string
  auth_type: number
}) {
  return httpClient.post<string>('/member/wallet/insert', data)
}

/**
   * 退出登陆
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=714a7e70-5d38-4c04-969d-f251710adf6b
   */
export function ApiMemberLogout() {
  return httpClient.post<string>('/member/logout')
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
export function ApiMemberUpdate(data: {
  record: {
    email?: string
  } & Partial<IUserInfo>
  uid?: string
}) {
  const _data = { ...data }
  delete _data.record.third_id
  delete _data.record.third_type
  delete _data.record.sex

  return httpClient.post<string>('/member/update', application.removeEmpty(_data))
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
  * 设置资金密码
  * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=7f28bcd5-c379-4de4-9027-cf3ce6f23695
  */
export function ApiMemberPayPasswordUpdate(data: {
  /** 1-设置 2-修改 */
  types: 1 | 2
  /** 原资金密码 修改时使用 */
  old_pay_password?: string
  /** 资金密码 */
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

/**
   * 会员账号校验
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=954ecf22-c1d5-4ca6-9576-655090e75d18
   */
export function ApiMemberExists(params: {
  /** 1会员名 2邮箱地址 */
  ty: 1 | 2
  /** 会员名或者邮箱地址 */
  val: string
} & INotNotice) {
  return httpClient.get<string>('/member/exists', { params })
}

/**
   * 忘记密码
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=4c8f31ed-b895-4d8a-9bba-1c446b7b891d
   */
export function ApiMemberForgetPassword(params: {
  email: string
}) {
  return httpClient.get<string>('/member/forget/password', { params })
}

/**
  * 会员卡包
  * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=c2214746-c638-4695-bc43-7332b9906502
  */
export function ApiWalletBankcardList() {
  return httpClient.get<{
    bankcard: {
      [key: string]: BankCard[]
    }
    coin: {
      [key: string]: VirtualCoin[]
    }
  }>('/member/wallet/bankcard/list')
}

/**
   * 双重验证
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=4f07bbd4-26b3-4c1b-bf47-87fbb8ac6e09
   */
export function ApiMemberDualVerify(data: {
  password: string
  code: string
}) {
  return httpClient.post<string>('/member/dual/verify', data)
}

/**
   * 会员登陆日记
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=269c1d37-c318-455e-bc06-1e6ea7d5e866
   */
export function ApiMemberFrontLoginLogList(params?: {
  page_size?: string
  page?: string
}) {
  return httpClient.get<IResponseList<{
    id: string
    browser: string
    loginip: string
    ipaddress: string
    created_at: number
  }>>('/member/front/login/log/list', { params })
}

/**
   * 删除钱包地址
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b4d0e4df-e035-41da-8073-de5518b03d5b
   */
export function ApiMemberWalletDelete(data: {
  id: string
  pay_password: string
  auth_type: number
}) {
  return httpClient.post<string>('/member/wallet/delete', data)
}

/**
   * 删除银行卡
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=ef81a01f-6743-404b-a2fa-d4ee172885d6
   */
export function ApiMemberBankcardDelete(data: {
  id: string
  pay_password: string
  auth_type: number
}) {
  return httpClient.post<string>('/member/bankcard/delete', data)
}

/**
 * 支付方式列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=fc432cbb-655f-4eb9-9a4c-4cec7036f261
 */
export function ApiFinanceMethodList(params: {
  currency_id: string
}) {
  return httpClient.get<{
    /** 支付方式id */
    id: string
    /** 优惠标签名称 */
    pname: string
    /** 1001活动 1002赠送 1003热门 1004推荐 */
    ptype: number
    /** 标签值 */
    promo: string
    /** 方式别名 */
    alias: string
    /** 通道名称 */
    name: string
    /** 是否拥有银行选项 */
    bank: boolean
    /** 获取银行id */
    zkId: string
    /** 1-在线⽀付 2-公司⼊款/货币⼊款 */
    payment_type: number
    /** 银行卡id */
    bankcard_id: string
  }[]>('/finance/method/list', { params })
}

/**
 * 支付通道列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=6d059119-743a-476b-ba97-19b694216b77
 */
export function ApiFinanceMerchantList(params: {
  id: string
}) {
  return httpClient.get<{
    /** 支付平台id */
    id: string
    /** 通道名称 */
    name: string
    /** 通道最大充值金额 */
    amount_max: string
    /** 通道最小充值金额 */
    amount_min: string
    /** 金额种类:1:固定2:范围 */
    amount_type: number
    /** 固定金额 */
    amount_fixed: string
    /** 常用金额,逗号隔开 */
    often_amount: string
  }[]>('/finance/merchant/list', { params })
}

/**
 * 聊天室 发送消息
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=d45a32fc-e2da-4e64-b1db-3f8788dd6300
 */
export function ApiChatSendMessage(data: {
  /** 发送的消息 */
  c: string
  lang: string
  /** 唯一id标志 */
  s: string
  v?: string
}) {
  return httpClient.post<string>(`/member/chat/send?lang=${data.lang}`, { c: data.c, s: data.s, v: data.v })
}

/**
 * 聊天室 获取历史记录
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=09c65522-62f2-4d99-a9d4-d2d85125487b
 */
export function ApiChatGetHistory(params: {
  lang: string
}) {
  return httpClient.get<{
    /** 消息 id */
    s: string
    /** 消息内容 */
    c: string
    /** 用户id */
    u: string
    /** 用户名称 */
    n: string
    /** 创建时间 */
    t: number
  }[]>('/member/chat/history/list', { params })
}

/**
 * 三方支付存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b88a28f8-3a76-41e8-bcf0-af00a8bb3452
 */
export function ApiFinanceThirdDeposit(data: DepositInfo) {
  return httpClient.post<string>('/finance/third/deposit', data)
}

/**
 * 三方支付银行列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=9efdb2ee-b7f7-4780-8a7e-6b7b15935935
 */
export function ApiPaymentDepositBankList(params: {
  id: string
}) {
  return httpClient.get<{
    id: string
    name: string
  }[]>('/payment/deposit/bank/list', { params })
}

/**
 * 代付方式-列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=65324c0c-c180-45e7-a0b9-c4780a506132
 */
export function ApiFinanceWithdrawMethodList(params: {
  currency_id: string
}) {
  return httpClient.get<{
    id: string
    /** 方式别名 */
    alias: string
    /** 通道名称 */
    name: string
  }[]>('/finance/withdraw/method/list', { params })
}

/**
 * 代付平台-取款卡(原银行卡列表 使用该接口)
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=c11a2c44-2fc6-4838-a268-489205586e46
 */
export function ApiFinanceWithdrawBankcard(params: {
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
    state: number
    created_at: number
    updated_at: number
    pay_password: string
  }>>('/finance/withdraw/bankcard', { params })
}

/**
 * 法币取款申请
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=9412e69d-1dcc-463b-bf5e-61b4bbea2d60
 */
export function ApiFinanceWithdraw(data: {
  currency_id: number
  method_id: string
  amount: string
  pay_password: string
  bankcard_id: string
  auth_type: number
  auth_code: string
}) {
  return httpClient.post<string>('/finance/withdraw', data)
}

/**
 * 查询余额 /member/balance
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=9aabea35-99e8-4d35-b58a-abbcb05ba837
 */
export function ApiMemberBalance() {
  return httpClient.get<TCurrencyObject>('/member/balance')
}

/**
 * 虚拟币取款申请
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=92ca9d78-f919-4210-9067-b0204b71f89f
 */
export function ApiFinanceWithdrawCoin(data: {
  /** 货币id */
  currency_id: number
  /** 协议id */
  contract_id: string
  /** 地址id */
  wallet_id: string
  amount: string
  pay_password: string
  auth_type: number
  auth_code: string
}) {
  return httpClient.post<string>('/finance/withdraw/coin', data)
}

/**
 * 建议反馈对话列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=feac25f6-1830-4cbe-bc4b-d547c28ec44f
 */
export function ApiGetFeedbackChatList(data: {
  /** 反馈ID */
  feed_id: string
}) {
  return httpClient.post<Array<{
    images?: string
    description?: string
    content: string
    created_at: number
    feed_id: string
    uid: string
    id: string
  }>>('/member/feedback/chat/list', data)
}

/**
 * 新增反馈消息
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=4640e6ab-44d1-4ac5-83dd-093964c5545b
 */
export function ApiAddFeedbackChatMsg(data: {
  /** 反馈ID */
  feed_id: string
  /** 聊天内容 */
  content: string
  /** 来源 1会员 2商户后台 */
  source: number
}) {
  return httpClient.post<string>('/member/feedback/chat/insert', data)
}

/**
 * 反馈对话状态已读更新
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b8bc6fbd-42e4-4100-bf71-7a8fe961cc01
 */
export function ApiMemberFeedbackUpdate(data: {
  id: string
}) {
  return httpClient.post<string>('/member/feedback/update', data)
}

/**
 * 文件上传
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=9d5e6346-ba11-4f4f-8960-82a9c96cf4ed
 */
export function ApiMemberUpload(data: {
  upload_type: number
  upload_file: File
}) {
  return httpClient.post<string>('/member/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

/**
 * 新增建议反馈
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=f92f7729-5149-4a27-b42b-719a3ccf504e
 */
export function ApiMemberFeedbackInsert(data: {
  /** 多个图片用逗号隔开 */
  images: string
  /** 反馈描述 */
  description: string
}) {
  return httpClient.post<string>('/member/feedback/insert', data)
}

/**
 * 建议反馈列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=c46ed809-7302-4046-9ad7-7eac70271c75
 */
export function ApiMemberFeedbackList() {
  return httpClient.post<IResponseList<{
    id: string
    uid: string
    username: string
    /** 消息数量 */
    replys: number
    newest: number
    /** 会员新消息数 */
    newest_m: number
    created_at: number
    updatd_at: number
    images: string[]
    /** 第一条消息 */
    description: string
    /** 操作人 */
    updatd_by: string
    /** 状态 1待处理 2已采纳 3已忽略 */
    state: number
    /** 采纳金 usdt */
    amount: string
    /**  采纳金领取状态 1待领取 2已领取 */
    bonusState: number
  }>>('/member/feedback/list', { })
}

/**
 * 反馈奖励领取
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=da38bee1-174d-4dad-a31f-9ed84ea77bde
 */
export function ApiMemberFeedbackBonusDraw(data: {
  /** 反馈ID */
  feed_id: string
  /** 币种 */
  cur: CurrencyCode
}) {
  return httpClient.post<string>('/member/feedback/bonus/draw', data)
}

/**
 * 待领取总奖励金额
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=79fde42e-8f48-44e6-85f9-ffd107d4e32b
 */
export function ApiMemberFeedbackBonusAll() {
  return httpClient.get<string>('/member/feedback/bonus/reward')
}

/**
 * 所有会员公告和跑马灯-登陆前调用
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=cca2216f-630e-4c7b-b02c-56393674ef7d
 */
export function ApiMemberNoticeAllList() {
  return httpClient.get<{
    marquee: {
      id: string
      /** 内容 */
      content: {
        [key: string]: string
      }
    }[]
    notice: {
      value?: string
      /** ID */
      id: string
      /** 公告类型 1-公告  2-跑马灯 */
      notice_type: number
      /** 公告标题 */
      title: string
      /** 开始时间 */
      start_time: number
      /** 结束时间 */
      end_time: number
      /** 弹跳位置 1-不限制 2-登录前 3-登陆后 */
      bounce_location: number
      /** 弹跳频率 1-不限制 2-自定义 */
      bounce_frequency: number
      /** 自定义频率次数 */
      bounce_frequency_limit: number
      /** 弹窗内容类型 1-文字 2-图片 */
      pop_up_type: number
      /** 内容 */
      content: {
        [key: string]: string
      }
      /** 图片地址 */
      image_url: {
        [key: string]: string
      }
    }[]
  }>('/member/notice/all/list')
}

/**
 * 所有会员公告和跑马灯-登陆后调用
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=9dda76e7-05ff-4b80-b536-cdcf1b9da762
 */
export function ApiMemberNoticeList(params: {
  /** 1-公告  2-跑马灯 */
  types: string
}) {
  return httpClient.get<{
    /** ID */
    id: string
    /** 公告类型 1-公告  2-跑马灯 */
    notice_type: number
    /** 公告标题 */
    title: string
    /** 开始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 弹跳位置 1-不限制 2-登录前 3-登陆后 */
    bounce_location: number
    /** 弹跳频率 1-不限制 2-自定义 */
    bounce_frequency: number
    /** 自定义频率次数 */
    bounce_frequency_limit: number
    /** 弹窗内容类型 1-文字 2-图片 */
    pop_up_type: number
    /** 内容 */
    content: {
      [key: string]: string
    }
    /** 图片地址 */
    image_url: {
      [key: string]: string
    }
  }[]>('/member/notice/list', { params })
}

/**
 * 汇率获取
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=8184892e-c125-49b0-8f8d-e5c60da4fc78
 */
export function ApiMemberExchangeRate() {
  return httpClient.get<ExchangeRateData>('/game/exchange/rate/list')
}

/**
 * 保险库余额查询
 * @see null
 */
export function ApiMemberBalanceLocker() {
  return httpClient.get<TCurrencyObject>('/member/balance/locker')
}

/**
 * 会员vip配置
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=bdd0cb62-0a93-4516-885d-ce714ea52c56
 */
export function ApiMemberVipConfig() {
  return httpClient.get<{ [k: string]: VipConfig }>('/member/vip/config')
}

/**
 * vip 奖金领取历史
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=96ca75cd-8d54-4ad7-a194-49f24524f1c9
 */
export function ApiMemberVipBonusRecord(params: {
  page: number
  page_size: number
  start_time: number
  end_time: number
  /** 818 vip晋级礼金 819 vip日红包 820 vip周红包 821 vip月红包 822 vip生日礼金 */
  cash_type: string
}) {
  return httpClient.get<IResponseList<{
    amount: string
    cash_type: string
    created_at: number
    currency_id: CurrencyCode
    id: string
    receive_amount: string
    receive_currency_id: CurrencyCode
    updated_at: number
  }>>('/member/vip/bonus/apply/list', { params })
}

/**
 * vip 奖金领取
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b913c96a-70ba-485c-b1f0-4b3ef8f89769
 */
export function ApiMemberApplyVipBonus(params: {
  /** 选择币种领取 */
  cur: CurrencyCode
  /** 可领取奖励 id */
  id: string | number
}) {
  return httpClient.get<{
    id: number
    uid: string
    username: string
    level_id: number
    vip: number
    top_uid: string
    top_name: string
    parent_uid: string
    parent_name: string
    currency_id: number
    receive_currency_id: number
    amount: number
    receive_amount: number
    cash_type: number
    tester: number
    state: number
    created_at: number
    updated_at: number
  }[]>('/member/vip/bonus/apply', { params })
}

/**
 * vip 可用奖励
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=eab43035-6f7d-408e-b9b9-122e4f745c16
 */
export function ApiMemberVipBonusAvailable(params: {
  /** 奖励类型 */
  cash_type: number | string
}) {
  return httpClient.get<{
    id: string
    cash_type: number
    amount: string
    state: number
    vip: string
    /** 已领取金额 */
    receive_amount: string
  }[]>('/member/vip/bonus/available', { params })
}

/**
 * 公司入款存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=7b826674-bdb4-4456-b82f-22b640f2b4b5
 */
export function ApiPaymentDepositBankApplication(data: DepositInfo) {
  return httpClient.post<{
    id: string
    amount: string
    currency_id: string
    bankcard: {
      id: string
      open_name: string
      bank_id: string
      bank_account: string
      level: string
      client_type: string
      state: number
      bank_area_cpf: string
    }
  }>('/payment/deposit/bank/application', data)
}

/**
 * 虚拟币入款存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=02920906-b9b2-49c9-8095-284e4caf061a
 */
export function ApiPaymentDepositCoinApplication(data: DepositInfo) {
  return httpClient.post<{
    id: string
    amount: string
    currency_id: string
    deposit_coin: {
      id: string
      currency_id: string
      contract_type: string
      currency_name: string
      wallet_address: string
      state: number
      remarks: string
    }
  }>('/payment/deposit/coin/application', data)
}

/**
 * 公司入款存款-我已存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=564020fc-9a00-46f7-b357-c2ea767c451a
 */
export function ApiPaymentDepositBankConfirm(data: {
  /** 订单号 */
  id: string
}) {
  return httpClient.post<boolean>('/payment/deposit/bank/confirm', data)
}

/**
 * 虚拟币入款存款-我已存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=be9c387f-f8f7-4e56-a8a6-4df82c54343f
 */
export function ApiPaymentDepositCoinConfirm(data: {
  /** 订单号 */
  id: string
}) {
  return httpClient.post<string>('/payment/deposit/coin/confirm', data)
}

/**
 * 虚拟币支付通道-列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=360094b9-8633-4379-a464-edb4834db91a
 */
export function ApiFinanceMerchantCoinList(params: {
  /** 货币id */
  currency_id: string
  /** 协议id */
  contract_id: string
}) {
  return httpClient.get<{
    /** 通道id */
    id: string
    /** 通道名称 */
    name: string
    /** 支付方式id */
    method_id: string
    amount_max: string
    amount_min: string
    amount_type: number
    amount_fixed: string
    often_amount: string
    /** 1-在线⽀付 2-公司⼊款/货币⼊款 */
    payment_type: number
  }[]>('/finance/merchant/coin/list', { params })
}

/**
 * 会员站点banner列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=1da00228-93c5-4100-9bfc-02ee66985214
 */
export function ApiMemberBannerList(params: {
  /** 类型 */
  banner_type: string
}) {
  return httpClient.get<{
    /** banner类型 1-娱乐城 2-体育 */
    banner_type: number
    /** 客户端 */
    client: string[]
    /** 内容 */
    content: {
      [key: string]: string
    }
    /** 创建时间 */
    created_at: number
    /** 创建人 */
    created_by: string
    /** ID */
    id: string
    /** 图片明细 */
    image_info: {
      button_state: number
      button_jump_type: number
      button_text: string
      button_jump_url: string
    }
    /** 图片地址 */
    image_url: {
      [key: string]: string
    }
    /** 跳转类型 1-自定义 2-娱乐城 3-体育 4-优惠活动 5-联盟中心 */
    jump_type: number
    /** 跳转url */
    jump_url: string
    /** 排序字段 */
    mobile_seq: number
    /** 排序字段 */
    pc_seq: number
    /** 状态 1-显示 2-隐藏 */
    state: number
  }[]>('/member/banner/list', { params })
}

/**
 * 查询会员 vip 总待领取奖金
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=eab43035-6f7d-408e-b9b9-122e4f745c16
 */
export function ApiMemberVipBonusAmount() {
  return httpClient.get<string>('/member/vip/bonus/amount')
}

/**
 * 三方登录 url - google
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=7cc18fc1-9c12-4e47-a8cf-45d30276e674
 */
export function ApiMemberThirdAuthUrl(params: {
  state: string
  type: string
  device_number: string
}) {
  return httpClient.get<string>(`/member/third/auth/${params.type}/url`, {
    headers: {
      state: params.state,
      device_number: params.device_number,
      dnb: params.device_number,
    },
  })
}

/**
 * 三方登录注册
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=81413d60-d816-45c0-8df0-47436a1bd837
 */
export function ApiMemberThirdReg(data: IMemberThirdReg) {
  return httpClient.post<string>('/member/third/register', data, {
    headers: {
      device_number: data.device_number,
    },
  })
}

/**
 * 虚拟币三方支付存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=aa741251-f806-449e-ad2a-20537448feaf
 */
export function ApiFinanceThirdCoinDeposit(data: DepositInfo) {
  return httpClient.post<{
    /** 支付地址，可生成qr code */
    address: string
    /** 实际支付金额 */
    amount: string
  }>('/finance/third/coin/deposit', data)
}

/**
 * 公司入款存款-取消存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=ede3a53b-1f69-4cb5-9c93-7226ce205466
 */
export function ApiPaymentDepositBankCancel(data: {
  /** 订单号 */
  id: string
}) {
  return httpClient.post<string>('/payment/deposit/bank/cancel', data)
}

/**
 * 虚拟币入款存款-取消存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=a4edef45-f839-4f88-9928-5197ffee1ab7
 */
export function ApiPaymentDepositCoinCancel(data: {
  /** 订单号 */
  id: string
}) {
  return httpClient.post<string>('/payment/deposit/coin/cancel', data)
}

/**
 * 会员站内信列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=6bdb3b5f-bd0e-40f6-9494-8b89bb001184
 */
export function ApiMemberStationInfoList() {
  return httpClient.get<{
    id: string
    title: string
    content: {
      [key: string]: string
    }
    created_at: number
    state: number
  }[]>('/member/station/info/list')
}

/**
 * 会员站内信修改状态已读
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=dc22d396-50b4-46ee-a01b-2343ac338ced
 */
export function ApiMemberStationInfoDetailUpdateState(data: {
  /** 站内信id */
  id: string
}) {
  return httpClient.post<string>(`/member/station/info/detail/update/state?id=${data.id}`)
}

/**
 * 测试环境下使用，删除三方登录用户数据
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=af64b5e3-b754-4865-aab4-358c59612464
 */
export function ApiDevDeleteThirdAuth(data: {
  email: string
}) {
  return httpClient.post<string>('/member/third/auth/delete', data)
}

/**
 * 会员站点brand信息 member/brand/detail
 *
 * 参数：tag标识
 * base 基础信息
 * deposit:最低存款配置
 * withdraw:最低取款配置
 * reg:注册信息
 * third:三方配置
 * customer:客服配置
 * pc:pc配置
 * area:地区限制配置
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=93c37e67-0f92-4a55-9adb-4c696a387d5c
 */
export function ApiMemberBrandDetail(params: {
  tag: IBrandDetailTag
}) {
  return httpClient.get<any>('/member/brand/detail', { params })
}

/**
 * 交易记录-存款-虚拟币
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=95af1c4c-4a20-487b-96fa-3e86cc18f3a1
 */
export function ApiFinanceRecordDepositCoin(params?: {
  page?: number
  page_size?: number
}) {
  return httpClient.get<IResponseList<PayInfo>>('/finance/record/deposit/coin', { params })
}

/**
 * 交易记录-存款-法币
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=911de451-1aa8-4904-b787-5092d25d0ebc
 */
export function ApiFinancRecordDepositBank(params?: {
  page?: number
  page_size?: number
}) {
  return httpClient.get<IResponseList<PayInfo>>('/finance/record/deposit/bank', { params })
}

/**
 * 交易记录-取款-虚拟币
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=50e762a0-8fb5-47a4-93bc-b6ec34be5a15
 */
export function ApiFinanceRecordWithdrawCoin(params?: {
  page?: number
  page_size?: number
}) {
  return httpClient.get<IResponseList<PayInfo>>('/finance/record/withdraw/coin', { params })
}

/**
 * 交易记录-取款-法币
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=8170a1b8-c31e-4003-8ddf-ae198356a635
 */
export function ApiFinanceRecordWithdrawBank(params?: {
  page?: number
  page_size?: number
}) {
  return httpClient.get<IResponseList<PayInfo>>('/finance/record/withdraw/bank', { params })
}

/**
 * 联盟计划-我的佣金 agency/commission
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=500ef9ab-2c8b-4324-89d1-f483fea118cd
 */
export function ApiAgencyCommission(data?: {
  page?: number
  page_size?: number
  start_time?: number
  end_time?: number
}) {
  return httpClient.post<IResponseList<{
    /** id */
    id: string
    /** 会员id */
    uid: string
    /** 会员账号 */
    username: string
    /** 上级uid */
    parent_uid: string
    /** 上级代理 */
    parent_name: string
    /** 开始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 佣金等级 */
    commission_level: number
    /** 总人数(贡献人数) */
    sub_user_count: number
    /** 直属人数 */
    direct_user_count: number
    /** 其它人数 */
    other_user_count: number
    /** 总佣金 */
    commission_amount_total: string
    /** 直属佣金 */
    commission_amount_direct: string
    /** 其它佣金 */
    commission_amount_other: string
    /** 总业绩 */
    valid_bet_amount_total: string
    /** 直属业绩 */
    valid_bet_amount_direct: string
    /** 其它业绩 */
    valid_bet_amount_other: string
    /** 币种 */
    currency_id: string
    /** 模式id */
    model_id: string
    /** 模式名称(类型名称) */
    model_name: string
    /** 创建时间 */
    created_at: number
    /** 结算时间 */
    send_time: number
  }>>('/agency/commission', data)
}

/**
 * 联盟计划-所有数据 agency/report/all
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=a5eac8d6-e252-4242-86ac-21ef5c324381
 */
export function ApiAgencyReportAll(data?: {
  page?: number
  page_size?: number
  username?: string
  currency_id?: string
  start_time?: string
  end_time?: string
}) {
  return httpClient.post<IResponseList<{
    /** 会员id */
    uid: string
    /** 会员账号 */
    username: string
    /** 货币ID */
    currency_id: string
    /** 货币名称 */
    currency_name: string
    /** 存款金额 */
    deposit_amount: string
    /** 有效投注 */
    valid_bet_amount: string
    /** 输赢 */
    net_amount: string
    /** vip等级 */
    vip: string
    /** 创建时间 */
    created_at: number
  }>>('/agency/report/all', data)
}

/*
 * 联盟计划-我的推广
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=adf27c0e-0c24-4d01-a5f4-45b93b8244f4
 */
export function ApiGetMyPro() {
  return httpClient.get<{
    link_url?: string
    commission?: {
      accumulated: string
      received: string
      last_commission: string
    }
    performance?: {
      team_num: number
      direct_num: number
      other_num: number
      performance_amount: string
      direct_amount: string
      other_amount: string
    }
    subordinate?: {
      valid_bet_amount: string
      bet_num: number
      net_amount: string
    }
  }>('/agency/mypromotion')
}

/**
 * 我的业绩
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2150139e-5490-4f79-82fb-773e3674d569
 */
export function ApiAgencyPerformance(data?: {
  page?: number
  page_size?: number
  username?: string
  currency_id?: string
  start_time?: string
  end_time?: string
}) {
  return httpClient.post<IResponseList<{
    /** id */
    id: string
    /** 会员id */
    uid: string
    /** 会员账号 */
    username: string
    /** 上级uid */
    parent_uid: string
    /** 上级代理 */
    parent_name: string
    /** 开始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 佣金等级 */
    commission_level: number
    /** 总人数(贡献人数) */
    sub_user_count: number
    /** 直属人数 */
    direct_user_count: number
    /** 其它人数 */
    other_user_count: number
    /** 总佣金 */
    commission_amount_total: string
    /** 直属佣金 */
    commission_amount_direct: string
    /** 其它佣金 */
    commission_amount_other: string
    /** 总业绩 */
    valid_bet_amount_total: string
    /** 直属业绩 */
    valid_bet_amount_direct: string
    /** 其它业绩 */
    valid_bet_amount_other: string
    /** 币种 */
    currency_id: string
    /** 模式id */
    model_id: string
    /** 模式名称(类型名称) */
    model_name: string
    /** 创建时间 */
    created_at: number
    /** 结算时间 */
    send_time: number
  }>>('/agency/performance', data)
}

/**
 * 直属财务
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=c7e29704-cfd7-4e14-ace8-f65fc7562810
 */
export function ApiAgencyReportFinance(data?: {
  page?: number
  page_size?: number
  username?: string
  currency_id?: string
  start_time?: string
  end_time?: string
}) {
  return httpClient.post<IResponseList<{
    /** 会员id */
    uid: string
    /** 会员账号 */
    username: string
    /** 货币ID */
    currency_id: string
    /** 货币名称 */
    currency_name: string
    /** 存款金额 */
    deposit_amount: string
    /** 存款次数 */
    deposit_count: number
    /** 取款金额 */
    withdraw_amount: string
    /** 取款次数 */
    withdraw_count: number
    /** 存取差额 */
    deposit_withdraw_amount: string
    /** 账户余额 */
    balance: string
    /** vip等级 */
    vip: string
    /** 统计日期 */
    time: number
    /** 创建时间 */
    created_at: number
  }>>('/agency/report/finance', data)
}

/**
 * 直属投注
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=98114b7e-3b40-4706-9e58-92f50618dd59
 */
export function ApiAgencyReportBet(data?: {
  page?: number
  page_size?: number
  username?: string
  currency_id?: string
  start_time?: string
  end_time?: string
}) {
  return httpClient.post<IResponseList<{
    /** 会员id */
    uid: string
    /** 会员账号 */
    username: string
    /** 货币ID */
    currency_id: string
    /** 货币名称 */
    currency_name: string
    /** 注单数量 */
    bet_count: number
    /** 总输赢 */
    net_amount: string
    /** 有效投注 */
    valid_bet_amount: number
    /** VIP等级 */
    vip: number
    /** 统计日期 */
    time: number
    /** 创建时间 */
    created_at: number
  }>>('/agency/report/bet', data)
}

/**
 * 直属领取
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=4184dc53-cfd7-4eb6-91ac-5fbff97ea02e
 */
export function ApiAgencyReportReceive(data?: {
  page?: number
  page_size?: number
  username?: string
  currency_id?: string
  start_time?: string
  end_time?: string
}) {
  return httpClient.post<IResponseList<{
    /** 会员id */
    uid: string
    /** 会员账号 */
    username: string
    /** 货币ID */
    currency_id: string
    /** 货币名称 */
    currency_name: string
    /** 优惠金额 */
    gift_amount: string
    /** 代理佣金 */
    commission_amount: string
    /** 总领取 */
    total_receive: string
    /** VIP等级 */
    vip: number
    /** 统计日期 */
    time: number
    /** 创建时间 */
    created_at: number
  }>>('/agency/report/receive', data)
}

/**
 * 直属用户
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=396c93ca-08a3-478c-be95-8df150526caa
 */
export function ApiAgencyReportUser(data?: {
  page?: number
  page_size?: number
  username?: string
  currency_id?: string
  start_time?: string
  end_time?: string
}) {
  return httpClient.post<IResponseList<{
    /** 会员id */
    uid: string
    /** 会员账号 */
    username: string
    /** 1:离线 2:在线 */
    online: '1' | '2'
    /** 存款次数当值大于0标识首存 */
    deposit_count: number
    /** 上次登录时间 */
    last_login_at: number
    /** VIP等级 */
    vip: number
    /** 注册时间 */
    created_at: number
  }>>('/agency/report/user', data)
}

/**
 * 佣金比例 agency/commission/scale
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=6848df0c-36d0-4661-bb0d-af39bae989db
 */
export function ApiAgencyCommissionScale() {
  return httpClient.get<
    {
      conf_global: {
        id: string
        send_type: number
        commission_max_limit: string
        commission_settlement_type: number
      }
      conf: {
        id: string
        /** 1真人 2捕鱼 3电子 4体育 5棋牌 6电竞 */
        model_ids: string
        ico: string[]
        levels: {
          id: string
          /** 佣金配置ID */
          commission_id: string
          /** 等级 */
          level: number
          /** 有效投注≥(单位：万) */
          effective_amount: string
          /** 返佣比例% */
          rebate_ratio: string
          updated_by: string
          updated_at: number
          uid: string
        }[]
        performances: null
      }[]
    }>('/agency/commission/scale')
}

/**
 * 注册子代理
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=505e7566-d623-4529-bab6-50205becd5da
 */
export function ApiAgencyInsert(data: {
  /** 会员账号 */
  username: string
  /** 会员密码 */
  password: string
  /** 邮箱 */
  email: string
  /** 出生日期 */
  birthday: string
}) {
  return httpClient.post<string>('/agency/insert', data)
}

/**
 * 交易记录-其他-下拉选单
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=092cb9e6-c3b4-4bc0-b574-00b398629681
 */
export function ApiFinanceRecordOtherSelect() {
  return httpClient.get<{
    /** id */
    id: string
    /** 名称 */
    name: string
  }[]>('/finance/record/other/select')
}

/**
 * 交易记录-其他-列表
 * @see https://console-docs.apipost.cn/preview/c00b1160394a31fb?target_id=3a7be0ec-1921-462e-bc77-96a3de05502b
 */
export function ApiFinanceRecordOther(params?: {
  page?: number
  page_size?: number
  /** 菜单id */
  id: string
}) {
  return httpClient.get<IResponseList<PayInfo>>('/finance/record/other', { params })
}

/**
 * 支付可用货币列表-钱包存款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=0f52cba2-b41f-4d06-ae97-291b2fbe848d
 */
export function ApiFinanceDepositCurrency() {
  return httpClient.get<availableCurrency[]>('/finance/deposit/currency')
}

/**
 * 支付可用货币列表-钱包提款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=54fde819-78a2-43b8-b24a-09bd9888fe6c
 */
export function ApiFinanceWithdrawCurrency() {
  return httpClient.get<availableCurrency[]>('/finance/withdraw/currency')
}

/**
 * 查询可取款余额-钱包提款
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2d52d42a-26f6-4b0e-9ee8-00e965a28687
 */
export function ApiFinanceWithdrawBalance(params: {
  /** 货币id */
  currency_id: string
}) {
  return httpClient.get<{
    /** 可提款金额 */
    withdraw_balance: string
    /** 所需打码 */
    remaining_balance: string
    /** 会员余额 */
    total_balance: string
  }>('/finance/withdraw/balance', { params })
}

/**
 * 查询代理余额
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=05a39f6b-613a-44e6-a753-f76f547e6df1
 */
export function ApiMemberBalanceAgency() {
  return httpClient.get<TCurrencyObject>('/member/balance/agency')
}

/**
 * 佣金历史记录
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=89c29e8e-c6ff-45d3-bcda-94c6f5d728a2
 */
export function ApiAgencyCommissionRecords(data?: {
  page: number
  page_siz: number
  start_time: string
  end_time: string
  cash_type: string
}) {
  return httpClient.post<IResponseList<{
    'id': string
    /** 订单号 */
    'bill_no': string
    /** uid */
    'uid': string
    /** 会员名 */
    'username': string
    /** 全部为空，帐变id，取帐变类型中的关于代理钱包的cash_type */
    'cash_type': number
    /**  */
    'business_type': number
    /** 金额 */
    'amount': string
    /**  */
    'before_amount': string
    /**  */
    'after_amount': string
    /**  */
    'multiple': number
    /**  */
    'created_at': number
    /**  */
    'tester': number
    /**  */
    'remark': string
    /** 币种 */
    'currency_id': CurrencyCode
    /**  */
    'operator_uid': string
    /**  */
    'operator_name': string
    /**  */
    'device': number
    /** 时间（毫秒） */
    'apply_at': number
    /** 类型 */
    'cash_type_name': string
    /**  */
    'business_type_name': string
  }[]>>('/agency/commission/records', data)
}

/**
 * 佣金分类列表
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=246198f7-f090-4956-ab33-a5917e08f265
 */
export function ApiAgencyCommissionRecordsClass() {
  return httpClient.get<{
    /** 类型 */
    CashType: string
    /** 名称 */
    CashTypeName: string
  }[]>('/agency/commission/records/class')
}

/**
 * 佣金钱包提取
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=da617b1e-8b29-4ef3-9824-c9ee5c9f193e
 */
export function ApiAgencyTransferToMember() {
  return httpClient.post<string>('/agency/transfer/to/member')
}

/**
 * 所有投注、风云榜
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b0b306f1-c31f-4871-9a24-c4fa1487b817
 */
export function ApiMemberBetList(params: {
  /** 游戏code */
  game_code?: string
  /** 游戏类型 1=真人,2=捕鱼,3=电子,4=体育 */
  game_class?: string
  page?: number
  page_size?: number
  type: string
}) {
  return httpClient.get<IResponseList<{
    /** 注单流水号 */
    'bill_no': string
    /** 投注时间 */
    'bet_time': number
    /** 平台ID */
    'platform_id': string
    /** 平台名称 */
    'platform_name': string
    /** 投注人 */
    'username': string
    /** 游戏类型 */
    'game_class': string
    /** 游戏名称 */
    'game_name': string
    /** 游戏编码 */
    'game_code': string
    /** 投注金额 */
    'bet_amount': string
    /** 有效投注金额 */
    'valid_bet_amount': string
    /** 玩家输赢金额 */
    'net_amount': string
    /** 币种ID */
    'currency_id': CurrencyCode
  }[]>>('/member/bet/list', { params })
}

/**
 * 统计数据
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=7878bfa1-8e3c-4da6-8266-c0a22c07315f
 */
export function ApiMemberBetReport(data: {
  /** 聊天室可查其它人的统计数据，传会员名 */
  'username'?: string
  /** 游戏类型,空=全部 1=娱乐城 2=体育 */
  'game_class': '' | '1' | '2'
}) {
  return httpClient.post<{
    /** 货币id */
    'currency_id': CurrencyCode
    /** 有效投注 */
    'valid_bet_amount': string
    /** 输赢 */
    'net_amount': string
    /** 注单量 */
    'bet_count': number
    /**  */
    'time': number
    /** 列表详情  */
    detail: {
      /** 货币id */
      'currency_id': CurrencyCode
      /** 有效投注 */
      'valid_bet_amount': string
      /** 输赢 */
      'net_amount': string
      /** 注单量 */
      'bet_count': number
      /** 天数，1=今天 */
      'bet_time': string
    }[]
  }[]>('/member/bet/report', data)
}

/**
 * 佣金模式列表(下拉)
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=33325f51-5c7e-4213-9ae8-79115bfa5313
 */
export function ApiAgencyCommissionModelsList() {
  return httpClient.get<{
    /** id */
    id: string
    /** 名称 */
    name: string
  }[]>('/agency/commission/models/list')
}

/**
   * 获取二阶段验证密钥
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2532eddb-96cd-44b5-be7c-4ac43bf92656
   */
export function ApiMemberAuthSecret() {
  return httpClient.get<string>('/member/auth/secret')
}

/**
   * 设定二阶段验证
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=3e0a839f-fda1-475f-89ff-665013e728ee
   */
export function ApiMemberAuthSet(data: {
  /** 二阶段验证码 */
  'auth_code': string
  /** 登录密码 */
  'password': string
}) {
  return httpClient.post<{
    /** 登录令牌 */
    token: string
  }>('/member/auth/set', data)
}

/**
   * 获取安全验证配置
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=2f83ff71-7f04-4fa2-97d2-c0a00170a0a8
   */
export function ApiMemberAuthConfig() {
  return httpClient.get<{
    /** 二阶段密钥 */
    'auth_secret': string
    /** 是否已配置密钥 1:已配置 0:未配置 */
    'is_secret': string
    /** 是否已配置资金密码 1:已配置 0:未配置 */
    'is_pay_password': string
  }>('/member/auth/config')
}

/**
   * 关闭二阶段验证
   * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=38c20319-c66e-4228-a7b7-b82eeac21713
   */
export function ApiMemberAuthClose(data: {
  /** 密码 8-30 */
  'password': string
  /** 二阶段验证码 */
  'auth_code': string
}) {
  return httpClient.post<{
    /** 登录令牌 */
    token: string
  }>('/member/auth/close', data)
}

/**
 * VIP积分倍率 member/vip/multiple
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=6e6f1ec1-7f3f-43b2-b0cd-56a3322fd70e
 */
export function ApiMemberVipMultiple() {
  return httpClient.get<{
    /** 4: 体育 */
    'game_type': number
    'rate': string
    'updated_at': number
    'updated_uid': string
    'updated_name': string
  }[]>('/member/vip/multiple')
}

/*
* 获取利息宝配置
* @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=f79ae784-bcef-462d-af70-900bc09f1ae9
*/
export function ApiMemberInterestGetConfig() {
  return httpClient.get<{
    id: string
    currency_id: number
    currency_name: string
    min_deposit: string
    interest_rate: string
    translate: number
    content_text: string
  }[]>('/member/interest/get/config')
}

/**
 * 会员各币种间余额转换
 * @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=05d3cf72-7b2a-4bfd-b994-6365cc48c3c4
 */
export function ApiFinanceBalanceTransfer(data: {
  currency_in: CurrencyCode
  currency_out: CurrencyCode
  amount: string
}) {
  return httpClient.post('/finance/balance/transfer', data)
}

/*
* vip奖励领取
* @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=b913c96a-70ba-485c-b1f0-4b3ef8f89769
*/
export function ApiMemberVipBonusApply(data: {
  id: string
  cur: string
  amount: string
}) {
  return httpClient.post<string>('/member/vip/bonus/apply', data)
}

/*
* vip等级场馆返水配置
* @see https://console-docs.apipost.cn/preview/972a64ada7e847ea/c00b1160394a31fb?target_id=d7f53680-3e01-4a43-afc9-46aafb4d0a5b
*/
export function ApiMemberVipRebateConfig(params: {
  /** 游戏类型 1真人视讯 2捕鱼游戏 3老虎机 4体育 */
  game_type: string
  /** 币种id */
  cur: string
}) {
  return httpClient.get<{
    'vip': string
    'id': string
    'currency_id': CurrencyCode
    'en_name': string
    'game_type': string
    'zh_name': string
    'pt_name': string
    'vn_name': string
    'th_name': string
    'name': string
    'rate': string
  }[]>('/member/vip/rebate/config', { params })
}
