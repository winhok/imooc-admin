<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const appStore = useAppStore()
const route = useRoute()
const routes = computed(() => {
  void route.path
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
const activeMenu = computed(() => {
  const { meta, path } = route
  if (typeof meta.activeMenu === 'string') {
    return meta.activeMenu
  }
  return path
})
</script>

<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="!appStore.sidebarOpened"
    :background-color="appStore.cssVar.menuBg"
    :text-color="appStore.cssVar.menuText"
    :active-text-color="appStore.cssVar.menuActiveText"
    :unique-opened="true"
    router
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>
