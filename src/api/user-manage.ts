import request from '@/utils/request'

export interface UserRole {
  id?: number | string
  title: string
}

export interface UserManageItem {
  _id: string
  username?: string
  mobile?: string
  avatar?: string
  role?: UserRole[]
  openTime?: Date | number | string
}

export interface UserExperience {
  startTime?: Date | number | string
  endTime?: Date | number | string
  title?: string
  desc?: string
}

export interface UserDetail extends UserManageItem {
  gender?: string
  nationality?: string
  province?: string
  remark?: string[]
  address?: string
  experience?: UserExperience[]
  major?: string
  glory?: string
}

export interface UserManageListParams {
  page: number
  size: number
}

export interface UserManageListResponse {
  list: UserManageItem[]
  total: number
}

export interface ImportedUserPayload {
  username?: unknown
  mobile?: unknown
  role?: unknown
  openTime?: unknown
}

export const getUserManageList = (params: UserManageListParams) => {
  return request<UserManageListResponse>({
    url: '/user-manage/list',
    params
  })
}

export const getUserManageAllList = () => {
  return request<UserManageListResponse>({
    url: '/user-manage/all-list'
  })
}

export const userBatchImport = (data: ImportedUserPayload[]) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

export const deleteUser = (id: string) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

export const userDetail = (id: string) => {
  return request<UserDetail>({
    url: `/user-manage/detail/${id}`
  })
}
