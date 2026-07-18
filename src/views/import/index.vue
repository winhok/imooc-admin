<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import UploadExcel, { type ExcelData } from '@/components/UploadExcel/index.vue'
import { userBatchImport } from '@/api/user-manage'
import {
  getEffectiveImportedRows,
  getMissingUserHeaders,
  transformImportedUsers,
  type ImportedExcelRow
} from './utils'

const router = useRouter()
const i18n = useI18n()

async function onSuccess({ header, results }: ExcelData) {
  const missingHeaders = getMissingUserHeaders(header)
  if (missingHeaders.length > 0) {
    ElMessage.error(
      i18n.t('msg.excel.missingHeaders', { headers: missingHeaders.join('、') })
    )
    return
  }

  const effectiveRows = getEffectiveImportedRows(results as ImportedExcelRow[])
  if (effectiveRows.length === 0) {
    ElMessage.error(i18n.t('msg.excel.emptyImport'))
    return
  }

  const updateData = transformImportedUsers(effectiveRows)
  await userBatchImport(updateData)
  ElMessage.success({
    message: `${effectiveRows.length}${i18n.t('msg.excel.importSuccess')}`,
    type: 'success'
  })
  await router.push('/user/manage')
}
</script>

<template>
  <UploadExcel :on-success="onSuccess" />
</template>

<style lang="scss" scoped></style>
