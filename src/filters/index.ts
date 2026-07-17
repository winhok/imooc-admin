import type { App } from 'vue'
import dayjs from 'dayjs'

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

export default function installFilters(app: App) {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      dateFilter: typeof dateFilter
    }
  }
}
