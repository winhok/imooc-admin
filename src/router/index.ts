import { createRouter, createWebHashHistory } from 'vue-router'
import { HOME_PATH, LOGIN_PATH } from '@/constant'

const publicRoutes = [
  {
    path: LOGIN_PATH,
    component: () => import('@/views/login/index.vue')
  },
  {
    path: HOME_PATH,
    component: () => import('@/layout/index.vue')
  },
  // 兜底：未匹配到的路径重定向到首页
  {
    path: '/:pathMatch(.*)*',
    redirect: HOME_PATH
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
