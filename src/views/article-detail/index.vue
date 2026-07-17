<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
import { Edit } from '@element-plus/icons-vue'
import { getArticleDetail, type ArticleDetail } from '@/api/article'
import { relativeTime } from '@/filters'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const detail = shallowRef<ArticleDetail | null>(null)
const loading = shallowRef(false)
const sanitizedContent = computed(() =>
  DOMPurify.sanitize(detail.value?.content ?? '')
)

async function loadArticleDetail(articleId: string) {
  loading.value = true
  try {
    detail.value = await getArticleDetail(articleId)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.id,
  (id) => void loadArticleDetail(id),
  { immediate: true }
)

function onEditClick() {
  void router.push(`/article/editor/${props.id}`)
}
</script>

<template>
  <el-card v-loading="loading" class="article-detail-container">
    <template v-if="detail">
      <h2 class="title">{{ detail.title }}</h2>
      <div class="header">
        <span class="meta">
          {{ $t('msg.article.author') }}：{{ detail.author }}
        </span>
        <span class="meta">
          {{ $t('msg.article.publicDate') }}：{{
            relativeTime(detail.publicDate)
          }}
        </span>
        <el-button
          class="edit"
          type="primary"
          link
          :icon="Edit"
          @click="onEditClick"
        >
          {{ $t('msg.article.edit') }}
        </el-button>
      </div>
      <div class="content" v-html="sanitizedContent"></div>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.article-detail-container {
  min-height: 240px;
}

.title {
  padding: 12px 0;
  margin: 0;
  font-size: 22px;
  text-align: center;
}

.header {
  padding: 26px 0;
}

.meta {
  margin-right: 20px;
  font-size: 14px;
  color: #555666;
}

.edit {
  float: right;
}

.content {
  padding: 20px 0;
  overflow-wrap: anywhere;
  font-size: 14px;
  border-top: 1px solid #d4d4d4;
}
</style>
