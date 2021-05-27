import request from '@/request/axios'
const fix = "/Mapi/M_Client";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/AgentDiscount_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/AgentDiscount_GetList`,
    method: "post",
    data: obj
  });
}

// 保存折扣
export function saveAgentDiscount(params) {
  return request({
    url: `${fix}/AgentDiscount_SaveDiscount`,
    method: "post",
    data: params
  });
}

// 复制指标
export function copyAgentDiscount(params) {
  params = {
    ...params
  };

  return request({
    url: `${fix}/AgentDiscount_Copy`,
    method: "post",
    data: params
  });
}

// 批量复制折扣
export function copyMutiDiscount(params) {
  return request({
    url: `${fix}/AgentDiscount_CopyMuti`,
    method: "post",
    data: params
  });
}
