import type { App } from 'vue'
import dayjs from 'dayjs'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { pinia, useAppStore } from '@/stores'

dayjs.extend(relativeTimePlugin)

export const dateFormat = (
  value?: Date | number | string | null,
  format = 'YYYY-MM-DD'
) => {
  if (value === undefined || value === null || value === '') return ''

  const normalizedValue =
    typeof value === 'string' &&
    value.trim() !== '' &&
    !Number.isNaN(Number(value))
      ? Number(value)
      : value

  const date = dayjs(normalizedValue)
  return date.isValid() ? date.format(format) : ''
}

export const dateFilter = dateFormat

export const relativeTime = (value?: Date | number | string | null) => {
  if (value === undefined || value === null || value === '') return ''

  const normalizedValue =
    typeof value === 'string' &&
    value.trim() !== '' &&
    !Number.isNaN(Number(value))
      ? Number(value)
      : value
  const date = dayjs(normalizedValue)
  if (!date.isValid()) return ''

  const locale = useAppStore(pinia).language === 'zh' ? 'zh-cn' : 'en'
  return dayjs().locale(locale).to(date)
}

export default function installFilters(app: App) {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      dateFilter: typeof dateFilter
      relativeTime: typeof relativeTime
    }
  }
}
