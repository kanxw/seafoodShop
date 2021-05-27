import request from '@/request/axios'
const fix = "/Mapi/M_Client";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
    return request({
      url: `${fix}/OrderDeposit_GetLayout`,
      method: "get",
      data: params
    });
  }
  
  // 数据
  export function getListData(params) {
    return request({
      url: `${fix}/OrderDeposit_GetList`,
      method: "post",
      data: params
    });
  }
  
  export function getOrSaveDetail(params) {
    return request({
      url: `${fix}/OrderDeposit_GetOrSaveDetail`,
      method: "post",
      data: params
    })
  }
  
  // 打印收据样式
  export function getReceiptLayoutData(params) {
    return request({
      url: `${fix}/PrintReceipt_GetLayout`,
      method: "get",
      data: params
    });
  }
  
  // 打印收据数据
  export function getReceiptListData(params) {
    return request({
      url: `${fix}/PrintReceipt_GetList`,
      method: "post",
      data: params
    });
  }
  
  // 查询收款账户信息
  export function getPayInfo(params) {
    return request({
      url: `${fix}/OrderDeposit_GetPayInfo`,
      method: "get",
      params: params
    })
  }
  
  // 保存收款账户信息
  /*
    params: {
    }
  */
  export function savePayInfo(params) {
    return request({
      url: `${fix}/OrderDeposit_SavePayInfo`,
      method: "post",
      data: params
    })
  }