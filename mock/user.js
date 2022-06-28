export default [
  {
    url: '/api/users/login',
    method: 'post',
    response: ({ params }) => {
      return {
        success: true, 
        message: '',
        data: {
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnhpbnl1ZWNoZS5jb21cL3YxXC9sb2dpblwvYWNjb3VudCIsImlhdCI6MTY1Mzg5NTU4MCwiZXhwIjoxNjkwMTgzNTgwLCJuYmYiOjE2NTM4OTU1ODAsImp0aSI6IjNiMjlNUnZkYTFMUElhWHUiLCJzdWIiOjEsInBydiI6ImY2YjcxNTQ5ZGI4YzJjNDJiNzU4MjdhYTQ0ZjAyYjdlZTUyOWQyNGQifQ.W34Acy507SIaJItXJOChMHopRA-9AAFS5nJx9BOTRRg",
          expireIn: 60 * 60 
        }
      }
    }
  },
  {
    url: '/api/user-info',
    method: 'get',
    response: ({ params }) => {
      let uid = 0
      if (uid) {
        return {
          success: true,
          message: '',
          data: {
            id: 1,
            name: '张三',
            mobile: '13888888887',
            roles: [
              {
                id: 2,
                name: 'shopManager',
                desc: '门店管理员',
                permissions: [
                  {
                    id: 1,
                    name: 'index',
                    desc: '首页',
                    permission: 'index',
                    actions: []
                  },
                  {
                    id: 2,
                    name: 'welcome',
                    desc: '欢迎页',
                    permission: 'index',
                    actions: []
                  }
                ]
              },
            ]
          }
        }
      }
      return {
        success: true,
        message: '',
        data: {
          id: 1,
          name: '尼古拉斯宝哥',
          mobile: '13888888888',
          roles: [
            {
              id: 1,
              name: 'admin',
              desc: '管理员',
              permissions: [
                {
                  id: 1,
                  name: 'index',
                  title: '首页',
                  permission: 'index',
                  actions: []
                },
                {
                  id: 2,
                  name: 'welcome',
                  title: '欢迎页',
                  permission: 'index',
                  actions: []
                },
                {
                  id: 3,
                  name: 'system',
                  title: '系统设置',
                  permission: 'system',
                  actions: []
                },
                {
                  id: 4,
                  name: 'users',
                  title: '用户管理',
                  permission: 'users',
                  actions: ['add', 'delete', 'update', 'query']
                },
                {
                  id: 5,
                  name: 'roles',
                  title: '角色管理',
                  permission: 'roles',
                  actions: ['add', 'delete', 'update', 'query']
                },
                {
                  id: 6,
                  name: 'permissions',
                  title: '权限管理',
                  permission: 'permissions',
                  actions: ['add', 'delete', 'update', 'query']
                }
              ]
            }
          ]
        }
      }
    }
  },
]