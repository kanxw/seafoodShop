
import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
    return request({
      url: `${fix}/Infer_GetLayout`,
      method: "get",
      params: obj
    });
  }
  
  // 数据
  export function getListData(obj) {
    return request({
      url: `${fix}/Infer_GetList`,
      method: "post",
      data: obj
    });
  }
  
  // 查询批次推演状态
  export function getBatchInfo(obj) {
    return request({
      url: `${fix}/Infer_GetBatchInfo`,
      method: "get",
      params: obj
    });
  }
  
  // 保存批次推演状态
  export function saveBatchInfo(obj) {
    return request({
      url: `${fix}/Infer_SaveBatchInfo`,
      method: "post",
      data: obj
    });
  }
  
  /**
   * 查询离线店铺
   * @param {Object} obj 参数
   */
  export function getOffLiveShop(obj) {
    return request({
      url: `${fix}/Infer_GetOffLiveShop`,
      method: "post",
      data: obj
    });
  }
  