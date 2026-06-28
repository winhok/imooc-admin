import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { LOGIN_PATH, TOKEN } from '@/constant'
import { getItem } from '@/utils/storage'
import router from '@/router'
import { isCheckTimeout } from '@/utils/auth'

const DEFAULT_ICODE = 'helloqianduanxunlianying'

interface RequestError {
  response?: {
    status?: number
    data?: {
      code?: number | string
      message?: string
    }
  }
  message?: string
  handled?: boolean
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

let isLoggingOut = false

async function logoutAndRedirectToLogin() {
  if (isLoggingOut) return
  isLoggingOut = true
  try {
    const { useUserStore } = await import('@/store')
    useUserStore().logout()
    await router.push({
      path: LOGIN_PATH,
      query: { redirect: router.currentRoute.value.fullPath }
    })
  } finally {
    isLoggingOut = false
  }
}

function isUnauthorizedCode(code: unknown) {
  if (code === 401 || code === '401') return true
  return typeof code === 'string' && code.startsWith('401')
}

function isTokenExpiredError(error: RequestError) {
  return (
    error.response?.status === 401 ||
    isUnauthorizedCode(error.response?.data?.code)
  )
}

service.interceptors.request.use(
  async (config) => {
    config.headers.set('icode', DEFAULT_ICODE)

    const token = getItem<string>(TOKEN)?.trim()
    if (token) {
      if (isCheckTimeout()) {
        await logoutAndRedirectToLogin()
        return Promise.reject(
          Object.assign(new Error('token 失效'), {
            handled: true
          })
        )
      }
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const payload = response.data

    if (!payload || typeof payload !== 'object' || !('success' in payload)) {
      return payload
    }
    if (!payload.success && isUnauthorizedCode(payload.code)) {
      void logoutAndRedirectToLogin()
      return Promise.reject(new Error(payload.message || '登录态已失效'))
    }
    if (payload.success) {
      return payload.data
    }
    const message = payload.message || '服务异常'
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  (error: RequestError) => {
    if (error.handled) {
      return Promise.reject(error)
    }
    if (isTokenExpiredError(error)) {
      void logoutAndRedirectToLogin()
    }
    const message = error.response?.data?.message || error.message || '服务异常'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  return service(config) as unknown as Promise<T>
}

export default request
