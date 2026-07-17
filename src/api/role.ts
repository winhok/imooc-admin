import request from '@/utils/request'

export interface RoleItem {
  id: string
  title: string
  describe?: string
}

export interface DistributePermissionPayload {
  roleId: string
  permissions: Array<string | number>
}

export const getRoleList = () => {
  return request<RoleItem[]>({
    url: '/role/list'
  })
}

export const getRolePermission = (roleId: string) => {
  return request<Array<string | number>>({
    url: `/role/permission/${roleId}`
  })
}

export const distributePermission = (data: DistributePermissionPayload) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
