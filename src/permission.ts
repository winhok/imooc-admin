import router from './router'
import { useUserStore } from './store'
import {
  HOME_PATH,
  LOGIN_PATH,
  NO_PERMISSION_PATH,
  NOT_FOUND_PATH
} from './constant'

const whiteList = [LOGIN_PATH, NOT_FOUND_PATH, NO_PERMISSION_PATH]

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  if (userStore.hasToken) {
    if (to.path === LOGIN_PATH) {
      return HOME_PATH
    }

    if (!userStore.hasUserInfo) {
      try {
        await userStore.getUserInfo()
      } catch {
        userStore.logout()
        return { path: LOGIN_PATH, query: { redirect: to.fullPath } }
      }
    }

    return true
  }

  if (whiteList.includes(to.path)) {
    return true
  }
  return { path: LOGIN_PATH, query: { redirect: to.fullPath } }
})
