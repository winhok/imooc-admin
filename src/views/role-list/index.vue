<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { getRoleList, type RoleItem } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermissionDialog from './components/DistributePermissionDialog.vue'

const roles = shallowRef<RoleItem[]>([])
const loading = shallowRef(false)
const selectedRoleId = shallowRef('')
const distributePermissionVisible = shallowRef(false)

async function loadRoles() {
  loading.value = true
  try {
    roles.value = await getRoleList()
  } finally {
    loading.value = false
  }
}

void loadRoles()
watchSwitchLang(() => {
  void loadRoles()
})

watch(distributePermissionVisible, (visible) => {
  if (!visible) selectedRoleId.value = ''
})

function openPermissionDialog(row: unknown) {
  const role = row as RoleItem
  selectedRoleId.value = role.id
  distributePermissionVisible.value = true
}
</script>

<template>
  <div class="role-list-container">
    <el-card>
      <el-table v-loading="loading" :data="roles" border>
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        />
        <el-table-column :label="$t('msg.role.name')" prop="title" />
        <el-table-column :label="$t('msg.role.desc')" prop="describe" />
        <el-table-column :label="$t('msg.role.action')" width="260">
          <template #default="{ row }">
            <el-button
              v-permission="['distributePermission']"
              type="primary"
              size="small"
              @click="openPermissionDialog(row)"
            >
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <DistributePermissionDialog
      v-model="distributePermissionVisible"
      :role-id="selectedRoleId"
    />
  </div>
</template>

<style scoped lang="scss"></style>
