import request from '@/utils/request'

export function getActions(params) {
  return request({
    url: '/actions',
    method: 'get',
    params
  })
}