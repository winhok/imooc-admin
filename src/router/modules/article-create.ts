import type { RouteRecordRaw } from 'vue-router'

const articleCreateRouter: RouteRecordRaw = {
  path: '/article',
  name: 'articleCreate',
  component: () => import('@/layout/index.vue'),
  redirect: '/article/create',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      component: () => import('@/views/article-create/index.vue'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      name: 'articleEditor',
      component: () => import('@/views/article-create/index.vue'),
      meta: {
        title: 'articleEditor',
        activeMenu: '/article/create'
      }
    }
  ]
}

export default articleCreateRouter
