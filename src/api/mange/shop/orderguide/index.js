import request from '@/request/axios'
const fix = "/Mapi/M_Client";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Guide_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Guide_GetList`,
    method: "post",
    data: obj
  });
}

/* 导出
{
  taskid：第一次请求taskid为空，然后后面的轮询带第一次请求返回的taskid
  clientcode：要导出的店铺编号（多店用逗号隔开）
}
*/
export function guideMultiExport(params) {
  return request({
    url: `${fix}/Guide_MultiExport`,
    method: "post",
    data: params
  });
}
