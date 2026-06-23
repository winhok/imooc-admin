/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_ENV: 'development' | 'production'
}

declare module 'virtual:svg-icons-register' {
  const register: unknown
  export default register
}
