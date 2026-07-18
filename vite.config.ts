import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const elementPlusComponentsDir = fileURLToPath(
  new URL('./node_modules/element-plus/es/components/', import.meta.url)
)
const elementPlusStyleDeps = readdirSync(elementPlusComponentsDir, {
  withFileTypes: true
})
  .filter(
    (entry) =>
      entry.isDirectory() &&
      existsSync(join(elementPlusComponentsDir, entry.name, 'style/index.mjs'))
  )
  .map((entry) => `element-plus/es/components/${entry.name}/style/index`)

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/icons/svg', import.meta.url))],
      symbolId: 'icon-[name]'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    })
  ],
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    entries: ['index.html', 'src/**/*.{ts,vue}'],
    include: ['element-plus/es', ...elementPlusStyleDeps]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;\n`
      }
    }
  }
})
