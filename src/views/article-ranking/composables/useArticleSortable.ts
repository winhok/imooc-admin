import { nextTick, onBeforeUnmount, type Ref } from 'vue'
import type { TableInstance } from 'element-plus'
import Sortable from 'sortablejs'
import { articleSort, type ArticleItem } from '@/api/article'

interface UseArticleSortableOptions {
  tableRef: Readonly<Ref<TableInstance | null>>
  tableData: Readonly<Ref<ArticleItem[]>>
  onSorted: (succeeded: boolean) => Promise<void>
}

export function useArticleSortable({
  tableRef,
  tableData,
  onSorted
}: UseArticleSortableOptions) {
  let sortable: Sortable | undefined

  async function initSortable() {
    await nextTick()
    const tableElement = tableRef.value?.$el as HTMLElement | undefined
    const tbody = tableElement?.querySelector<HTMLTableSectionElement>(
      '.el-table__body-wrapper tbody'
    )

    if (!tbody || sortable) return

    sortable = Sortable.create(tbody, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      filter: '.el-button',
      onEnd: async ({ oldIndex, newIndex }) => {
        if (
          oldIndex === undefined ||
          newIndex === undefined ||
          oldIndex === newIndex
        ) {
          return
        }

        const source = tableData.value[oldIndex]
        const target = tableData.value[newIndex]
        if (!source || !target) {
          await onSorted(false)
          return
        }

        let succeeded = false
        try {
          await articleSort({
            initRanking: source.ranking,
            finalRanking: target.ranking
          })
          succeeded = true
        } finally {
          await onSorted(succeeded)
        }
      }
    })
  }

  onBeforeUnmount(() => {
    sortable?.destroy()
    sortable = undefined
  })

  return { initSortable }
}
