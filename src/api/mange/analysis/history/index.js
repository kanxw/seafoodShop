import request from "@/request/axios";
const fix = "/Mapi/M_Order";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/History_GetLayout`,
    method: "get",
    params: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/History_GetList`,
    method: "post",
    data: params
  });
}

// 保存分析角度
export function saveAnalysisAngle(params) {
  return request({
    url: `${fix}/Base_SaveAnalysisAngle`,
    method: "post",
    params: params
  });
}

// 删除自定义分析角度
export function deleteAnalysisAngle(params) {
  return request({
    url: `${fix}/Base_DeleteAnalysisAngle`,
    method: "post",
    data: params
  });
}