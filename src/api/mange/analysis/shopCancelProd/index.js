import request from "@/request/axios";
const fix = "/Mapi/M_Cancel";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Shop_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Shop_GetList`,
    method: "post",
    data: obj
  });
}
