import request from '@/utils/request'

export function getPermissions(params) {
  return request({
    method: 'get',
    url: '/permissions',
    params: params
  })
}