import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router'
import { HOME_PATH, LOGIN_PATH, NOT_FOUND_PATH } from '@/constant'
import articleCreateRouter from './modules/article-create'
import articleRankingRouter from './modules/article-ranking'
import permissionListRouter from './modules/permission-list'
import roleListRouter from './modules/role-list'
import userManageRouter from './modules/user-manage'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    activeMenu?: string
  }
}

export const asyncRoutes: RouteRecordRaw[] = [
  roleListRouter,
  userManageRouter,
  permissionListRouter,
  articleCreateRouter,
  articleRankingRouter
]

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: LOGIN_PATH,
    component: () => import('@/views/login/index.vue')
  },
  {
    path: HOME_PATH,
    component: () => import('@/layout/index.vue'),
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: () => import('@/views/chart/index.vue'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

export const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'dynamicNotFound',
  redirect: NOT_FOUND_PATH
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export function resetRouter() {
  for (const route of [...asyncRoutes, notFoundRoute]) {
    if (route.name && router.hasRoute(route.name)) {
      router.removeRoute(route.name)
    }
  }
}

export default router
