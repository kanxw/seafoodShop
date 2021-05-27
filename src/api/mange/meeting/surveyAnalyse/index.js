import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/SurveyAnalyse_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/SurveyAnalyse_GetList`,
    method: "post",
    data: params
  });
}