<script setup lang="ts">
import WangEditor from 'wangeditor'
import i18next from 'i18next'
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
const editor = shallowRef<WangEditor | null>(null)
const submitting = shallowRef(false)

function getEditorHtml(instance: WangEditor) {
  return instance.txt.html() as string
}

function initEditor(content = '') {
  if (!editorElement.value) return

  const instance = new WangEditor(editorElement.value)
  instance.config.zIndex = 1
  instance.config.showMenuTooltips = true
  instance.config.menuTooltipPosition = 'down'
  instance.config.lang = appStore.language === 'zh' ? 'zh-CN' : 'en'
  instance.i18next = i18next.createInstance()
  instance.create()
  instance.txt.html(content)
  editor.value = instance
}

watch(
  () => props.detail?.content,
  (content) => {
    editor.value?.txt.html(content ?? '')
  }
)

watchSwitchLang(() => {
  if (!editor.value) return
  const content = getEditorHtml(editor.value)
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
    const submitted = await submitArticle({
      articleId: props.detail?._id,
      title: props.title,
      content: getEditorHtml(editor.value)
    })
    if (!submitted) return
    editor.value.txt.html('')
    emit('success')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="rich-text-editor">
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
