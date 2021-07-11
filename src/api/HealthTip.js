import request from '@/utils/requestNCKH'

export function AddHealthTip(data) {
  return request({
    url: 'HealthTip/AddHealthTip',
    method: 'post',
    data
  })
}

export function GetHealthTip(data) {
  return request({
    url: 'HealthTip/GetHealthTip',
    method: 'post',
    data
  })
}
export function UpdateHealthTip(data) {
  return request({
    url: 'HealthTip/UpdateHealthTip',
    method: 'post',
    data
  })
}
export function DelHealthTip(data) {
  return request({
    url: 'HealthTip/DelHealthTip',
    method: 'post',
    data
  })
}
