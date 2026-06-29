import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'
import { useThemeStore } from './theme'

export interface TagsViewItem {
  fullPath: string
  path: string
  title: string
  meta?: Record<string, unknown>
  [key: string]: unknown
}

interface RemoveTagsViewPayload {
  type: 'other' | 'right' | 'index'
  index: number
}

export const useAppStore = defineStore('app', () => {
  const themeStore = useThemeStore()
  const cachedTagsViewList = getItem<TagsViewItem[]>(TAGS_VIEW)
  const sidebarOpened = shallowRef(true)
  const language = shallowRef(getItem<string>(LANG) || 'zh')
  const tagsViewList = shallowRef<TagsViewItem[]>(
    Array.isArray(cachedTagsViewList) ? cachedTagsViewList : []
  )
  const cssVar = computed(() => ({
    ...themeStore.variables,
    ...generateColors(themeStore.mainColor)
  }))

  function triggerSidebarOpened() {
    sidebarOpened.value = !sidebarOpened.value
  }

  function setLanguage(lang: string) {
    setItem(LANG, lang)
    language.value = lang
  }

  function addTagsViewList(tag: TagsViewItem) {
    const isFind = tagsViewList.value.find((item) => item.path === tag.path)

    if (!isFind) {
      tagsViewList.value = [...tagsViewList.value, tag]
      setItem(TAGS_VIEW, tagsViewList.value)
    }
  }

  function changeTagsView({
    index,
    tag
  }: {
    index: number
    tag: TagsViewItem
  }) {
    const nextTagsViewList = [...tagsViewList.value]
    nextTagsViewList[index] = tag
    tagsViewList.value = nextTagsViewList
    setItem(TAGS_VIEW, tagsViewList.value)
  }

  function setTagsViewTitle(titleFor: (tag: TagsViewItem) => string) {
    tagsViewList.value = tagsViewList.value.map((tag) => ({
      ...tag,
      title: titleFor(tag)
    }))
    setItem(TAGS_VIEW, tagsViewList.value)
  }

  function removeTagsView({ type, index }: RemoveTagsViewPayload) {
    let nextTagsViewList = tagsViewList.value

    if (type === 'index') {
      nextTagsViewList = tagsViewList.value.filter(
        (_item, tagIndex) => tagIndex !== index
      )
    } else if (type === 'other') {
      nextTagsViewList = tagsViewList.value.slice(index, index + 1)
    } else if (type === 'right') {
      nextTagsViewList = tagsViewList.value.slice(0, index + 1)
    }

    tagsViewList.value = nextTagsViewList
    setItem(TAGS_VIEW, tagsViewList.value)
  }

  return {
    sidebarOpened,
    language,
    tagsViewList,
    cssVar,
    triggerSidebarOpened,
    setLanguage,
    addTagsViewList,
    changeTagsView,
    setTagsViewTitle,
    removeTagsView
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
