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
  'shade-1': 0.1,
  'dark-2': 0.2
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

export const generateColors = (primary: string): Record<string, string> => {
  const primaryRgb = toRgb(primary)
  if (!primaryRgb) return {}

  const normalizedPrimary = formatHex(primaryRgb)
  const colors: Record<string, string> = {
    primary: normalizedPrimary,
    menuBg: normalizedPrimary
  }
  Object.entries(TINT_RATIO).forEach(([key, ratio]) => {
    colors[key] = mixColor(normalizedPrimary, '#ffffff', ratio)
  })
  Object.entries(SHADE_RATIO).forEach(([key, ratio]) => {
    colors[key] = mixColor(normalizedPrimary, '#000000', ratio)
  })
  return colors
}

export function applyThemeColor(primary: string) {
  const colors = generateColors(primary)
  const primaryColor = colors.primary
  if (!primaryColor) return

  const primaryRgb = toRgb(primaryColor)
  if (!primaryRgb) return

  const rootStyle = document.documentElement.style
  rootStyle.setProperty('--el-color-primary', primaryColor)
  rootStyle.setProperty(
    '--el-color-primary-rgb',
    [primaryRgb.r, primaryRgb.g, primaryRgb.b].map(channel).join(', ')
  )

  for (let step = 1; step <= 9; step += 1) {
    const lightColor = colors[`light-${step}`]
    if (lightColor) {
      rootStyle.setProperty(`--el-color-primary-light-${step}`, lightColor)
    }
  }
  const darkColor = colors['dark-2']
  if (darkColor) {
    rootStyle.setProperty('--el-color-primary-dark-2', darkColor)
  }
}
