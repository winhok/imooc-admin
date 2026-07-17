declare module '@toast-ui/editor' {
  interface EditorOptions {
    el: HTMLElement
    height?: string
    previewStyle?: 'tab' | 'vertical'
    language?: string
    usageStatistics?: boolean
  }

  export default class Editor {
    constructor(options: EditorOptions)
    destroy(): void
    getHTML(): string
    reset(): void
    setHTML(html: string): void
  }
}
