import type { FormItemRule } from 'element-plus'
import i18n from '@/i18n'

export const validatePassword = (
  _rule: FormItemRule,
  value: string,
  callback: (error?: Error) => void
) => {
  if (!value || value.length < 6) {
    callback(new Error(i18n.global.t('msg.login.passwordRule')))
  } else {
    callback()
  }
}
