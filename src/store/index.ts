import { createPinia } from 'pinia'

const pinia = createPinia()

export { useUserStore } from './modules/user'

export default pinia
