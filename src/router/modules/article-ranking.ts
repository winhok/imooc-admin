import type { RouteRecordRaw } from 'vue-router'

const articleRankingRouter: RouteRecordRaw = {
  path: '/article',
  name: 'articleRanking',
  component: () => import('@/layout/index.vue'),
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/article-ranking/index.vue'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      component: () => import('@/views/article-detail/index.vue'),
      props: true,
      meta: {
        title: 'articleDetail',
        activeMenu: '/article/ranking'
      }
    }
  ]
}

export default articleRankingRouter
