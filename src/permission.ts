import router from './router'
import { useUserStore } from './store'
import { HOME_PATH, LOGIN_PATH } from './constant'

// 白名单：无需登录即可访问的路由
const whiteList = [LOGIN_PATH]

/**
 * 路由前置守卫
 */
router.beforeEach((to) => {
  const userStore = useUserStore()

  // 已登录：访问登录页时重定向到首页，其余正常放行
  if (userStore.hasToken) {
    return to.path === LOGIN_PATH ? HOME_PATH : true
  }

  // 未登录：白名单内放行，否则跳转登录页
  return whiteList.includes(to.path) ? true : LOGIN_PATH
})
