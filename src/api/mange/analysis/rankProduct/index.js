import request from '@/request/axios'
const fix = "/Mapi/M_Rank";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Product_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Product_GetList`,
    method: "post",
    data: params
  });
}

//投影大屏数据
export function getOrderScreen(params) {
  return request({
    url: `${fix}/Product_GetOrderScreen`,
    method: "get",
    params: params
  });
}

//投影大屏(返回下拉的属性)
export function getFlag(params) {
  return request({
    url: `${fix}/Product_GetFlag`,
    method: "get",
    data: params
  });
}

// 投影大屏(返回属性的值)
export function getOrderFlagValue(params) {
  return request({
    url: `${fix}/Product_GetOrderFlagValue`,
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

// 已订店铺数
export function getOrderShopList(params) {
  return request({
    url: `${fix}/GetOrderShopList`,
    method: "post",
    data: params
  });
}

// 导出excel
export function exportByTask(params, taskid, isExportImg) {
  let name = isExportImg ? 'Product_ExportByTask' : 'Product_Export';
  taskid = isExportImg ? taskid : '';
  return request({
    url: `${fix}/${name}${taskid}`,
    method: "post",
    data: params
  });
}