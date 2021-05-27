import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Inventory_GetLayout`,
    method: "get",
    params: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Inventory_GetList`,
    method: "post",
    data: params
  });
}

// 新增、编辑、删除库存
export function saveInventory(params) {
  return request({
    url: `${fix}/Inventory_SaveInventory`,
    method: "post",
    data: params
  });
}

// 获取货品信息
export function getProductInfo(params) {
  return request({
    url: `${fix}/GetProductInfo`,
    method: "get",
    params: params
  });
}
