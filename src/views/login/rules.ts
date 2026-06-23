import type { FormItemRule } from 'element-plus'

export const validatePassword = (
  _rule: FormItemRule,
  value: string,
  callback: (error?: Error) => void
) => {
  if (!value || value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}
