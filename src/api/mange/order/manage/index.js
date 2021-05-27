import request from "@/request/axios";
const fix = "/Mapi/M_Order";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Base_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Base_GetList`,
    method: "post",
    data: params
  });
}

//多单合并复制 判断店铺是否存在
export function getIsClientIsExist(params) {
  return request({
    url: `${fix}/Base_IsClientIsExist`,
    method: "post",
    data: params
  });
}

//多单合并复制 判断店铺是否存在
export function getOrderByClientCode(params) {
  return request({
    url: `${fix}/Base_GetOrderByClientCode`,
    method: "post",
    data: params
  });
}

//多单合并复制
export function clientOrderCopyMuti(params) {
  return request({
    url: `${fix}/Base_ClientOrderCopyMuti`,
    method: "post",
    data: params
  });
}

// 删除订单
export function deleteOrderAndBackup(obj) {
  return request.all(
    obj.map(item => {
      return request({
        url: `${fix}/Base_DeleteOrderAndBackup`,
        method: "post",
        data: { ordernos: item["orderno"] }
      }).then(response => {
        return `${item["shop"]}：${response.data}`;
      });
    })
  );
}

// 获取客户层级
export function getClientLevel(params) {
  return request({
    url: `${fix}/OutPut_GetClientLevel`,
    method: "get",
    params
  });
}

// 下载模板（订单导出）
export function orderExport(params) {
  return request({
    url: `${fix}/OutPut_Export`,
    method: "post",
    data: params
  });
}

// 订单新增 / 修改
export function getEditOrder(params) {
  return request({
    url: `${fix}/Base_GetEditOrder`,
    method: "post",
    data: params
  });
}

// 订单保存
export function saveEditOrder(params) {
  return request({
    url: `${fix}/Base_SaveEditOrder`,
    method: "post",
    data: params
  });
}