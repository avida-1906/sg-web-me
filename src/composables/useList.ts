import type { Options, Service } from 'vue-request'

export interface IResponseList<T> {
  d: T
  t: number
  s: number
}

export interface IOther {
  page: number
  page_size: number
  isWatchPageOrPageSize?: boolean
}

type GetProperty<T, K extends keyof T> = T[K]
const { VITE_CASINO_HOME_PAGE_SIZE } = getEnv()

export function useList<R extends IResponseList<unknown>, P extends unknown[]>(
  service: Service<R, P>,
  options?: Options<R, P>,
  defaultOther?: Partial<IOther>,
) {
  const { bool: isLoadMore, setTrue: setLoadMoreTrue, setFalse: setLoadMoreFalse } = useBoolean(false)
  const total = ref(0)
  const page = ref(defaultOther?.page || 1)
  const page_size = ref(defaultOther?.page_size || +VITE_CASINO_HOME_PAGE_SIZE)
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
      if (options?.onSuccess)
        options.onSuccess(response, params.value)

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

  const resetPage = () => page.value = 1

  if (options?.refreshDeps) {
    watch(options.refreshDeps, () => {
      _refresh()
    }, {
      flush: 'post',
    })
  }

  if (
    defaultOther?.isWatchPageOrPageSize === void 0
    || defaultOther?.isWatchPageOrPageSize === true
  ) {
    watch([page, page_size], () => {
      if (params.value && Array.isArray(params.value) && page_size.value)
        _run(...getParams(...params.value))
    })
  }

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
    resetPage,
  }
}
