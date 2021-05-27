import request from '@/request/axios'
const fix = "/Mapi/M_Live";
const fixmini = "/Mapi/MiniKdt";

// 获取直播间列表
export function getRoomList(params) {
  return request({
    url: `${fix}/Push_GetRoomList`,
    method: "get",
    params: params
  });
}

// 款色、搭配、推演查询【推送前的查询】
export function getSingleProduct(params) {
  return request({
    url: `${fix}/Push_GetSingleProduct`,
    method: "get",
    params: params
  });
}

/* 款色、搭配、推演推送 
{
  "guidecode": "string",
  "guidetype": "string",
  "guidecontent": "string",
  "guesscode": "string"
}
*/
export function pushSingleProduct(params) {
  return request({
    url: `${fix}/Push_PushSingleProduct`,
    method: "post",
    data: params
  });
}

/* 移除款色、搭配推送 
{
  "id": "string", // 直播间id
  "content": "string", // 序号或搭配号
}
*/
export function pushRemoveContent(params) {
  return request({
    url: `${fix}/Push_RemoveContent`,
    method: "post",
    data: params
  });
}

/* 查看所有直播款
{
  "id": 0,
  "guesscode": "string",
  "currchatcontentid": 0
}
*/
export function getGuideContentList(params) {
  return request({
    url: `${fix}/Push_GetGuideContentList`,
    method: "post",
    data: params
  });
}

// 发送留言
export function saveLiveChatContent(params) {
  return request({
    url: `/api/Live/SaveLiveChatContent`,
    method: "post",
    data: params
  })
}

/* 获取禁言店铺
{
  id: number
}
*/
export function getBlackList(params) {
  return request({
    url: `${fix}/Push_GetBlackList`,
    method: "get",
    data: params
  });
}

/* 保存禁言店铺
{
  id: 直播间ID,
  clientcode: 多个店铺编号用逗号隔开
}
*/
export function saveBlackList(params) {
  return request({
    url: `${fix}/Push_SaveBlackList`,
    method: "post",
    data: params
  })
}

/* 导出推送款
{
  "id": number,
  "guesscode": "string",
  "currchatcontentid": 0 
}
*/
export function exportPushProduct(params) {
  return request({
    url: `${fix}/Push_ExportPushProduct`,
    method: "post",
    data: params
  })
}
/* 导出直播留言
{
  id: number
}
*/
export function exportPushChatContent(params) {
  return request({
    url: `${fix}/Push_GetGuideContentExport`,
    method: "post",
    params: params
  })
}

/* 获取订货端屏蔽推送款配置状态
{
}
*/
export function getIsHiddenLiveProduct(params) {
  return request({
    url: `${fix}/Push_GetIsHiddenLiveProduct`,
    method: "get",
    params: params
  })
}

/* 保存订货端屏蔽推送款配置状态
{
}
*/
export function saveIsHiddenLiveProduct(params) {
  return request({
    url: `${fix}/Push_SaveIsHiddenLiveProduct`,
    method: "post",
    params: params
  })
}