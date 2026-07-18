interface ImportMetaEnv extends Record<string, unknown> {
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_ENV: 'development' | 'production'
  readonly VITE_BAIDU_MAP_AK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot?: import('vite/types/hot.js').ViteHotContext
}

declare module '*.module.scss' {
  const classes: Readonly<Record<string, string>>
  export default classes
}

declare module '*.scss' {}

declare module '*.css' {}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module 'virtual:svg-icons-register' {
  const register: unknown
  export default register
}

declare module 'vue3-print-nb' {
  import type { Plugin } from 'vue'

  const print: Plugin
  export default print
}
