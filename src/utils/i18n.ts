import i18n from '@/i18n'
import { useAppStore } from '@/store'
import { watch } from 'vue'

export function generateTitle(title: string) {
  return i18n.global.t('msg.route.' + title)
}

export function watchSwitchLang(...cbs: Array<(lang: string) => void>) {
  const appStore = useAppStore()
  watch(
    () => appStore.language,
    (lang) => {
      cbs.forEach((cb) => cb(lang))
    }
  )
}
