import request from '@/request/axios'
const fix = "/Mapi/M_Live";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Base_GetLayout`,
    method: "get",
    params: params
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

//直播间-flag: 0新增、1修改、2删除
/*
  {
    flag: "number",
    id: "number",
    roomcode: "string",
    roomname: "string",
    begtime: "string",
    endtime: "string",
    image: "string"
  }
 */
export function saveLiveRoom(params) {
  return request({
    url: `${fix}/Base_SaveLiveRoom`,
    method: "post",
    data: params
  });
}
// 直播间状态修改
/*
  {
    id: 0,
    roomstate: 0
  }
*/
export function saveRoomState(params) {
  return request({
    url: `${fix}/Base_SaveRoomState`,
    method: "post",
    data: params
  });
}
// 直播间添加在线人数
/* 
{
  id: 0,
  onlinecount: 0
}
 */
export function saveOnLineCount(params) {
  return request({
    url: `${fix}/Base_SaveOnLineCount`,
    method: "post",
    data: params
  });
}
// 获取直播间限制的店铺
/*
{
  id: number
}
*/
export function getAllowShop(params){
  return request({
    url: `${fix}/Base_GetAllowShop`,
    method: "get",
    params: params
  });
}

// 保存直播间限制店铺
/*
  {
    id: 0,
    islimit: true,
    clientcode: "string"
  }
*/
export function saveAllowShop(params) {
  return request({
    url: `${fix}/Base_SaveAllowShop`,
    method: "post",
    data: params
  });
}

// 直播间查看推流地址
/*
  id: number
*/
export function getPushUrl(params) {
  return request({
    url: `${fix}/Base_GetPushUrl`,
    method: "get",
    params: params
  });
}

//直播间设置播放域名
/*
  {
    playdomain: "string"
  }
*/
export function getOrSavePlayDomain(params) {
  return request({
    url: `${fix}/Base_GetOrSavePlayDomain`,
    method: "post",
    data: params
  });
}

// 获取回放列表
/*
  {
    id: "number"
  }
*/
export function getPlayBack(params) {
  return request({
    url: `${fix}/Base_GetPlayBack`,
    method: "get",
    params: params
  });
}
// 保存回放列表
/*
  [
    {
      "id": 0,
      "videourl": "string",
      "videoname": "string",
      "isshow": true
    }
  ]
*/
export function savePlayBack(params) {
  return request({
    url: `${fix}/Base_SavePlayBack`,
    method: "post",
    data: params
  });
}