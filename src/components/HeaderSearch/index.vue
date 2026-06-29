<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { filterRouters } from '@/utils/route'
import { useRouter } from 'vue-router'
import {
  generateRoutes,
  type SearchRoute
} from '@/composables/HeaderSearch/FuseData'
import Fuse, { type FuseResult } from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

const isShow = ref(false)

const headerSearchSelectRef = ref<{
  focus: () => void
  blur: () => void
} | null>(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value?.focus()
}

const search = ref('')

const router = useRouter()
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

let fuse: Fuse<SearchRoute>
const initFuse = (searchPool: SearchRoute[]) => {
  fuse = new Fuse(searchPool, {
    ignoreLocation: true,
    threshold: 0.4,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

watchSwitchLang(() => {
  initFuse(searchPool.value)
})

const searchOptions = ref<FuseResult<SearchRoute>[]>([])
const querySearch = (query: string) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

const onSelectChange = (path: string) => {
  router.push(path)
}

const onClose = () => {
  headerSearchSelectRef.value?.blur()
  isShow.value = false
  searchOptions.value = []
}

watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
</script>

<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      id="guide-search"
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item.path"
      ></el-option>
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
