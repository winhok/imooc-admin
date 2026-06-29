import path from 'path-browserify'
import { generateTitle } from '@/utils/i18n'

interface GenerateRoute {
  path: string
  meta?: Record<string, unknown>
  children?: GenerateRoute[]
}

export interface SearchRoute {
  path: string
  title: string[]
}

export const generateRoutes = (
  routes: GenerateRoute[],
  basePath = '/',
  prefixTitle: string[] = []
): SearchRoute[] => {
  let res: SearchRoute[] = []
  for (const route of routes) {
    const data: SearchRoute = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    if (route.meta && route.meta.title && !/\/:/.test(route.path)) {
      const i18ntitle = generateTitle(String(route.meta.title))
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
