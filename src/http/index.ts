import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getCurrentLanguage } from '~/modules/i18n'

const { VITE_HTTP_TIMEOUT, VITE_HTTP_BASEURL } = import.meta.env

interface IResponse<T> {
  status: boolean
  data: T
}
type IRequestInterceptors = (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>
type IResponseInterceptors = (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<Error>

class HttpClient {
  private instance = axios.create({
    baseURL: import.meta.env.PROD ? '' : '/api',
    timeout: VITE_HTTP_TIMEOUT,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })

  constructor() {
    this.setInterceptors()
  }

  /** 获取当前设备信息 */
  #getDevice() {
    const { isMobile } = storeToRefs(useWindowStore())
    if (isMobile.value)
      return 25

    else
      return 24
  }

  /** 获取传给后端的语言 */
  #getLanguage() {
    const languageMap: any = {
      'zh-CN': 'zh_CN',
    }
    return languageMap[getCurrentLanguage()] || 'zh_CN'
  }

  /**
   * 请求拦截函数列表，按照顺序执行
   *
   * 一般用于处理请求参数
   *
   * 例如：设置token
   */
  private requestInterceptorsList: IRequestInterceptors[] = [
    // 设置token
    (config) => {
      const token = Local.get(STORAGE_TOKEN_KEY)
      if (token)
        config.headers.t = token

      return config
    },
    // 设置全局header
    (config) => {
      config.headers.d = this.#getDevice()
      config.headers.lang = this.#getLanguage()
      return config
    },
    // 使用qs序列化参数
    // (config) => {
    //   if (config.method === 'post')
    //     config.data = qs.stringify(config.data)

    //   return config
    // },
  ]

  /**
   * 响应拦截函数列表，按照顺序执行
   *
   * 一般用于处理响应数据
   *
   * 例如：统一处理错误码
   */
  private responseInterceptorsList: IResponseInterceptors[] = [
    // 打印一些响应信息
    (response) => {
      console.groupCollapsed(`%c 请求信息 ${response.config.url}`, 'color: #409EFF')
      console.log('baseUrl：', VITE_HTTP_BASEURL)
      console.log('请求地址：', response.config.url)
      console.log('请求方法：', response.config.method)
      if (response.config.method === 'get')
        console.log('请求参数：', response.config.params)
      else
        console.log('请求参数：', response.config.data)

      console.log('接口响应数据：', response.data)
      console.groupEnd()
      return response
    },
    // 处理后端status为false的情况
    (response) => {
      const { status, data } = response.data as IResponse<any>
      if (!status) {
        if (!Number.isNaN(Number(data)) && data !== '')
          console.log('data是数字，可以Toast')

        // Toast

        // 直接抛出错误，不再执行后续操作
        return Promise.reject(new Error(`发生错误：status: ${status}`))
      }
      return response
    },
    // 处理后端status为true的情况，只将data返回
    (response) => {
      const { status, data } = response.data as IResponse<any>
      if (status)
        response.data = data

      return response
    },
  ]

  private setInterceptors() {
    /**
     * 请求拦截器(不要修改)
     *
     * 如果需要添加处理，在 this.requestInterceptorsList 中添加
     */
    this.instance.interceptors.request.use(
      (config) => {
        for (const interceptor of this.requestInterceptorsList)
          interceptor(config)

        return config
      },
      (error) => {
        // 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          console.error('请求超时')
          return
        }

        return Promise.reject(error)
      })

    /**
     * 响应拦截器 (不要修改)
     *
     * 如果需要添加处理，在 this.responseInterceptorsList 中添加
     */
    this.instance.interceptors.response.use(
      async (response) => {
        for (const interceptor of this.responseInterceptorsList) {
          const interceptorResult = await interceptor(response)
          if (interceptorResult instanceof Error)
            return Promise.reject(interceptorResult)
        }
        return response.data
      }, (error) => {
        const errorMessage = {
          ...error,
        }
        // 判断响应超时
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          errorMessage.message = '响应超时'
          return Promise.reject(errorMessage)
        }
        if (error.response) {
          const status = error.response.status
          switch (status) {
            case 404:
              // 请求地址错误
              errorMessage.message = `${status}: 没有找到${error.config.url}地址`
              break
            case 405:
              // 请求方法错误
              errorMessage.message = `${status}: 当前是${error.config.method}方法， 应该是${error.response.headers.allow}方法`
              break
            case 502:
            case 504:
            case 500:
              // 服务器错误
              errorMessage.message = `${status}: 服务器错误`
              break
            default:
              break
          }
        }

        return Promise.reject(errorMessage)
      })
  }

  get<T>(url: string, params?: any): Promise<T> {
    return this.instance.get(url, { params })
  }

  post<T>(url: string, data?: any): Promise<T> {
    return this.instance.post(url, data)
  }
}

export const httpClient = new HttpClient()
