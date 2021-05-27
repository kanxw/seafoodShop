import request from '@/request/axios'
const fix = "/Mapi/M_Struct";
const fixmini = "/Mapi/MiniKdt";

// 页面布局
export function getLayoutData(params) {
  return request({
    url: `${fix}/Base_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Base_GetList`,
    method: "post",
    data: params
  });
}

// 获取所有分析角度
export function getAnalysisAngle(params) {
  return request({
    url: `${fix}/Base_GetAnalysisAngleList`,
    method: "get",
    params: params
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

// 获取所有分析角度
export function getAnalysisAngleValue(params) {
  return request({
    url: `${fix}/Base_GetAnalysisAngleValue`,
    method: "post",
    data: params
  });
}


