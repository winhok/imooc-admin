import type { RouteRecordRaw } from 'vue-router'

const permissionListRouter: RouteRecordRaw = {
  path: '/user',
  name: 'permissionList',
  component: () => import('@/layout/index.vue'),
  redirect: '/user/permission',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      component: () => import('@/views/permission-list/index.vue'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}

export default permissionListRouter
