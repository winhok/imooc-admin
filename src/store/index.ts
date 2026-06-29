import { createPinia } from 'pinia'

const pinia = createPinia()

export { useUserStore } from './modules/user'
export { useAppStore } from './modules/app'
export type { TagsViewItem } from './modules/app'
export { useThemeStore } from './modules/theme'

export default pinia
