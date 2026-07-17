<script setup lang="ts">
import { ElMessage, ElTree } from 'element-plus'
import { nextTick, shallowRef, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { distributePermission, getRolePermission } from '@/api/role'
import { getPermissionList, type PermissionItem } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps<{
  roleId: string
}>()

const visible = defineModel<boolean>({ required: true })
const { t } = useI18n()
const tree = useTemplateRef<InstanceType<typeof ElTree>>('tree')
const allPermissions = shallowRef<PermissionItem[]>([])
const loading = shallowRef(false)
const submitting = shallowRef(false)
const treeProps = {
  children: 'children',
  label: 'permissionName'
}

async function loadPermissions() {
  allPermissions.value = await getPermissionList()
}

async function loadRolePermission(roleId: string) {
  loading.value = true
  try {
    const [, checkedKeys] = await Promise.all([
      loadPermissions(),
      getRolePermission(roleId)
    ])
    await nextTick()
    tree.value?.setCheckedKeys(checkedKeys)
  } finally {
    loading.value = false
  }
}

watch(
  [visible, () => props.roleId],
  ([isVisible, roleId]) => {
    if (isVisible && roleId) {
      void loadRolePermission(roleId)
    }
  },
  { immediate: true }
)

watchSwitchLang(() => {
  if (visible.value && props.roleId) {
    void loadRolePermission(props.roleId)
  }
})

function close() {
  visible.value = false
}

async function confirm() {
  if (!props.roleId) return

  submitting.value = true
  try {
    await distributePermission({
      roleId: props.roleId,
      permissions: tree.value?.getCheckedKeys(false) ?? []
    })
    ElMessage.success(t('msg.role.updatePermissionSuccess'))
    close()
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="$t('msg.role.permissionDialogTitle')"
    width="560px"
  >
    <div v-loading="loading" class="permission-dialog__content">
      <el-tree
        ref="tree"
        :data="allPermissions"
        :props="treeProps"
        show-checkbox
        check-strictly
        node-key="id"
        default-expand-all
      />
    </div>

    <template #footer>
      <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" :loading="submitting" @click="confirm">
        {{ $t('msg.universal.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.permission-dialog__content {
  min-height: 240px;
}
</style>
