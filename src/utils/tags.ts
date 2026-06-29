import { LOGIN_PATH, NOT_FOUND_PATH, NO_PERMISSION_PATH } from '@/constant'

const whiteList = [LOGIN_PATH, '/import', NOT_FOUND_PATH, NO_PERMISSION_PATH]

export function isTags(path: string) {
  return !whiteList.includes(path)
}
