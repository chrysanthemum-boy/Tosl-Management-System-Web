import request from '@/utils/request'

export function getMessage(id) {
  return request({
    url: '/message/all',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function loadMessage() {
  return request({
    url: '/message',
    method: 'get'
  })
}

export function setMessage(message_id, user_id, user_name, message, send_to) {
  return request({
    url: '/message/set',
    method: 'post',
    data: {
      message_id,
      user_id,
      user_name,
      message,
      send_to
    }
  })
}

export function delAllMessage() {
  return request({
    url: '/message/del',
    method: 'delete'
  })
}
