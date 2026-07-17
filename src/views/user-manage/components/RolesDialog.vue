<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getRoleList, type RoleItem } from '@/api/role'
import { getUserRoles, updateUserRoles } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps<{
  userId: string
}>()

const emit = defineEmits<{
  rolesUpdated: []
}>()

const visible = defineModel<boolean>({ required: true })
const { t } = useI18n()
const allRoles = shallowRef<RoleItem[]>([])
const selectedRoleTitles = shallowRef<string[]>([])
const loading = shallowRef(false)
const submitting = shallowRef(false)

async function loadAllRoles() {
  allRoles.value = await getRoleList()
}

async function loadUserRoles(userId: string) {
  loading.value = true
  try {
    const { role } = await getUserRoles(userId)
    selectedRoleTitles.value = role.map((item) => item.title)
  } finally {
    loading.value = false
  }
}

void loadAllRoles()
watchSwitchLang(() => {
  void loadAllRoles()
})

watch(
  () => props.userId,
  (userId) => {
    if (userId) {
      void loadUserRoles(userId)
    } else {
      selectedRoleTitles.value = []
    }
  },
  { immediate: true }
)

function close() {
  visible.value = false
}

async function confirm() {
  if (!props.userId) return

  const selectedTitles = new Set(selectedRoleTitles.value)
  const roles = allRoles.value.filter((role) => selectedTitles.has(role.title))
  submitting.value = true
  try {
    await updateUserRoles(props.userId, roles)
    ElMessage.success(t('msg.role.updateRoleSuccess'))
    emit('rolesUpdated')
    close()
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="$t('msg.excel.roleDialogTitle')"
    width="520px"
  >
    <div v-loading="loading" class="roles-dialog__content">
      <el-checkbox-group v-model="selectedRoleTitles">
        <el-checkbox
          v-for="role in allRoles"
          :key="role.id"
          :value="role.title"
        >
          {{ role.title }}
        </el-checkbox>
      </el-checkbox-group>
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
.roles-dialog__content {
  min-height: 80px;
}
</style>
