import request from '@/request/axios'
const fix = "/Mapi/M_Live";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Shop_GetLayout`,
    method: "get",
    params: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Shop_GetList`,
    method: "post",
    data: params
  });
}

// 查看聊天记录
export function getShopChat(params) {
  return request({
    url: `${fix}/Shop_GetShopChat`,
    method: "post",
    data: params
  });
}
