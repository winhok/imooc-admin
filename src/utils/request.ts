import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { LOGIN_PATH, TOKEN } from '@/constant'
import { getItem } from '@/utils/storage'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器：注入 token
service.interceptors.request.use(
  (config) => {
    const token = getItem<string>(TOKEN)?.trim()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器：解包后端统一结构 { success, message, data }
service.interceptors.response.use(
  (response) => {
    const payload = response.data
    // 非标准响应（空响应、二进制流等）直接透传
    if (!payload || typeof payload !== 'object' || !('success' in payload)) {
      return payload
    }
    if (payload.success) {
      return payload.data
    }
    const message = payload.message || '服务异常'
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  (error) => {
    // 401：登录态失效，清除 token 并跳转登录页
    if (error.response?.status === 401) {
      // 动态引入 store，避免 request <-> store 的循环依赖
      import('@/store').then(({ useUserStore }) => {
        useUserStore().clearToken()
        router.push(LOGIN_PATH)
      })
    }
    // 优先展示后端返回的错误信息
    const message = error.response?.data?.message || error.message || '服务异常'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/**
 * 统一请求方法。响应拦截器已将后端响应解包为业务数据，
 * 因此这里做一次显式断言，把解包后的类型对外暴露为 Promise<T>。
 */
const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  return service(config) as unknown as Promise<T>
}

export default request
