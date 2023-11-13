export type EnumLanguageKey = keyof typeof EnumLanguage

export interface Room {
  icon: string
  label: string
  value: EnumLanguageKey
}

export interface IBreadCrumbItem {
  /** 面包屑点击跳转的地址 */
  path: string
  /** 面包屑显示的名称 */
  title: string
}
