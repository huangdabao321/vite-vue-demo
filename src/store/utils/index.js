import { getPermissions } from "@/api/permission";
import { constantRouterComponents, notFoundRouter } from '@/router'

export function generateDynamicRouter() {
  return new Promise((resolve, reject) => {
    getPermissions().then(res => {
      const { data } = res
      const menuNav = []
      listToTree(data, menuNav, 0)
      const routers = generator(menuNav)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

export function filterAsyncRouter(routes, roles) {
  const accessedRouters = routes.filter((route) => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

export function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false;
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
}

export function listToTree(list, tree, parentId) {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.pid === parentId) {
      const child = {
        ...item,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}

export function generator(routerMap) {
  return routerMap.map(item => {
    const currentRouter = {
      id: item.id,
      parentId: item.pid,
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: constantRouterComponents[item.component],

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.title,
        // icon: iconfont[item.icon] || item.icon,
        target: reg.test(item.path) ? '_blank' : '',
        permission: [item.permission],
        keepAlive: item.keepAlive,
        hiddenInMenu: item.hiddenInMenu
      },
      hidden: item.hidden
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children)
    }

    return currentRouter
  })
}

const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\\/])+$/
