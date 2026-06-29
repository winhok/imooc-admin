<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { generateTitle } from '@/utils/i18n'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-icon v-if="icon === 'el-icon-user'"><User /></el-icon>
  <svg-icon v-else :icon="icon" />
  <span>{{ generateTitle(title) }}</span>
</template>

<style lang="scss" scoped></style>
