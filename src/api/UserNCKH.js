import request from '@/utils/requestNCKH'

export default function UserLogin(data) {
  return request({
    url: 'User/UserLogin',
    method: 'post',
    data
  })
}
export function ChangePassword(data) {
  return request({
    url: 'User/ChangePassword',
    method: 'post',
    data
  })
}
export function GetUserInfo(data) {
  return request({
    url: 'User/GetUserInfo',
    method: 'post',
    data
  })
}
export function GetRelative(data) {
  return request({
    url: 'User/GetRelative',
    method: 'post',
    data
  })
}
