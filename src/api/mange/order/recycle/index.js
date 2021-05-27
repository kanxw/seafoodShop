import request from "@/request/axios";
const fix = "/Mapi/M_Order";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Recycle_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Recycle_GetList`,
    method: "post",
    data: obj
  });
}

// 订单恢复
export function recycle_OrderRecover(obj) {
  return request({
    url: `${fix}/recycle_OrderRecover`,
    method: "post",
    data: obj
  });
}
