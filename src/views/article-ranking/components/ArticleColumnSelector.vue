<script setup lang="ts">
import type {
  ArticleColumn,
  ArticleColumnProp
} from '../composables/useArticleColumns'

defineProps<{
  columns: ArticleColumn[]
}>()

const selectedColumns = defineModel<ArticleColumnProp[]>({ required: true })
</script>

<template>
  <el-card class="column-selector">
    <div class="dynamic-box">
      <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
      <el-checkbox-group v-model="selectedColumns">
        <el-checkbox
          v-for="column in columns"
          :key="column.prop"
          :value="column.prop"
        >
          {{ column.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.column-selector {
  margin-bottom: 20px;
}

.dynamic-box {
  display: flex;
  align-items: center;
}

.title {
  margin-right: 20px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}
</style>
