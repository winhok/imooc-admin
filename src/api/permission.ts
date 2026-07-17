import request from '@/utils/request'

export interface PermissionItem {
  id: string | number
  permissionName: string
  permissionMark: string
  permissionDesc?: string
  children?: PermissionItem[]
}

export const getPermissionList = () => {
  return request<PermissionItem[]>({
    url: '/permission/list'
  })
}
