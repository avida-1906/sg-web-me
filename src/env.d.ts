/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 默认语言 */
  readonly VITE_I18N_DEFAULT_LANG: 'zh-CN' | 'pt-BR' | 'vi-VN'
  /** 网络请求 URL */
  readonly VITE_HTTP_BASEURL: string
  /** 网络请求超时时间 */
  readonly VITE_HTTP_TIMEOUT: number
  /** Socket 地址，使用','分隔多个连接地址，每个连接地址通过|分隔, 第一位是协议，第二位是ip或者域名，第三位是端口 */
  readonly VITE_SOCKET_URL_LIST_STRING: string
  /** Socket 用户名 */
  readonly VITE_SOCKET_USERNAME: string
  /** Socket密码 */
  readonly VITE_SOCKET_PASSWORD: string
  /** casino大厅游戏数量 */
  readonly VITE_CASINO_HOME_PAGE_SIZE: number
  /** casino子类型游戏数量 */
  readonly VITE_CASINO_GAME_PAGE_SIZE: number
  /** 金额Icon服务器地址 */
  readonly VITE_CURRENCY_ICON_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
