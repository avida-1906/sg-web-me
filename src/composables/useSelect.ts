/**
 * @file useSelect.ts
 * @desc 用于 选择框，tab等组件
 * @param {T[]} data 选项列表
 * @param {boolean} isSelectFirst 是否默认选中第一个
 */
export function useSelect<T extends ISelectOption>(data: T[], isSelectFirst = true) {
  /** 选项列表 */
  const list = ref(data)

  type ValueType = typeof data[0]['value']

  /** 选中的值 */
  const selected = ref<ValueType | undefined>(isSelectFirst ? data[0]?.value : undefined)

  return {
    list,
    selected,
  }
}
