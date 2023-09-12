import type { ILocalStorageValue } from './index.utils'

/**
 * @description: 本地存储token的key
 */
export const LOCAL_STORAGE_TOKEN_KEY = 'token'

export class Local {
  static set(key: string, value: any) {
    if (!key.trim())
      return
    const _value: ILocalStorageValue = {
      value,
    }

    localStorage.setItem(key, JSON.stringify(_value))
  }

  static get(key: string): ILocalStorageValue | null {
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
