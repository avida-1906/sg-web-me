/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 默认语言
   */
  readonly VITE_I18N_DEFAULT_LANG: 'EN_US' | 'ZH_CN' | 'HI_IN' | 'PT_BR' | 'VI_VN'
  /**
   * 网络请求 URL
   */
  readonly VITE_HTTP_BASEURL: string
  /**
   * 网络请求超时时间
   */
  readonly VITE_HTTP_TIMEOUT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
