/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 默认语言
   */
  readonly VITE_I18N_DEFAULT_LANG: 'EN_US' | 'ZH_CN' | 'HI_IN' | 'PT_BR' | 'VI_VN'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}