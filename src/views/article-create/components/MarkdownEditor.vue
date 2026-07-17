<script setup lang="ts">
import ToastEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, onUnmounted, shallowRef, useTemplateRef, watch } from 'vue'
import type { ArticleDetail } from '@/api/article'
import { useAppStore } from '@/stores'
import { watchSwitchLang } from '@/utils/i18n'
import { submitArticle } from './submitArticle'

const props = defineProps<{
  title: string
  detail: ArticleDetail | null
}>()

const emit = defineEmits<{
  success: []
}>()

const appStore = useAppStore()
const editorElement = useTemplateRef<HTMLElement>('editorElement')
const editor = shallowRef<ToastEditor | null>(null)
const submitting = shallowRef(false)

function initEditor(content = '') {
  if (!editorElement.value) return

  const instance = new ToastEditor({
    el: editorElement.value,
    height: '500px',
    previewStyle: 'vertical',
    language: appStore.language === 'zh' ? 'zh-CN' : 'en',
    usageStatistics: false
  })
  instance.setHTML(content)
  editor.value = instance
}

watch(
  () => props.detail?.content,
  (content) => {
    editor.value?.setHTML(content ?? '')
  }
)

watchSwitchLang(() => {
  if (!editor.value) return
  const content = editor.value.getHTML()
  editor.value.destroy()
  initEditor(content)
})

onMounted(() => {
  initEditor(props.detail?.content)
})

onUnmounted(() => {
  editor.value?.destroy()
  editor.value = null
})

async function handleSubmit() {
  if (!editor.value) return

  submitting.value = true
  try {
    await submitArticle({
      articleId: props.detail?._id,
      title: props.title,
      content: editor.value.getHTML()
    })
    editor.value.reset()
    emit('success')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="markdown-editor">
    <div ref="editorElement"></div>
    <div class="actions">
      <el-button type="primary" :loading="submitting" @click="handleSubmit">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  margin-top: 20px;
  text-align: right;
}
</style>
