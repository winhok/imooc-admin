import { createRouter, createWebHashHistory } from 'vue-router'
import { HOME_PATH, LOGIN_PATH, NOT_FOUND_PATH } from '@/constant'

const privateRoutes = [
  {
    path: '/user',
    component: () => import('@/layout/index.vue'),
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index.vue'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index.vue'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        component: () => import('@/views/user-info/index.vue'),
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        component: () => import('@/views/import/index.vue'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  }
]

const publicRoutes = [
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
          icon: 'el-icon-user'
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
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: NOT_FOUND_PATH
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
