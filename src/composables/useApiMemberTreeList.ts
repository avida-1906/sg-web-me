type type = '002' | '003'

/**
 *
 * @param type
 * '002' : 中国银行列表
 * '003' : 越南银行列表
 * @returns ITreeList[]
 */
export function useApiMemberTreeList(type: type) {
  const { data: list, loading } = useRequest(() => ApiMemberTreeList({ level: type }), { manual: false })
  console.log('list1', list)
  return {
    list,
    loading,
  }
}
