import request from '@/request/axios'

export const getLayout = () => {
  return request({
    url: '/Mapi/M_Struct/Pivot_GetLayout',
    method: 'get',
    params: {
    }
  })
}

export const getData = (params) => {
  return request({
    url: '/Mapi/M_Struct/Pivot_GetList',
    method: "post",
    data: params
  });
}