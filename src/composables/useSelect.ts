/**
 * @file useSelect.ts
 * @desc 用于 选择框，tab等组件
 */
export function useSelect<T extends ISelectOption>(data: T[]) {
  /** 选项列表 */
  const list = ref(data)

  type ValueType = typeof data[0]['value']

  /** 选中的值 */
  const selected = ref<ValueType>(data[0].value)

  return {
    list,
    selected,
  }
}
