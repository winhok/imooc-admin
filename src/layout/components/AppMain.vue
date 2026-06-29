<script lang="ts" setup>
import { watch } from 'vue'
import { isTags } from '@/utils/tags'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'

const route = useRoute()

const getTitle = (route: {
  path: string
  meta?: Record<string, unknown> | null
}) => {
  if (route.meta?.title) {
    return generateTitle(route.meta.title as string)
  }
  return route.path.split('/').pop() ?? ''
}

const appStore = useAppStore()
watch(
  route,
  (to) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    appStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  { immediate: true }
)

watchSwitchLang(() => {
  appStore.setTagsViewTitle(getTitle)
})
</script>

<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
