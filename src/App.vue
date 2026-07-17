<script setup lang="ts">
import { computed, watch } from 'vue'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { applyThemeColor } from '@/utils/theme'
import { useAppStore, useThemeStore, useUserStore } from '@/stores'
import { watchSwitchLang } from '@/utils/i18n'

const appStore = useAppStore()
const themeStore = useThemeStore()
const userStore = useUserStore()

watchSwitchLang(() => {
  if (userStore.hasToken) {
    userStore.getUserInfo().catch(() => {})
  }
})

watch(() => themeStore.mainColor, applyThemeColor, { immediate: true })

const elementLocale = computed(() => {
  return appStore.language === 'en' ? en : zhCn
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>
