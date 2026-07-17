import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { createArticle, editArticle } from '@/api/article'

interface SubmitArticleOptions {
  articleId?: string
  title: string
  content: string
}

export async function submitArticle({
  articleId,
  title,
  content
}: SubmitArticleOptions) {
  if (articleId) {
    const result = await editArticle({ id: articleId, title, content })
    ElMessage.success(i18n.global.t('msg.article.editorSuccess'))
    return result
  }

  const result = await createArticle({ title, content })
  ElMessage.success(i18n.global.t('msg.article.createSuccess'))
  return result
}
