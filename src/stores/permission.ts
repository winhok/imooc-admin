import { asyncRoutes, publicRoutes } from '@/router'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { shallowRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const usePermissionStore = defineStore('permission', () => {
  const routes = shallowRef<RouteRecordRaw[]>([...publicRoutes])

  function filterRoutes(menus: string[]) {
    const menuSet = new Set(menus)
    const allowedRoutes = asyncRoutes.filter(
      (route) => typeof route.name === 'string' && menuSet.has(route.name)
    )
    routes.value = [...publicRoutes, ...allowedRoutes]
    return allowedRoutes
  }

  function resetRoutes() {
    routes.value = [...publicRoutes]
  }

  return {
    routes,
    filterRoutes,
    resetRoutes
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}
