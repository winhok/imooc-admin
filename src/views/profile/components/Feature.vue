<script setup lang="ts">
import { computed, ref } from 'vue'
import DOMPurify from 'dompurify'
import type { FeatureItem } from '@/api/user'
const activeName = ref(0)

const props = defineProps<{
  features: FeatureItem[]
}>()

const sanitized = computed(
  () =>
    new Map(
      props.features.map((item) => [item.id, DOMPurify.sanitize(item.content)])
    )
)
</script>

<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="sanitized.get(item.id)"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}

.el-collapse-item {
  :deep(a) {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
