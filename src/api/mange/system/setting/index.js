import request from "@/request/axios";
 import { getters } from "@/store/getters";
const fix = "/Mapi/M_System";

// 获取配置信息
export function getPublicConfig(params) {
  return request({
    url: `${fix}/System_GetPublicConfig`,
    method: "get",
    data: params
  });
}

// 保存配置
export function savePublicConfig(params) {
  return request({
    url: `${fix}/System_SavePublicConfig `,
    method: 'post',
    data: params
  })
}

// 调用后台接口向管理员发送验证码
export function checkPhone(params) {
  return request({
    url: `${fix}/CheckPhone `,
    method: 'get',
    params: params
  })
}

/* 数据初始化接口
{
  code：输入手机验证码,
  tablename：["baseclient,baseclientshop","baseclient,baseclientshop"]（加密的，需要后端解密）,
}
*/
export function initTruncateTable(params) {
  return request({
    url: `${fix}/Init_TruncateTable`,
    method: 'post',
    data: params
  })
}

/* 系统配置导出
{
}
*/
export function exportPublicConfig(params) {
  return request({
    url: `${fix}/PublicConfig_Export`,
    method: 'get',
    params: params
  })
}

/**
 * 获取场次号
 */
export function getMeetingCode() {
  return request({
    url: `${fix}/Init_GetMeetingCode`,
    method: 'get',
  })
}

/**
 * 同步基础资料
 * @param {Object} params
 * {
 *  meetingcode: 选择的场次编号
 *  isconfig: 是否同步系统配置
 *  ispower: 是否同步权限管理
 *  isclient: 是否同步店铺资料
 * } 
 */
export function initDataSync(params) {
  return request({
    url: `${fix}/Init_DataSync`,
    method: 'post',
    data: params
  })
}

// 获取小程序码
export async function getWxQrCode() {
  let meetingcode = getters({ name: "meetingcode" });
  if (!meetingcode) {
    let response = await getMeetingCode();
    if (response.errormsg === '') {
      meetingcode = response.data;
      setStore({
        name: "meetingcode",
        content: meetingcode,
        type: "session",
      });
    }
  }

  return request({
    url: `/api/WeiXin/Getwxacodeunlimit`,
    params: {
      meetingcode
    }
  })
}

/**
 * 自定义首页配置限定数据
 */
export function getCustomHomeModuleLimitData() {
  return request({
    url: `${fix}/IndexSetting_GetLayout`,
    method: 'get',
  })
}

/**
 * 系统授权
 * @param {Object} params 
 * {
 *  authorizemsg: String
 * }
 */
export function saveAuthorize(params) {
  return request({
    url: `${fix}/SaveAuthorize`,
    method: 'post',
    data: params
  })
}

// 获取系统授权信息
export function getAuthorize() {
  return request({
    url: `${fix}/GetAuthorize`,
    method: 'get',
  })
}

/**
 * 备份当前场次对应的数据库
 * @param {Object} params 参数
 * {
 *  taskid: 请求id
 * }
 */
export function BackUpCurDB(params) {
  return request({
    url: `${fix}/BackUp_CurDB`,
    method: 'get',
    params,
    noMessage: true
  })
}

