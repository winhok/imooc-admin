<script setup lang="ts">
import { onActivated, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Delete,
  Download,
  Setting,
  Upload,
  View
} from '@element-plus/icons-vue'
import {
  deleteUser,
  getUserManageList,
  type UserManageItem
} from '@/api/user-manage'
import { dateFormat } from '@/filters'
import { watchSwitchLang } from '@/utils/i18n'
import ExportToExcel from './components/Export2Excel.vue'

const router = useRouter()
const i18n = useI18n()

const tableData = shallowRef<UserManageItem[]>([])
const total = shallowRef(0)
const page = shallowRef(1)
const size = shallowRef(2)
const tableLoading = shallowRef(false)
const exportToExcelVisible = shallowRef(false)

async function getListData() {
  tableLoading.value = true

  try {
    const result = await getUserManageList({
      page: page.value,
      size: size.value
    })
    tableData.value = result.list
    total.value = result.total
  } finally {
    tableLoading.value = false
  }
}

void getListData()
watchSwitchLang(getListData)
onActivated(getListData)

function handleSizeChange(currentSize: number) {
  size.value = currentSize
  page.value = 1
  void getListData()
}

function handleCurrentChange(currentPage: number) {
  page.value = currentPage
  void getListData()
}

function onImportExcelClick() {
  void router.push('/user/import')
}

function onToExcelClick() {
  exportToExcelVisible.value = true
}

function onShowClick(id: string) {
  void router.push(`/user/info/${id}`)
}

function onRemoveClick(row: unknown) {
  const user = row as UserManageItem

  void ElMessageBox.confirm(
    `${i18n.t('msg.excel.dialogTitle1')}${user.username}${i18n.t(
      'msg.excel.dialogTitle2'
    )}`,
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUser(user._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      await getListData()
    })
    .catch(() => {})
}
</script>

<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" :icon="Upload" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" :icon="Download" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <el-card>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('msg.excel.name')" />
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')" />
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template #default="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="row.avatar ? [row.avatar] : []"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag
                v-for="item in row.role"
                :key="item.id ?? item.title"
                size="small"
              >
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ dateFormat(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :icon="View"
              @click="onShowClick(row._id)"
            >
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button type="info" size="small" :icon="Setting">
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="onRemoveClick(row)"
            >
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <ExportToExcel v-model="exportToExcelVisible" />
  </div>
</template>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
