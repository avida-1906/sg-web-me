import type { Options } from 'vue-request'

type type = '002' | '003'

/**
 *
 * @param type
 * '002' : 中国银行列表
 * '003' : 越南银行列表
 * @returns
 */
export function useApiMemberTreeList<R extends Array<unknown>, P extends unknown[]>(
  type: type,
  options?: Options<R, P>,
) {
  const { data, loading, error } = useRequest<R, P>(() => ApiMemberTreeList({ level: type }), {
    manual: false,
    ...options,
  })

  return {
    data,
    loading,
    error,
  }
}
