import request from '@/utils/requestNCKH'

export default function GetDefaultValue(data) {
    return request({
      url: 'DefaultValue/GetDefaultValue',
      method: 'post',
      data
    })
  }
  