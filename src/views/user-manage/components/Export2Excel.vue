<script setup lang="ts">
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { formatUserRowsForExcel, USER_RELATIONS } from './Export2ExcelConstants'

const visible = defineModel<boolean>({ required: true })

const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = shallowRef(exportDefaultName)
const loading = shallowRef(false)

watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

function closed() {
  loading.value = false
  visible.value = false
}

async function onConfirm() {
  loading.value = true

  try {
    const allUser = (await getUserManageAllList()).list
    const excel = await import('@/utils/Export2Excel')
    const data = formatUserRowsForExcel(USER_RELATIONS, allUser)

    excel.export_json_to_excel({
      header: Object.keys(USER_RELATIONS),
      data,
      filename: excelName.value || exportDefaultName,
      autoWidth: true,
      bookType: 'xlsx'
    })

    closed()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="visible"
    width="30%"
    @close="closed"
  >
    <el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
