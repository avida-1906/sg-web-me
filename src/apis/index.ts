import { httpClient } from '~/http'

/**
 * 用户登录
 */
export function ApiMemberLogin(
  params: {
    username: string
    password: string
    page?: number
    page_size?: number
  },
) {
  return httpClient.post<{
    token: string
    username: string
    avatar: string
  }>('/api/v1/home/ip', params)
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
