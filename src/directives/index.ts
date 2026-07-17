import type { App } from 'vue'
import print from 'vue3-print-nb'

export default function installDirective(app: App) {
  app.use(print)
}
