import router, { isKnownPrivatePath } from './router'
import { pinia, usePermissionStore, useUserStore } from '@/stores'
import {
  HOME_PATH,
  LOGIN_PATH,
  NO_PERMISSION_PATH,
  NOT_FOUND_PATH
} from './constant'

const whiteList = [LOGIN_PATH, NOT_FOUND_PATH, NO_PERMISSION_PATH]

router.beforeEach(async (to) => {
  const userStore = useUserStore(pinia)
  const permissionStore = usePermissionStore(pinia)

  if (userStore.hasToken) {
    if (to.path === LOGIN_PATH) {
      return HOME_PATH
    }

    if (!userStore.hasUserInfo) {
      try {
        const userInfo = await userStore.getUserInfo()
        const permissionRoutes = permissionStore.filterRoutes(
          userInfo.permission?.menus ?? []
        )
        permissionRoutes.forEach((route) => router.addRoute(route))
        return to.fullPath
      } catch {
        userStore.logout()
        return { path: LOGIN_PATH, query: { redirect: to.fullPath } }
      }
    }

    if (to.name === 'dynamicNotFound' && isKnownPrivatePath(to.path)) {
      return NO_PERMISSION_PATH
    }

    return true
  }

  if (whiteList.includes(to.path)) {
    return true
  }
  return { path: LOGIN_PATH, query: { redirect: to.fullPath } }
})
