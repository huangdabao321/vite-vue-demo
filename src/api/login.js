import request from '@/utils/request'

export function login(params) {
  return request({
    method: 'POST',
    url: '/users/login',
    data: params
  })
}