const CALLBACK_NAME = '__imoocAdminBaiduMapReady'

declare global {
  interface Window {
    BMap?: unknown
    __imoocAdminBaiduMapReady?: () => void
  }
}

let loader: Promise<void> | undefined

export function loadBaiduMap(ak: string) {
  if (window.BMap) return Promise.resolve()
  if (loader) return loader

  loader = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    window.__imoocAdminBaiduMapReady = () => {
      delete window.__imoocAdminBaiduMapReady
      resolve()
    }
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${encodeURIComponent(ak)}&callback=${CALLBACK_NAME}`
    script.async = true
    script.onerror = () => {
      loader = undefined
      delete window.__imoocAdminBaiduMapReady
      reject(new Error('Baidu Map failed to load'))
    }
    document.head.append(script)
  })

  return loader
}
