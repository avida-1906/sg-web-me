import type { Options, Service } from 'vue-request'

export interface IResponseList<T> {
  d: T
  t: number
  s: number
}

export interface IPagination {
  page: number
  page_size: number
}

type GetProperty<T, K extends keyof T> = T[K]

export function useList<R extends IResponseList<unknown>, P extends unknown[]>(
  service: Service<R, P>,
  options?: Options<R, P>,
  defaultPagination?: Partial<IPagination>,
) {
  const { bool: isLoadMore, setTrue: setLoadMoreTrue, setFalse: setLoadMoreFalse } = useBoolean(false)
  const total = ref(0)
  const page = ref(defaultPagination?.page || 1)
  const page_size = ref(defaultPagination?.page_size || 21)
  const list = shallowRef<GetProperty<R, 'd'>>([])

  const {
    run: _run,
    runAsync: _runAsync,
    refresh: _refresh,
    params,
    ...rest
  } = useRequest<R, P>(service, {
    ...options,
    onSuccess(response: any) {
      if (page.value === 1)
        total.value = get(response, 't', 0)

      if (isLoadMore.value) {
        list.value = concat(list.value, response.d || [])
        setLoadMoreFalse()
      }
      else {
        list.value = response.d || []
      }
    },
  })

  const getParams = (...params: P) => {
    const _p0 = params[0] as any

    const _p = [{
      ..._p0,
      page: page.value,
      page_size: page_size.value,
    }] as P
    return _p
  }

  const run = (...params: P) => {
    _run(...getParams(...params))
  }

  const runAsync = async (...params: P) => {
    await _runAsync(...getParams(...params))
  }

  const next = () => {
    if (page.value * page_size.value < total.value)
      page.value++
  }

  const prev = () => {
    if (page.value > 1)
      page.value--
  }

  const loadMore = () => {
    setLoadMoreTrue()
    page.value++
  }

  /** 是否还有更多数据 */
  const hasMore = computed(() => {
    return page.value * page_size.value < total.value
  })

  if (options?.refreshDeps) {
    watch(options.refreshDeps, () => {
      _refresh()
    }, {
      flush: 'post',
    })
  }

  watch([page, page_size], () => {
    if (params.value && Array.isArray(params.value))
      _run(...getParams(...params.value))
  })

  return {
    ...rest,
    hasMore,
    total,
    list,
    page,
    page_size,
    params,
    run,
    runAsync,
    next,
    prev,
    loadMore,
  }
}
