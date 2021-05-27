import request from "@/request/axios";
const fix = "/Mapi/M_Log";

/**
 * 保存菜单点击日记
 * @param {Object} params 
 * {
 *  menu: 菜单名称
 *  second: 时长
 * }
 */
export function saveLog(params) {
  return request({
    url: `${fix}/Menu_SaveLog`,
    method: "post",
    data: params,
    noMessage: true
  });
}

export async function saveLogAwait(params) {
  return await request({
    url: `${fix}/Menu_SaveLog`,
    method: "post",
    data: params,
    noMessage: true,
  });
}

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Menu_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Menu_GetList`,
    method: "post",
    data: obj
  });
}
