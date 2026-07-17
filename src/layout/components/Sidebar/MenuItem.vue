<script setup lang="ts">
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
  <svg-icon :icon="icon" />
  <span>{{ generateTitle(title) }}</span>
</template>
