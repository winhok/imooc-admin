import { login, type LoginParams } from '@/api/sys'
import { TOKEN } from '@/constant'
import { getItem, removeItem, setItem } from '@/utils/storage'
import md5 from 'md5'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = shallowRef(getItem<string>(TOKEN) || '')
  const hasToken = computed(() => Boolean(token.value))

  function setToken(value: string) {
    token.value = value
    setItem(TOKEN, value)
  }

  function clearToken() {
    token.value = ''
    removeItem(TOKEN)
  }

  async function loginByPassword(userInfo: LoginParams) {
    const { username, password } = userInfo
    const data = await login({
      username,
      password: md5(password)
    })

    setToken(data.token)
  }

  return {
    token,
    hasToken,
    setToken,
    clearToken,
    login: loginByPassword
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
