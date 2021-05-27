import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Shop_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Shop_GetList`,
    method: "post",
    data: obj
  });
}

/* 用户锁定/解锁
{
  "openid": "string",
  "isallowlogin": true
}
*/
export function saveUserForbidden(params) {
  return request({
    url: `/api/MiniKdt/SaveUserForbidden`,
    method: "post",
    data: params
  });
}