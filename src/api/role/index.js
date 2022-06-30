import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    method: 'GET',
    url: '/roles',
    params
  })
}