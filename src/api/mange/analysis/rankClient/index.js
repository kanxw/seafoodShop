import request from "@/request/axios";
const fix = "/Mapi/M_Rank";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/shop_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/shop_GetList`,
    method: "post",
    data: obj
  });
}
