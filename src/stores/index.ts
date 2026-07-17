import { createPinia } from 'pinia'

export const pinia = createPinia()

export { useAppStore } from './app'
export type { TagsViewItem } from './app'
export { useThemeStore } from './theme'
export { useUserStore } from './user'
export { usePermissionStore } from './permission'
