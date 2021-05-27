import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Show_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Show_GetList`,
    method: "post",
    data: params
  });
}

// 判断搭配号是否可用
export function getIsExistsShowCode(params) {
  return request({
    url: `${fix}/Show_IsExistsShowCode`,
    method: "get",
    params: params
  });
}

// 查询货品
export function getProdShowSKU(params) {
  return request({
    url: `${fix}/Show_SearchSKU`,
    method: "get",
    params: params
  });
}

// 保存搭配
export function saveProductShow(params) {
  return request({
    url: `${fix}/Show_SaveProductShow`,
    method: "post",
    data: params
  });
}

// 查询搭配资料
export function getProductShowByShowCode(params) {
  return request({
    url: `${fix}/Show_GetProductShowByShowCode`,
    method: "get",
    params: params
  });
}





