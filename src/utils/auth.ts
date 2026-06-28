import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem, removeItem } from '@/utils/storage'

export function getTimeStamp() {
  return getItem<number>(TIME_STAMP)
}

export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

export function removeTimeStamp() {
  removeItem(TIME_STAMP)
}

export function isCheckTimeout() {
  const timeStamp = getTimeStamp()
  if (!timeStamp) return false
  const currentTime = Date.now()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
