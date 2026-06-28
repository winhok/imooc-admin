<script setup lang="ts">
import { User } from '@element-plus/icons-vue'

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
  <span>{{ title }}</span>
</template>

<style lang="scss" scoped></style>
