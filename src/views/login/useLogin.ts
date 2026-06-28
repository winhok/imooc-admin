import type { LoginParams } from '@/api/sys'
import { HOME_PATH } from '@/constant'
import { useUserStore } from '@/store'
import { reactive, readonly, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
