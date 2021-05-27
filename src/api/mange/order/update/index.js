import request from "@/request/axios";
const fix = "/Mapi/M_Order";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/MutiEdit_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/MutiEdit_GetList`,
    method: "post",
    data: params
  });
}

// 编辑订单样式
export function getMutiEditLayoutData(params) {
  return request({
    url: `${fix}/MutiEditForEdit_GetLayout`,
    method: "get",
    data: params
  });
}

// 编辑订单数据
export function getMutiEditListData(params) {
  return request({
    url: `${fix}/MutiEditForEdit_GetList`,
    method: "post",
    data: params
  });
}

/**
 * 保存订单数据
 * @param {Object} params 
 * [
 *  {
 *    key1: 行key1,
 *    key2: 行key2,
 *    sizename: 尺码名称,
 *    qty: 订量
 *  }
 * ]
 */
export function saveEdit(params) {
  return request({
    url: `${fix}/MutiEditForEdit_SaveEdit`,
    method: "post",
    data: params
  });
}

/**
 * 批量删除
 * @param {Object} params 
 * {
 *  key: key,
 *  sizename: 尺码名称
 * }
 */
export function deleteQty(params) {
  return request({
    url: `${fix}/MutiEdit_Delete`,
    method: "post",
    data: params
  });
}

/**
 * 款色转移保存（尺码保存）
 * @param {Object} params 
 * {
 *  key: key,
 *  sizename: 旧的尺码名称,
 *  sizenamenew: 新的尺码名称
 * }
 */
export function convertSizeName(params) {
  return request({
    url: `${fix}/MutiEdit_ConvertSizeName`,
    method: "post",
    data: params
  });
}

/**
 * 款色转移（款号搜索）
 * @param {Object} params 
 * {
 *  key: key
 * }
 */
export function convertSKUGetLayout(params) {
  return request({
    url: `${fix}/MutiEdit_ConvertSKU_GetLayout`,
    method: "post",
    data: params
  });
}

/**
 * 款色转移保存（款号保存）
 * @param {Object} params 
 * @param {Boolean} noMessage
 * {
 *  key: key,
 *  keynew: keynew,
 *  ispass: false | true 如果抛出错误提示包含：是否继续，则把值改成true再进行确认交互
 * }
 */
export function convertSKUSave(params, noMessage) {
  return request({
    url: `${fix}/MutiEdit_ConvertSKU_Save`,
    method: "post",
    data: params,
    noMessage
  });
}