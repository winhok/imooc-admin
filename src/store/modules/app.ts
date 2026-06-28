import variables from '@/styles/variables.module.scss'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebarOpened = shallowRef(true)
  const cssVar = computed(() => variables)

  function triggerSidebarOpened() {
    sidebarOpened.value = !sidebarOpened.value
  }

  return {
    sidebarOpened,
    cssVar,
    triggerSidebarOpened
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
