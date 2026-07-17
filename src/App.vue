<script setup lang="ts">
import { computed } from 'vue'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useAppStore, useThemeStore, useUserStore } from '@/stores'
import { DEFAULT_COLOR } from '@/constant'
import { watchSwitchLang } from '@/utils/i18n'

const appStore = useAppStore()
const themeStore = useThemeStore()
const userStore = useUserStore()

watchSwitchLang(() => {
  if (userStore.hasToken) {
    userStore.getUserInfo().catch(() => {})
  }
})

if (themeStore.mainColor !== DEFAULT_COLOR) {
  generateNewStyle(themeStore.mainColor)
    .then((newStyleText) => {
      writeNewStyle(newStyleText)
    })
    .catch((error) => {
      console.error('生成主题样式失败：', error)
    })
}

const elementLocale = computed(() => {
  return appStore.language === 'en' ? en : zhCn
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>
