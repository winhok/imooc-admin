import request from '@/utils/request'

export interface ArticleItem {
  _id: string
  ranking: number
  title: string
  author: string
  publicDate: Date | number | string
  desc: string
}

export interface ArticleDetail extends ArticleItem {
  content: string
}

export interface ArticleListParams {
  page: number
  size: number
}

export interface ArticleListResponse {
  list: ArticleItem[]
  total: number
}

export interface ArticleSortPayload {
  initRanking: number
  finalRanking: number
}

export interface ArticleCreatePayload {
  title: string
  content: string
}

export interface ArticleEditPayload extends ArticleCreatePayload {
  id: string
}

export const getArticleList = (params: ArticleListParams) => {
  return request<ArticleListResponse>({
    url: '/article/list',
    params
  })
}

export const articleSort = (data: ArticleSortPayload) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

export const deleteArticle = (articleId: string) => {
  return request({
    url: `/article/delete/${articleId}`
  })
}

export const getArticleDetail = (articleId: string) => {
  return request<ArticleDetail>({
    url: `/article/${articleId}`
  })
}

export const createArticle = (data: ArticleCreatePayload) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

export const editArticle = (data: ArticleEditPayload) => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
