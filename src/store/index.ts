import { createPinia } from 'pinia'

const pinia = createPinia()

export { useUserStore } from './modules/user'
export { useAppStore } from './modules/app'

export default pinia
