import request from "@/request/axios";
const fix = "/Mapi/M_Print";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/OrderMain_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/OrderMain_GetList`,
    method: "post",
    data: params
  });
}

// 保存订单状态
export function saveOrderState(params) {
  return request({
    url: `${fix}/OrderMain_SaveOrderState`,
    method: "post",
    data: params
  });
}

// 获取订单打印模板下拉框内容
export function getPrintLayout(params) {
  return request({
    url: `${fix}/OrderMain_GetPrintLayout`,
    method: "get",
    params
  });
}

// 获取订单打印明细
export function getOrderDetail(params) {
  return request({
    url: `${fix}/OrderMain_GetOrderDetail`,
    method: "get",
    params
  });
}

// 保存打印模板
export function savePrintLayout(params) {
  params = {
    UserCode: '',
    ...params,
  }

  return request({
    url: `${fix}/OrderMain_SavePrintLayout`,
    method: "post",
    data: params
  });
}

// 打印设置-可选打印字段
export function getPrintColumns(params) {
  return request({
    url: `${fix}/OrderMain_GetPrintColumns`,
    method: "get",
    params
  });
}

// 导出订单明细
export function exportOrderInfoForModelToExcel(params) {
  return request({
    url: `${fix}/OrderInfoForModelToExcel`,
    method: "get",
    params
  });
}

// 发送电子邮件
export function sendEmail(params) {
  return request({
    url: `${fix}/OrderMain_SendMail`,
    method: "post",
    data: params
  });
}

// 获取自定义字段
export function getCombineFieldInfo(params) {
  return request({
    url: `${fix}/OrderMain_GetCombineFieldInfo`,
    method: "get",
    params
  });
}

// 获取高级打印地址
export function getPrintUrl() {
  return request({
    url: `${fix}/GetPrintUrl`,
    method: "get"
  });
}

// 保存模板排序
export function saveLayoutInfoForUser(params) {
  return request({
    url: `${fix}/OrderMain_SaveLayoutInfoForUser`,
    method: 'post',
    data: params
  })
}



