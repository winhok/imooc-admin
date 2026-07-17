<script setup lang="ts">
import { reactive, shallowRef, watch } from 'vue'
import { getArticleDetail, type ArticleDetail } from '@/api/article'
import MarkdownEditor from './components/MarkdownEditor.vue'
import RichTextEditor from './components/RichTextEditor.vue'

type EditorTab = 'markdown' | 'richText'

const props = defineProps<{
  id?: string
}>()

const activeTab = shallowRef<EditorTab>('markdown')
const form = reactive({ title: '' })
const detail = shallowRef<ArticleDetail | null>(null)
const loading = shallowRef(false)

watch(
  () => props.id,
  async (articleId, _previousId, onCleanup) => {
    if (!articleId) {
      form.title = ''
      detail.value = null
      return
    }

    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })

    loading.value = true
    try {
      const article = await getArticleDetail(articleId)
      if (cancelled) return
      detail.value = article
      form.title = article.title
    } finally {
      if (!cancelled) loading.value = false
    }
  },
  { immediate: true }
)

function handleSuccess() {
  form.title = ''
  detail.value = null
}
</script>

<template>
  <div v-loading="loading" class="article-create">
    <el-card>
      <el-input
        v-model="form.title"
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        maxlength="20"
        clearable
      />

      <el-tabs v-model="activeTab">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <MarkdownEditor
            :title="form.title"
            :detail="detail"
            @success="handleSuccess"
          />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="richText">
          <RichTextEditor
            :title="form.title"
            :detail="detail"
            @success="handleSuccess"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
