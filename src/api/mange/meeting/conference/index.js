import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Khy_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Khy_GetList`,
    method: "post",
    data: obj
  });
}