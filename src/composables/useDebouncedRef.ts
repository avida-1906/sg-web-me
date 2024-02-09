import { customRef } from 'vue'

export function useDebouncedRef({
  value,
  delay = 500,
  beforeTrigger = () => {},
  afterTrigger = () => {},
}: {
  value: any
  delay: number
  beforeTrigger?: (value: any) => void
  afterTrigger?: (value: any) => void
}) {
  let timeout: any
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        beforeTrigger(value)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
          afterTrigger(value)
        }, delay)
      },
    }
  })
}
