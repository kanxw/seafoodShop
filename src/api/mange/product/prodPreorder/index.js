import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/PreOrder_GetLayout`,
    method: "get",
    params: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/PreOrder_GetList`,
    method: "post",
    data: params
  });
}

// 0-新增，1-修改，2-删除
export function savePreOrder(params) {
  return request({
    url: `/api/M_Order/DetailTemp_SaveDetailTemp`,
    method: "post",
    data: params
  });
}

// 查询货品
export function getPreOrderByProdcode(params) {
  return request({
    url: `${fix}/GetPreOrderByProdcode`,
    method: "get",
    params: params
  });
}
