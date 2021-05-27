import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Property_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Property_GetList`,
    method: "post",
    data: obj
  });
}

// 新增，修改，删除
export function property_SaveProperty(obj) {
  return request({
    url: `${fix}/Property_SaveProperty`,
    method: "post",
    data: obj
  });
}
