import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Survey_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Survey_GetList`,
    method: "post",
    data: params
  });
}

// 保存调查
export function saveSurvey(params) {
  return request({
    url: `${fix}/Survey_Save`,
    method: "post",
    data: params
  });
}
