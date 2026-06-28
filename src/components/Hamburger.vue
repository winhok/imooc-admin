<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const toggleClick = () => {
  appStore.triggerSidebarOpened()
}

const icon = computed(() =>
  appStore.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
)
</script>

<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
