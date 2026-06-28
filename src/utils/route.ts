import path from 'path-browserify'

interface MenuRoute {
  path: string
  meta?: Record<string, unknown>
  children?: MenuRoute[]
}

const getChildrenRoutes = (routes: MenuRoute[]): MenuRoute[] => {
  const result: MenuRoute[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

export const filterRouters = <T extends MenuRoute>(routes: T[]): T[] => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data: unknown): boolean {
  if (!data) return true
  if (typeof data === 'object') return Object.keys(data).length === 0
  return false
}

export function generateMenus(routes: MenuRoute[], basePath = ''): MenuRoute[] {
  const result: MenuRoute[] = []
  routes.forEach((item) => {
    if (isNull(item.meta) && isNull(item.children)) return
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children!, basePath))
      return
    }
    const routePath = path.resolve(basePath, item.path)
    let route = result.find((menu) => menu.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta?.icon && route.meta?.title) {
        result.push(route)
      }
    }
    if (item.children) {
      route.children!.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
