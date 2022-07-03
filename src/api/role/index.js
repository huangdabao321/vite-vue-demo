import request from '@/utils/request'

export function getRoles(params) {
  return request({
    method: 'GET',
    url: '/roles',
    params
  })
}

export function getRoleList(params) {
  return request({
    method: 'GET',
    url: '/roles/list',
    params
  })
}