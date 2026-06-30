import i18n from '@/i18n'
import { useAppStore } from '@/store'
import { ref, watch, type Ref } from 'vue'

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

export function useLangFetch<T>(fetcher: () => Promise<T>, initial: T): Ref<T> {
  const data = ref(initial) as Ref<T>
  const load = () => {
    fetcher()
      .then((res) => (data.value = res))
      .catch(() => {})
  }
  load()
  watchSwitchLang(load)
  return data
}
