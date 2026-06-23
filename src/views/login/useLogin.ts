import type { LoginParams } from '@/api/sys'
import { HOME_PATH } from '@/constant'
import { useUserStore } from '@/store'
import { reactive, readonly, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * 登录业务逻辑：表单数据、加载态、登录请求与登录后跳转。
 * 不依赖具体表单组件，便于在视图层之外复用与测试。
 */
export function useLogin() {
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()

  const loginForm = reactive<LoginParams>({
    username: 'super-admin',
    password: '123456'
  })
  const loading = shallowRef(false)

  async function login() {
    loading.value = true
    try {
      await userStore.login(loginForm)
      const { redirect } = route.query
      await router.push(typeof redirect === 'string' ? redirect : HOME_PATH)
    } finally {
      loading.value = false
    }
  }

  return {
    loginForm,
    loading: readonly(loading),
    login
  }
}
