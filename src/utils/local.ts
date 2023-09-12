import type { ILocalStorageValue } from './index.utils'

/**
 * @description: 本地存储token的key
 */
export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const LOCAL_STORAGE_LANGUAGE_KEY = 'language'

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
