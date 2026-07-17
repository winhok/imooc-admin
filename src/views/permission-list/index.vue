<script setup lang="ts">
import { shallowRef } from 'vue'
import { getPermissionList, type PermissionItem } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const permissions = shallowRef<PermissionItem[]>([])
const loading = shallowRef(false)

async function loadPermissions() {
  loading.value = true
  try {
    permissions.value = await getPermissionList()
  } finally {
    loading.value = false
  }
}

void loadPermissions()
watchSwitchLang(() => {
  void loadPermissions()
})
</script>

<template>
  <div class="permission-list-container">
    <el-card>
      <el-table
        v-loading="loading"
        :data="permissions"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="220"
        />
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="220"
        />
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
