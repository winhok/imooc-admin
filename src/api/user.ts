import request from '@/utils/request'

export interface FeatureItem {
  id: number
  title: string
  content: string
  percentage: number
}

export interface ChapterItem {
  id: number
  content: string
  timestamp: string
}

export const feature = () => {
  return request<FeatureItem[]>({
    url: '/user/feature'
  })
}

export const chapter = () => {
  return request<ChapterItem[]>({
    url: '/user/chapter'
  })
}
