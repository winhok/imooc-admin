<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import { useAppStore } from '@/store'
import variables from '@/styles/variables.module.scss'

const appStore = useAppStore()
</script>

<template>
  <div
    class="app-wrapper"
    :class="[appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixin.scss' as *;
@use '@/styles/variables.module.scss' as *;

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
