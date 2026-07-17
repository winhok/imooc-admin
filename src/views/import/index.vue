<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import UploadExcel, { type ExcelData } from '@/components/UploadExcel/index.vue'
import { userBatchImport } from '@/api/user-manage'
import { transformImportedUsers, type ImportedExcelRow } from './utils'

const router = useRouter()
const i18n = useI18n()

async function onSuccess({ results }: ExcelData) {
  const updateData = transformImportedUsers(results as ImportedExcelRow[])
  await userBatchImport(updateData)
  ElMessage.success({
    message: `${results.length}${i18n.t('msg.excel.importSuccess')}`,
    type: 'success'
  })
  await router.push('/user/manage')
}
</script>

<template>
  <UploadExcel :on-success="onSuccess" />
</template>

<style lang="scss" scoped></style>
