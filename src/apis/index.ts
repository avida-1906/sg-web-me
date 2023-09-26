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
 */
export function ApiMemberGameList(params: {
  page: number
  page_size: number
  game_type?: 1 | 3// 游戏类型:1=真人,3=电子
  is_hot?: 1 | 2 // 是否热门 1是 2否
  is_new?: 1 | 2 // 是否新游戏 1是 2否
  tag_id?: number // 游戏标签
  platform_id?: string // 场馆id（evo真人）（需要转成字符串）
}) {
  return httpClient.get< {
    d: {
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
    }[] | null
    t: number
    s: number
  }>('/member/game/list', params)
}

/**
 * 游戏详情
 */
export function ApiMemberGameDetail(pid: string, game_id: string) {
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
  }>(`/member/game/detail?platform_id=${pid}&game_id=${game_id}`)
}

/**
 * 修改收藏
 * id: string 游戏id
 * val: string 是否收藏 1是 2否
*/
export function ApiMemberGameUpdateFav(params: {
  id: string
  val: string
}) {
  return httpClient.get('/member/game/update/fav', params)
}

/**
 * 启动游戏
 */
export function ApiGameLunch(pid: string, game_id: string, cur: string) {
  return httpClient.get<string>(`/game/launch/${pid}`, { code: game_id, cur })
}

/**
 * 搜索游戏
 */
export function ApiMemberGameSearch(params: { w: string }) {
  return httpClient.get<{
    d: {
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
    }[]
    t: number
    s: number
  }>('/member/game/search', params)
}

/*
* 游戏收藏列表
*/
export function ApiMemberGameFavList(params: { page: number; page_size: number }) {
  return httpClient.get('/member/game/fav/list', params)
}

/*
* 推荐游戏列表
*/
export function ApiMemberGameRecList(params: { page: number; page_size: number }) {
  return httpClient.get('/member/game/rec/list', params)
}
