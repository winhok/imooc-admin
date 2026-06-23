/**
 * 存储数据：统一以 JSON 序列化，保证与 getItem 读写类型一致
 */
export const setItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取数据：与 setItem 对称地反序列化
 */
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

/**
 * 删除数据
 */
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
