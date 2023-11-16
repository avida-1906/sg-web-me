import type {
  BankCard,
  CasinoLobbyGameItem,
  ExchangeRateData,
  IMemberBalanceLockerUpdate,
  IMemberDetail,
  IMemberReg,
  INotNotice,
  IResponseList,
  IUserInfo,
  ProviderItem,
  TCurrencyObject,
  VirtualCoin,
} from './types'
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
    is_hot: string
    sorting: number
    created_at: number
    is_new: string
    tag_id: string
    currency: string
    lang: string
    is_fav: string
  }>(`/member/game/detail?id=${id}`)
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
    games: CasinoLobbyGameItem[] | null
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
  return httpClient.get<IResponseList<VirtualCoin>>('/member/wallet/list', { params })
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
    id: string
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
  is_default?: number
  pay_password: string
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
  return httpClient.post<string>('/member/update', data)
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
}) {
  return httpClient.post<string>(`/member/chat/send?lang=${data.lang}`, { c: data.c, s: data.s })
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
export function ApiFinanceThirdDeposit(data: {
  amount: string
  /** 支付方式id */
  mid: string
  /** 支付平台id */
  cid: string
  /** 银行编码 */
  bank_code: string
  currency_name: string
  currency_id: string
}) {
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
export function ApiMemberNoticeAllList(params: {
  /** 1-公告  2-跑马灯 */
  types: string
}) {
  return httpClient.get<{
    notice: {
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
  }>('/member/notice/all/list', { params })
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
  return httpClient.get<ExchangeRateData>('/member/exchange/rate/list')
}

/**
 * 保险库余额查询
 * @see null
 */
export function ApiMemberBalanceLocker() {
  return httpClient.get<TCurrencyObject>('/member/balance/locker')
}
