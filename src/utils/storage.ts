import type { ILocalStorageValue } from './index.utils'

/**
 * @description: 本地存储的key
 */
export const STORAGE_TOKEN_KEY = 'token'
export const STORAGE_LANGUAGE_KEY = 'language'
export const STORAGE_REG_PARAMS_KEYWORDS = 'reg_params'
export const STORAGE_SEARCH_KEYWORDS_LIVE = 'search_keywords_live'
export const STORAGE_SEARCH_KEYWORDS_SPORTS = 'search_keywords_sports'

export class Local {
  static set<T>(key: string, value: any) {
    if (!key.trim())
      return
    const _value: ILocalStorageValue<T> = {
      value,
    }

    localStorage.setItem(key, JSON.stringify(_value))
  }

  static get<T>(key: string): ILocalStorageValue<T> | null {
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

    const _value: ILocalStorageValue<T> = {
      value,
    }

    sessionStorage.setItem(key, JSON.stringify(_value))
  }

  static get<T>(key: string): ILocalStorageValue<T> | null {
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
