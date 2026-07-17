import type { RouteRecordRaw } from 'vue-router'

const roleListRouter: RouteRecordRaw = {
  path: '/user',
  name: 'roleList',
  component: () => import('@/layout/index.vue'),
  redirect: '/user/role',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/role-list/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}

export default roleListRouter
