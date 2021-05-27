import request from "@/request/axios";
const fix = "/Mapi/M_Rank";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Guess_GetLayout`,
    method: "get",
    params: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Guess_GetList`,
    method: "post",
    data: params
  });
}
