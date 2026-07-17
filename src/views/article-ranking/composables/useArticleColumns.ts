import { computed, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'

export type ArticleColumnProp =
  'ranking' | 'title' | 'author' | 'publicDate' | 'desc' | 'action'

export interface ArticleColumn {
  prop: ArticleColumnProp
  label: string
}

const DEFAULT_COLUMN_PROPS: ArticleColumnProp[] = [
  'ranking',
  'title',
  'author',
  'publicDate',
  'desc',
  'action'
]

export function useArticleColumns() {
  const { t } = useI18n()
  const selectedColumnProps = shallowRef<ArticleColumnProp[]>([
    ...DEFAULT_COLUMN_PROPS
  ])
  const availableColumns = computed<ArticleColumn[]>(() => [
    { prop: 'ranking', label: t('msg.article.ranking') },
    { prop: 'title', label: t('msg.article.title') },
    { prop: 'author', label: t('msg.article.author') },
    { prop: 'publicDate', label: t('msg.article.publicDate') },
    { prop: 'desc', label: t('msg.article.desc') },
    { prop: 'action', label: t('msg.article.action') }
  ])
  const tableColumns = computed(() =>
    availableColumns.value.filter((column) =>
      selectedColumnProps.value.includes(column.prop)
    )
  )

  return {
    availableColumns,
    selectedColumnProps,
    tableColumns
  }
}
