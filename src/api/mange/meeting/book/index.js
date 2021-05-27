import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Book_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Book_GetList`,
    method: "post",
    data: obj
  });
}

export function saveBook(obj) {
  return request({
    url: `${fix}/Book_Save`,
    method: "post",
    data: obj
  });
}
