import request from '@/utils/request'

export function getMessage(id) {
  return request({
    url: 'http://localhost:8000/message/all',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function loadMessage() {
  return request({
    url: 'http://localhost:8000/message',
    method: 'get'
  })
}

export function setMessage(message_id, user_id, user_name, message, send_to) {
  return request({
    url: 'https://106.14.35.94:8000/message/set',
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
    url: 'http://localhost:8000/message/del',
    method: 'delete'
  })
}
