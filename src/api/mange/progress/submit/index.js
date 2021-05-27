import request from "@/request/axios";
const fix = "/Mapi/M_Process";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/OrderState_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/OrderState_GetList`,
    method: "post",
    data: obj
  });
}

// 查询已交单、未交单、未订货店铺数
export function getStateShop(obj) {
  return request({
    url: `${fix}/OrderState_GetShop`,
    method: "post",
    data: obj
  });
}
