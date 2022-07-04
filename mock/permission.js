export default [
  {
    url: '/api/permissions',
    method: 'get',
    response: ({ params }) => {
      return {
        success: true, 
        message: '',
        data: [
          {
            id: 1,
            name: 'index',
            pid: 0,
            path: '/',
            component: 'BaseLayout',
            title: '首页',
            icon: '',
            permission: 'index',
            hiddenInMenu: false,
            hidden: false,
            redirect: '/welcome',
            actions: [

            ]
          },
          {
            id: 2,
            name: 'welcome',
            pid: 1,
            path: '/welcome',
            component: 'Welcome',
            title: '欢迎页',
            icon: 'SmileOutlined',
            permission: 'index',
            hiddenInMenu: false,
            hidden: false,
            redirect: '',
            actions: []

          },
          {
            id: 3,
            name: 'system',
            pid: 1,
            path: '/system',
            component: 'RouterView',
            title: '系统设置',
            icon: 'Settingoutlined',
            permission: 'system',
            hiddenInMenu: false,
            hidden: false,
            redirect: '/users',
            actions: []
          },
          {
            id: 4,
            name: 'users',
            pid: 3,
            path: '/users',
            component: 'Users',
            title: '用户管理',
            icon: '',
            permission: 'users',
            hiddenInMenu: false,
            hidden: false,
            actions: [
              {
                id: 1,
                name: 'query',
                desc: '查询'
              },
              {
                id: 2,
                name: 'add',
                desc: '新建'
              },
              {
                id: 3,
                name: 'del',
                desc: '删除'
              },
            ]
          },
          {
            id: 5,
            name: 'roles',
            pid: 3,
            path: '/roles',
            component: 'Roles',
            title: '角色管理',
            icon: '',
            permission: 'roles',
            hiddenInMenu: false,
            hidden: false,
            redirect: '',
            actions: []
          },
          {
            id: 6,
            name: 'permissions',
            pid: 3,
            path: '/permissions',
            component: 'Permissions',
            title: '权限管理',
            icon: '',
            permission: 'permissions',
            hiddenInMenu: false,
            hidden: false,
            redirect: '',
            actions: []
          },
        ]
      }
    }
  },

]