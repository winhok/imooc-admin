export const setItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = <T = unknown>(key: string): T | null => {
  const data = window.localStorage.getItem(key)
  if (data === null) {
    return null
  }

  try {
    return JSON.parse(data) as T
  } catch {
    return null
  }
}

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
