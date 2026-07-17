import type { RouteRecordRaw } from 'vue-router'

const userManageRouter: RouteRecordRaw = {
  path: '/user',
  name: 'userManage',
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
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index.vue'),
      props: true,
      meta: {
        title: 'userInfo',
        activeMenu: '/user/manage'
      }
    },
    {
      path: '/user/import',
      name: 'userImport',
      component: () => import('@/views/import/index.vue'),
      meta: {
        title: 'excelImport',
        activeMenu: '/user/manage'
      }
    }
  ]
}

export default userManageRouter
