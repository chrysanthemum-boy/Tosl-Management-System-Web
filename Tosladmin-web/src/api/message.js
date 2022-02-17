import request from '@/utils/request'

export function getMessage(id) {
  return request({
    url: 'message/all',
    method: 'get',
    params: {
      id: id
    }
  })
}
