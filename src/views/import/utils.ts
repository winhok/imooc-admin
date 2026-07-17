import type { ImportedUserPayload } from '@/api/user-manage'

export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
} as const

type UserRelationKey = keyof typeof USER_RELATIONS
type UserRelationValue = (typeof USER_RELATIONS)[UserRelationKey]

export type ImportedExcelRow = Partial<Record<UserRelationKey, unknown>> &
  Record<string, unknown>

function isRelationKey(key: string): key is UserRelationKey {
  return Object.prototype.hasOwnProperty.call(USER_RELATIONS, key)
}

export const formatExcelDate = (value: unknown) => {
  if (typeof value !== 'number') return value

  const time = new Date((value - 1) * 24 * 3600000 + 1)
  time.setFullYear(time.getFullYear() - 70)
  const year = `${time.getFullYear()}`
  const month = `${time.getMonth() + 1}`
  const date = `${time.getDate() - 1}`

  return `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`
}

function resolveValue(field: UserRelationValue, value: unknown) {
  if (field === 'openTime') {
    return formatExcelDate(value)
  }
  return value
}

export const transformImportedUsers = (results: ImportedExcelRow[]) => {
  return results.map((item) => {
    return Object.keys(item).reduce<ImportedUserPayload>((userInfo, key) => {
      if (!isRelationKey(key)) return userInfo

      const field = USER_RELATIONS[key]
      return {
        ...userInfo,
        [field]: resolveValue(field, item[key])
      }
    }, {})
  })
}
