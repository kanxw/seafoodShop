
import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/BI_GetLayout`,
    method: "get",
    params: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/BI_GetList`,
    method: "post",
    data: params
  });
}

// 数据
export function getClickCellDetail(params) {
  return request({
    url: `${fix}/BI_GetClickCellDetail`,
    method: "post",
    data: params
  });
}

