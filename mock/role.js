export default [
  {
    url: '/api/roles',
    method: 'get',
    response: ({ params }) => {
      return {
        success: true, 
        message: '',
        data: [
          {
            id: 1,
            name: 'admin',
            desc: '管理员',

          },
          {
            id: 2,
            name: 'shopManager',
            desc: '门店管理员',
          },
        ]
      }
    }
  }
]