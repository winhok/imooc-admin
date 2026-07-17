import {
  getUserInfo as getUserInfoApi,
  login,
  type LoginParams,
  type UserInfo
} from '@/api/sys'
import { TOKEN } from '@/constant'
import { removeTimeStamp, setTimeStamp } from '@/utils/auth'
import { getItem, removeItem, setItem } from '@/utils/storage'
import md5 from 'md5'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = shallowRef(getItem<string>(TOKEN) || '')
  const userInfo = shallowRef<UserInfo>({})
  const hasToken = computed(() => Boolean(token.value))
  const hasUserInfo = computed(() => Object.keys(userInfo.value).length > 0)

  function setToken(value: string) {
    token.value = value
    setItem(TOKEN, value)
    setTimeStamp()
  }

  function setUserInfo(value: UserInfo) {
    userInfo.value = value
  }

  function clearUserInfo() {
    userInfo.value = {}
  }

  function clearToken() {
    token.value = ''
    removeItem(TOKEN)
    removeTimeStamp()
  }

  function logout() {
    clearToken()
    clearUserInfo()
  }

  async function loginByPassword(loginParams: LoginParams) {
    const { username, password } = loginParams
    const data = await login({
      username,
      password: md5(password)
    })

    setToken(data.token)
  }

  async function getUserInfo() {
    const data = await getUserInfoApi()
    setUserInfo(data)
    return data
  }

  return {
    token,
    userInfo,
    hasToken,
    hasUserInfo,
    setToken,
    setUserInfo,
    clearUserInfo,
    clearToken,
    logout,
    login: loginByPassword,
    getUserInfo
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
