<script setup lang="ts">
import ContextMenu from '@/components/TagsView/ContextMenu.vue'
import { useRoute } from 'vue-router'
import { useAppStore, type TagsViewItem } from '@/stores'
import { ref, reactive, watch, onUnmounted } from 'vue'

const route = useRoute()
const appStore = useAppStore()

const isActive = (tag: TagsViewItem) => {
  return tag.path === route.path
}

const onCloseClick = (index: number) => {
  appStore.removeTagsView({
    type: 'index',
    index: index
  })
}

const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: '0',
  top: '0'
})

const openMenu = (e: MouseEvent, index: number) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

const closeMenu = () => {
  visible.value = false
}

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onUnmounted(() => {
  document.body.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        @contextmenu.prevent="openMenu($event, index)"
        :style="{
          backgroundColor: isActive(tag) ? appStore.cssVar.menuBg : '',
          borderColor: isActive(tag) ? appStore.cssVar.menuBg : ''
        }"
        v-for="(tag, index) in appStore.tagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
      >
        {{ tag.title }}
        <SvgIcon
          v-show="!isActive(tag)"
          icon="close"
          @click.prevent.stop="onCloseClick(index)"
        />
      </router-link>
    </el-scrollbar>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
  }
}
</style>
