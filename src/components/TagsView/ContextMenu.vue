<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/store'

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const onRefreshClick = () => {
  router.go(0)
}

const redirectIfActiveClosed = () => {
  const stillExists = appStore.tagsViewList.some(
    (tag) => tag.path === route.path
  )
  if (stillExists) return
  const lastTag = appStore.tagsViewList[appStore.tagsViewList.length - 1]
  router.push(lastTag ? lastTag.fullPath : '/')
}

const onCloseRightClick = () => {
  appStore.removeTagsView({
    type: 'right',
    index: props.index
  })
  redirectIfActiveClosed()
}

const onCloseOtherClick = () => {
  appStore.removeTagsView({
    type: 'other',
    index: props.index
  })
  redirectIfActiveClosed()
}
</script>

<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
