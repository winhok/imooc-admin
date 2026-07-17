import type { UserManageItem } from '@/api/user-manage'
import { dateFormat } from '@/filters'

export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
} as const

type UserRelationKey = keyof typeof USER_RELATIONS
type UserRelationValue = (typeof USER_RELATIONS)[UserRelationKey]

function formatCellValue(field: UserRelationValue, item: UserManageItem) {
  if (field === 'role') {
    return JSON.stringify((item.role ?? []).map((role) => role.title))
  }

  if (field === 'openTime') {
    return dateFormat(item.openTime)
  }

  return item[field] ?? ''
}

export function formatUserRowsForExcel(
  headers: typeof USER_RELATIONS,
  rows: UserManageItem[]
) {
  return rows.map((item) => {
    return (Object.keys(headers) as UserRelationKey[]).map((key) => {
      return formatCellValue(headers[key], item)
    })
  })
}
