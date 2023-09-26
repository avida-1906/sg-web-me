import type { WatchSource } from 'vue'
import type { Options, Service } from 'vue-request'

// const { data, page, page_size } = usePage((page, page_size) => () => ApiMemberLogin({
//   username: 'admin',
//   password: '123456',
//   page: page.value,
//   page_size: page_size.value,
// }))

/**
 * @description usePage在useRequest上增加的新参数
 * @interface CustomOptions
 */
export interface CustomOptions {
  page?: number
  page_size?: number
  resetPageDeps?: WatchSource<any> | WatchSource<any>[]
}

/**
 * @description 在useRequest改进，管理分页请求
 *  1.暴露page,page_size,total,自动管理
 *  2.新增option配置resetPageDeps，设置要重置页码的属性值
 * @template R
 * @template P
 * @param {(page: Ref<number>, page_size: Ref<number>) => Service<R, P>} service
 * @param {(Options<R, P> & CustomOptions)} [options]
 */
export function usePage<R, P extends unknown[]>(service: (page: Ref<number>, page_size: Ref<number>) => Service<R, P>, options?: Options<R, P> & CustomOptions) {
  const page = ref(options?.page ?? 1)
  const page_size = ref(options?.page_size ?? 10)
  const total = ref(0)
  const resData = ref<any[]>([])
  const isPush = ref(false)

  const refreshDeps: WatchSource<any>[] = [
    page,
    page_size,
  ]

  if (options?.refreshDeps) {
    if (Array.isArray(options.refreshDeps))
      refreshDeps.push(...options.refreshDeps)
    else
      refreshDeps.push(options.refreshDeps)
  }

  if (options?.resetPageDeps) {
    watch(options.resetPageDeps, () => {
      if (page.value !== 1)
        page.value = 1
    }, {
      flush: 'post',
    })
  }

  const { run, ...rest } = useRequest(
    service(page, page_size), {
      ...options,
      refreshDeps, // 依赖变化时重新请求
      loadingDelay: 500, // 延迟 500ms 才设置 loading 为 true
      onSuccess(data) {
        if (page.value === 1)
          total.value = get(data, 't', 0)

        if (isPush.value) {
          resData.value.push(...get(data, 'd', []))
          isPush.value = false
        }
        else {
          resData.value = get(data, 'd', [])
        }
      },
      onAfter(params) {
        if (options?.onAfter)
          options.onAfter(params)
      },
    },
  )

  const next = () => {
    if (page.value * page_size.value < total.value)
      page.value++
  }

  const prev = () => {
    if (page.value > 1)
      page.value--
  }

  const push = () => {
    isPush.value = true
    next()
  }

  return {
    run,
    next,
    prev,
    push,
    ...rest,
    page,
    page_size,
    total,
    data: resData,
  }
}
