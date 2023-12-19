export function useTableSort() {
  const sortMap = ref({
    sort_key: '',
    sort_type: '',
  })

  /**
   * 这个函数用在BaseTable组件的sort事件中
   * @param obj
   */
  function setSortMap(obj: any) {
    sortMap.value.sort_key = obj.col.dataIndex
    sortMap.value.sort_type = obj.sortDirections
  }

  return {
    sortMap,
    setSortMap,
  }
}
