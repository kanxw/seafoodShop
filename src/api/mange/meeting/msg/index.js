import request from '@/request/axios'
const fix = "/Mapi/M_Meeting";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Msg_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Msg_GetList`,
    method: "post",
    data: obj
  });
}

// 新建通知
export function saveMsg(params) {
  return request({
    url: `${fix}/Msg_SaveMsg`,
    method: "post",
    data: params
  });
}

// 获取企业微信通知模板 
export function get_QY_MsgTemplate(params) {
  return request({
    url: `${fix}/Msg_Template_GetLayout`,
    method: 'get',
    params
  })
}

// 企业微信历史通知
export function Get_QY_HistoryListData(params) {
  return request({
    url: `${fix}/MsgHisSend_GetList`,
    method: 'get',
    params
  })
}

// 企业微信通知状态切换
export function Get_QY_EditSendState(params) {
  return request({
    url: `${fix}/Msg_EditSendState`,
    method: 'get',
    params
  })
}
