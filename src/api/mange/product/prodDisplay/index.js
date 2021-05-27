import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Display_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Display_GetList`,
    method: "post",
    data: obj
  });
}

// 判断搭配号是否可用
export function getIsExistsDisplayCode(params) {
  return request({
    url: `${fix}/Display_IsExistsDisplayCode`,
    method: "get",
    params: params
  });
}

// 查询货品
export function getProdDisplaySKU(params) {
  return request({
    url: `${fix}/Display_SearchSKU`,
    method: "get",
    params: params
  });
}

// 保存搭配
export function saveProductDisplay(params) {
  return request({
    url: `${fix}/Display_SaveProductDisplay`,
    method: "post",
    data: params
  });
}

// 查询搭配资料
export function getProductDisplayByDisplayCode(params) {
  return request({
    url: `${fix}/Display_GetProductDisplayByDisplayCode`,
    method: "get",
    params: params
  });
}
