import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // importStyle: 'sass' 让按需引入的 Element Plus 组件加载 scss 源码，
    // 从而能被下方 additionalData 注入的主题变量覆盖。
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Vite 8 已默认使用 dart-sass 的 modern compiler API，无需再设置 api 选项。
        // 全局注入 Element Plus 主题变量覆盖文件（基于 @use/@forward 的模块化方案）。
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  }
})
