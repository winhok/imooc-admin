import { useUserStore } from '@/stores'
import type { Directive } from 'vue'

function updatePermissionVisibility(
  element: HTMLElement,
  requiredPermissions: string[]
) {
  if (!Array.isArray(requiredPermissions)) {
    throw new TypeError('v-permission 的值必须是权限标识数组')
  }

  const userStore = useUserStore()
  const points = userStore.userInfo.permission?.points ?? []
  element.hidden = !requiredPermissions.some((permission) =>
    points.includes(permission)
  )
}

const permission: Directive<HTMLElement, string[]> = {
  mounted(element, binding) {
    updatePermissionVisibility(element, binding.value)
  },
  updated(element, binding) {
    updatePermissionVisibility(element, binding.value)
  }
}

export default permission
