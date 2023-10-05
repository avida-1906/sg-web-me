import type { Options } from 'vue-request'

type type = '002' | '003'

/**
 *
 * @param type
 * '002' : 中国银行列表
 * '003' : 越南银行列表
 * @returns
 */
export function useApiMemberTreeList(
  type: type,
  options?: Options,
) {
  const { data, loading, error } = useRequest(() => ApiMemberTreeList({ level: type }), {
    manual: false,
    ...options,
  })

  return {
    data,
    loading,
    error,
  }
}
