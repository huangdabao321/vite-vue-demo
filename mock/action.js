export default [
  {
    url: '/api/actions',
    method: 'get',
    response: ({ params }) => {
      return {
        success: true, 
        message: '',
        data: [
          {
            id: 1,
            name: 'add',
            desc: '新增'
          },
          {
            id: 2,
            name: 'del',
            desc: '删除'
          },
          {
            id: 3,
            name: 'update',
            desc: '更新'
          },
          {
            id: 4,
            name: 'query',
            desc: '查询'
          },
        ]
      }
    }
  },

]