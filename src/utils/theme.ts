import axios from 'axios'
import { version as elementPlusVersion } from 'element-plus'
import { formatHex, useMode, modeRgb } from 'culori/fn'

const toRgb = useMode(modeRgb)

const TINT_RATIO: Record<string, number> = {
  'light-1': 0.1,
  'light-2': 0.2,
  'light-3': 0.3,
  'light-4': 0.4,
  'light-5': 0.5,
  'light-6': 0.6,
  'light-7': 0.7,
  'light-8': 0.8,
  'light-9': 0.9,
  subMenuHover: 0.7,
  subMenuBg: 0.8,
  menuHover: 0.9
}
const SHADE_RATIO: Record<string, number> = {
  'shade-1': 0.1
}

const channel = (v: number) => Math.round(v * 255)
const mixColor = (baseHex: string, targetHex: string, ratio: number) => {
  const base = toRgb(baseHex)
  const target = toRgb(targetHex)
  if (!base || !target) return baseHex
  const baseWeight = 1 - ratio
  const mix = (b: number, t: number) =>
    Math.round(baseWeight * channel(b) + (1 - baseWeight) * channel(t)) / 255
  return formatHex({
    mode: 'rgb',
    r: mix(base.r, target.r),
    g: mix(base.g, target.g),
    b: mix(base.b, target.b)
  })
}

let styleEl: HTMLStyleElement | null = null
export const writeNewStyle = (elNewStyle: string) => {
  if (!styleEl) {
    styleEl = document.createElement('style')
    document.head.appendChild(styleEl)
  }
  styleEl.innerText = elNewStyle
}

export const generateNewStyle = async (primaryColor: string) => {
  const colors = generateColors(primaryColor)
  let cssText = await getOriginalStyle()

  Object.entries(colors).forEach(([key, value]) => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + value)
  })

  return cssText
}

export const generateColors = (primary: string): Record<string, string> => {
  if (!primary) return {}
  const colors: Record<string, string> = {
    primary,
    menuBg: primary
  }
  Object.entries(TINT_RATIO).forEach(([key, ratio]) => {
    colors[key] = mixColor(primary, '#ffffff', ratio)
  })
  Object.entries(SHADE_RATIO).forEach(([key, ratio]) => {
    colors[key] = mixColor(primary, '#000000', ratio)
  })
  return colors
}

let originalStyleCache: Promise<string> | null = null
const getOriginalStyle = async () => {
  if (!originalStyleCache) {
    originalStyleCache = (async () => {
      const url = `https://unpkg.com/element-plus@${elementPlusVersion}/dist/index.css`
      const { data } = await axios(url)
      return getStyleTemplate(data)
    })()
  }
  return originalStyleCache
}

const getStyleTemplate = (data: string): string => {
  const colorMap: Record<string, string> = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.entries(colorMap).forEach(([key, value]) => {
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
