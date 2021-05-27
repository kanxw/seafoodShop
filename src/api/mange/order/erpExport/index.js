import request from "@/request/axios";
const fix = "/Mapi/M_Order";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/ERPOrder_GetLayout`,
    method: "get",
    params: params
  });
}

// erp导出
export function exportERP(params) {
  return request({
    url: `${fix}/ERPOrder_Export`,
    method: "post",
    data: params
  });
}

// 获取erp模板
export function getERPOrderTemplate(params) {
  return request({
    url: `${fix}/ERPOrder_Template`,
    method: "get",
    params: params
  });
}

// 删除erp模板
export function deleteERPTemplate(params) {
  return request({
    url: `${fix}/ERPOrder_DelTemplate`,
    method: "post",
    params: params
  });
}
