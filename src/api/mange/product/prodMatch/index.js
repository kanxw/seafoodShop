import request from '@/request/axios'
const fix = "/Mapi/M_Client";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Match_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Match_GetList`,
    method: "post",
    data: obj
  });
}

// 保存
export function matchSave(obj) {
  return request({
    url: `${fix}/Match_Save`,
    method: "post",
    data: obj
  });
}
