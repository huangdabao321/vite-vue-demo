import request from '@/utils/request'

export function getUserDetail(params) {
  return request({
    method: 'get',
    url: '/user-info',
    params: params
  })
}

export function getUserList(params) {
  return request({
    method: 'get',
    url: '/users/list',
    params: params
  })
}