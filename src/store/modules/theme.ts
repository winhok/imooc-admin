import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import scssVariables from '@/styles/variables.module.scss'
import { getItem, setItem } from '@/utils/storage'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const mainColor = shallowRef(getItem<string>(MAIN_COLOR) || DEFAULT_COLOR)

  const variables = scssVariables as Record<string, string>

  function setMainColor(newColor: string) {
    mainColor.value = newColor
    setItem(MAIN_COLOR, newColor)
  }

  return {
    mainColor,
    variables,
    setMainColor
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
