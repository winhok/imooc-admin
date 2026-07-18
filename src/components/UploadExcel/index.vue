<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import * as XLSX from 'xlsx'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { getHeaderRow, isExcel } from './utils'

export interface ExcelData {
  header: string[]
  results: Record<string, unknown>[]
}

const props = defineProps<{
  beforeUpload?: (file: File) => boolean
  onSuccess?: (excelData: ExcelData) => void | Promise<void>
}>()

const i18n = useI18n()
const loading = shallowRef(false)
const excelUploadInput = useTemplateRef<HTMLInputElement>('excelUploadInput')

async function generateData(excelData: ExcelData) {
  await props.onSuccess?.(excelData)
}

async function parseExcel(rawFile: File): Promise<ExcelData | null> {
  try {
    const data = await rawFile.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]

    if (!firstSheetName) {
      ElMessage.error(i18n.t('msg.uploadExcel.noWorksheet'))
      return null
    }

    const worksheet = workbook.Sheets[firstSheetName]
    if (!worksheet) {
      ElMessage.error(i18n.t('msg.uploadExcel.noData'))
      return null
    }

    const header = getHeaderRow(worksheet)
    const results = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet)
    return { header, results }
  } catch {
    ElMessage.error(i18n.t('msg.uploadExcel.parseFailed'))
    return null
  }
}

async function readerData(rawFile: File) {
  loading.value = true

  try {
    const excelData = await parseExcel(rawFile)
    if (!excelData) return
    try {
      await generateData(excelData)
    } catch {}
  } finally {
    loading.value = false
  }
}

function upload(rawFile: File) {
  if (loading.value) return

  if (excelUploadInput.value) {
    excelUploadInput.value.value = ''
  }

  if (!isExcel(rawFile)) {
    ElMessage.error(i18n.t('msg.uploadExcel.fileTypeError'))
    return
  }

  if (!props.beforeUpload) {
    void readerData(rawFile)
    return
  }

  if (props.beforeUpload(rawFile)) {
    void readerData(rawFile)
  }
}

function handleUpload() {
  if (loading.value) return
  excelUploadInput.value?.click()
}

function handleChange(event: Event) {
  const input = event.target as HTMLInputElement
  const rawFile = input.files?.[0]
  if (!rawFile) return

  upload(rawFile)
}

function handleDrop(event: DragEvent) {
  if (loading.value) return

  const files = event.dataTransfer?.files
  if (!files || files.length !== 1) {
    ElMessage.error(i18n.t('msg.uploadExcel.singleFile'))
    return
  }

  const rawFile = files[0]
  if (!rawFile) return

  upload(rawFile)
}

function handleDragover(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
}
</script>

<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon class="drop-icon">
        <UploadFilled />
      </el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 100px;

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
  }

  .drop-icon {
    font-size: 60px;
    display: block;
    align-self: center;
  }
}
</style>
