export interface IStorageValue<T = any> {
  value: T
}

/**
 * @description: 本地存储的key
 */
export const STORAGE_TOKEN_KEY = 'token'
export const STORAGE_LANGUAGE_KEY = 'language'
export const STORAGE_REG_PARAMS_KEYWORDS = 'reg_params'
export const STORAGE_SEARCH_KEYWORDS_LIVE = 'search_keywords_live'
export const STORAGE_SEARCH_KEYWORDS_SPORTS = 'search_keywords_sports'
export const STORAGE_MENU_EXPAND_DOMID = 'menu_expand_domid'
export const STORAGE_RIGHT_SIDEBAR_CONTENT = 'right_sidebar_content'
export const STORAGE_SPORTS_PANEL_TYPE_KEY = 'sports_panel_type'
export const STORAGE_SPORTS_ODDS_TYPE_KEY = 'sports_odds_type'
export const STORAGE_CURRENT_GLOBAL_CURRENCY_KEY = 'current_global_currency'

export class Local {
  static set<T>(key: string, value: any) {
    if (!key.trim())
      return
    const _value: IStorageValue<T> = {
      value,
    }

    localStorage.setItem(key, JSON.stringify(_value))
  }

  static get<T>(key: string): IStorageValue<T> | null {
    if (!key.trim())
      return null

    const value = localStorage.getItem(key)

    if (value) {
      try {
        return JSON.parse(value)
      }
      catch (error) {
        return null
      }
    }

    return null
  }

  static remove(key: string) {
    if (!key.trim())
      return

    localStorage.removeItem(key)
  }

  static clear(key?: string[]) {
    if (key) {
      for (const item of key)
        this.remove(item)
    }
    else {
      localStorage.clear()
    }
  }
}

export class Session {
  static set<T>(key: string, value: any) {
    if (!key.trim())
      return

    const _value: IStorageValue<T> = {
      value,
    }

    sessionStorage.setItem(key, JSON.stringify(_value))
  }

  static get<T>(key: string): IStorageValue<T> | null {
    if (!key.trim())
      return null

    const value = sessionStorage.getItem(key)

    if (value) {
      try {
        return JSON.parse(value)
      }
      catch (error) {
        return null
      }
    }

    return null
  }

  static remove(key: string) {
    if (!key.trim())
      return

    sessionStorage.removeItem(key)
  }

  static clear(key?: string[]) {
    if (key) {
      for (const item of key)
        this.remove(item)
    }
    else {
      sessionStorage.clear()
    }
  }
}
