export interface IStorageValue<T = any> {
  value: T
}

/**
 * @description: 本地存储的key
 */
export const STORAGE_TOKEN_KEY = 'token'
export const STORAGE_REG_PARAMS_KEYWORDS = 'reg_params'
export const STORAGE_SEARCH_KEYWORDS_LIVE = 'search_keywords_live'
export const STORAGE_SEARCH_KEYWORDS_SPORTS = 'search_keywords_sports'
export const STORAGE_MENU_EXPAND_DOMID = 'menu_expand_domid'
export const STORAGE_RIGHT_SIDEBAR_CONTENT = 'right_sidebar_content'
export const STORAGE_SPORTS_PANEL_TYPE_KEY = 'sports_panel_type'
export const STORAGE_SPORTS_ODDS_TYPE_KEY = 'sports_odds_type'
export const STORAGE_CURRENT_GLOBAL_CURRENCY_KEY = 'current_global_currency'
export const STORAGE_HIDE_ZERO_BALANCE_KEY = 'hide_zero_balance'
export const STORAGE_SPORTS_CURRENT_PROVIDER = 'sports_current_provider'
export const STORAGE_SPORTS_BET_ORDER = 'sports_bet_order'
export const STORAGE_SPORTS_LIVE_NAV = 'storage_sports_live_nav'
export const STORAGE_MENU_LEFT_EXPAND = 'storage_menu_left_expand'
export const STORAGE_MENU_ACTIVE_ITEM = 'storage_menu_active_item'
export const STORAGE_CLEAR_LIVE = 'storage_clear_live'
export const STORAGE_CLEAR_SPORTS = 'storage_clear_sports'
export const STORAGE_CASINO_GAME_CURRENCY = 'storage_casino_game_currency'
export const STORAGE_THIRDREG_PARAMS_KEYWORDS = 'storage_thirdreg_params_keywords'
export const STORAGE_NO_MORE_TIP_DAY = 'storage_no_more_tip_day'

export class Local {
  static set<T>(key: string, value: any) {
    if (!key.trim())
      return
    const _value: IStorageValue<T> = {
      value,
    }

    if (_value.value === null || _value.value === undefined)
      return

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
