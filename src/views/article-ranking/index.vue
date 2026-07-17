<script setup lang="ts">
import { onActivated, shallowRef, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, type TableInstance } from 'element-plus'
import { Delete, View } from '@element-plus/icons-vue'
import { deleteArticle, getArticleList, type ArticleItem } from '@/api/article'
import { relativeTime } from '@/filters'
import { watchSwitchLang } from '@/utils/i18n'
import ArticleColumnSelector from './components/ArticleColumnSelector.vue'
import { useArticleColumns } from './composables/useArticleColumns'
import { useArticleSortable } from './composables/useArticleSortable'

const router = useRouter()
const { t } = useI18n()
const tableRef = useTemplateRef<TableInstance>('table')
const tableData = shallowRef<ArticleItem[]>([])
const total = shallowRef(0)
const page = shallowRef(1)
const size = shallowRef(10)
const tableLoading = shallowRef(false)

const { availableColumns, selectedColumnProps, tableColumns } =
  useArticleColumns()

async function getListData() {
  tableLoading.value = true
  try {
    const result = await getArticleList({
      page: page.value,
      size: size.value
    })
    tableData.value = result.list
    total.value = result.total
  } finally {
    tableLoading.value = false
  }
}

const { initSortable } = useArticleSortable({
  tableRef,
  tableData,
  onSorted: async (succeeded) => {
    tableData.value = []
    await getListData()
    if (succeeded) ElMessage.success(t('msg.article.sortSuccess'))
  }
})

watchSwitchLang(() => void getListData())
onActivated(async () => {
  await getListData()
  await initSortable()
})

function handleSizeChange(currentSize: number) {
  size.value = currentSize
  page.value = 1
  void getListData()
}

function handleCurrentChange(currentPage: number) {
  page.value = currentPage
  void getListData()
}

function asArticle(row: unknown) {
  return row as ArticleItem
}

function onShowClick(row: unknown) {
  const article = asArticle(row)
  void router.push(`/article/${article._id}`)
}

function onRemoveClick(row: unknown) {
  const article = asArticle(row)
  void ElMessageBox.confirm(
    `${t('msg.article.dialogTitle1')}${article.title}${t(
      'msg.article.dialogTitle2'
    )}`,
    { type: 'warning' }
  )
    .then(async () => {
      await deleteArticle(article._id)
      if (tableData.value.length === 1 && page.value > 1) {
        page.value -= 1
      }
      ElMessage.success(t('msg.article.removeSuccess'))
      await getListData()
    })
    .catch(() => {})
}
</script>

<template>
  <div class="article-ranking-container">
    <ArticleColumnSelector
      v-model="selectedColumnProps"
      :columns="availableColumns"
    />

    <el-card>
      <el-table
        ref="table"
        v-loading="tableLoading"
        :data="tableData"
        border
        row-key="_id"
        style="width: 100%"
      >
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop === 'action' ? undefined : column.prop"
          :label="column.label"
          :min-width="column.prop === 'title' ? 220 : 120"
          :width="column.prop === 'action' ? 190 : undefined"
          :fixed="column.prop === 'action' ? 'right' : undefined"
        >
          <template #default="{ row }">
            <template v-if="column.prop === 'publicDate'">
              {{ relativeTime(row.publicDate) }}
            </template>
            <template v-else-if="column.prop === 'action'">
              <el-button
                type="primary"
                size="small"
                :icon="View"
                @click="onShowClick(row)"
              >
                {{ $t('msg.article.show') }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                :icon="Delete"
                @click="onRemoveClick(row)"
              >
                {{ $t('msg.article.remove') }}
              </el-button>
            </template>
            <template v-else>
              {{ row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-ranking-container {
  :deep(.el-table__row) {
    cursor: move;
  }

  :deep(.sortable-ghost) {
    color: #fff;
    background: #304156;
    opacity: 0.6;
  }
}

.pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>
