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
    parent_id?: string// 上级id，没有留空
    device_number: string
  },
) {
  return httpClient.post<{
    data: string
  }>('/member/reg', data)
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
