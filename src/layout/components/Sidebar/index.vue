<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()
const logoHeight = 44
const imoocLogo = new URL('../../../assets/imooc-logo.png', import.meta.url)
  .href
</script>
<template>
  <div class="">
    <div class="logo-container">
      <el-avatar :size="logoHeight" shape="square" :src="imoocLogo" />
      <h1 class="logo-title" v-if="appStore.sidebarOpened">imooc-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
.logo-container {
  height: v-bind("logoHeight + 'px'");
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
