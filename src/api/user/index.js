import request from '@/utils/request'

export function getUserDetail(params) {
  return request({
    method: 'get',
    url: '/user-info',
    params: params
  })
}