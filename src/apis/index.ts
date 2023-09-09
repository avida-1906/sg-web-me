import { httpClient } from '~/http'

/**
 * 用户登录
 */
export function ApiMemberLogin(
  params: {
    username: string
    password: string
  },
) {
  return httpClient.post<{
    token: string
    username: string
    avatar: string
  }>('/api/v1/home/ip', params)
}
