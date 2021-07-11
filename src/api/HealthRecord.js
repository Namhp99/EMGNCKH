import request from '@/utils/requestNCKH'

export function GetHealthInfo(data) {
  return request({
    url: 'HealthRecord/GetHealthInfo',
    method: 'post',
    data
  })
}
export function GetHealthHistory(data) {
  return request({
    url: 'HealthRecord/GetHealthHistory',
    method: 'post',
    data
  })
}
