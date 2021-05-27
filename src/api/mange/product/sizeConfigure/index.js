import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Size_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Size_GetList`,
    method: "post",
    data: obj
  });
}

// 新增、编辑、删除尺码组
export function saveSize(params) {
  return request({
    url: `${fix}/Size_SaveSize`,
    method: "post",
    data: params
  });
}

// 获取尺码组包含的款数
export function getSizeSkInfo(params) {
  return request({
    url: `${fix}/Size_SKInfo`,
    method: "get",
    params: params
  })
}