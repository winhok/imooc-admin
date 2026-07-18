import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { createArticle, editArticle } from '@/api/article'

interface SubmitArticleOptions {
  articleId?: string
  title: string
  content: string
}

function hasArticleContent(content: string) {
  if (!content.trim()) return false

  const document = new DOMParser().parseFromString(content, 'text/html')
  const textContent = (document.body.textContent ?? '')
    .replace(/[\u00a0\u200b]/g, ' ')
    .trim()

  if (textContent) return true
  return Boolean(document.body.querySelector('img, video, audio, iframe, hr'))
}

export async function submitArticle({
  articleId,
  title,
  content
}: SubmitArticleOptions) {
  if (!title.trim()) {
    ElMessage.warning(i18n.global.t('msg.article.titleRequired'))
    return false
  }

  if (!hasArticleContent(content)) {
    ElMessage.warning(i18n.global.t('msg.article.contentRequired'))
    return false
  }

  if (articleId) {
    await editArticle({ id: articleId, title: title.trim(), content })
    ElMessage.success(i18n.global.t('msg.article.editorSuccess'))
    return true
  }

  await createArticle({ title: title.trim(), content })
  ElMessage.success(i18n.global.t('msg.article.createSuccess'))
  return true
}
