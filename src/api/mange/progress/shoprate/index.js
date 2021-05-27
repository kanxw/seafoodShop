import request from "@/request/axios";
const fix = "/Mapi/M_Process";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/OrderFinish_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/OrderFinish_GetList`,
    method: "post",
    data: obj
  });
}
