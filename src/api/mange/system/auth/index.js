import request from "@/request/axios";
const fix = "/Mapi/M_System";

// 保存权限组：0-新增；1-修改；2-删除
export function saveFuncGroup(params) {
  return request({
    url: `${fix}/System_SaveFuncGroup`,
    method: 'post',
    data: params
  })
}

// 获取权限组
export function getUserGroup(params) {
  return request({
    url: `${fix}/System_GetUserGroup`,
    method: "get",
    params: params
  });
}

// 获取权限组的权限数据
export function getUserGroupItem(params) {
  return request({
    url: `${fix}/System_GetUserGroupItem`,
    method: "get",
    params: params
  });
}

// 保存权限组的权限
export function saveUserGroupItem(params) {
  return request({
    url: `${fix}/System_SaveUserGroupItem`,
    method: 'post',
    data: params
  })
}

// 获取用户数据
export function getUser(params) {
  return request({
    url: `${fix}/System_GetUser`,
    method: 'get',
    params: params
  })
}

// 获取用户数据权限
export function getUserPower(params) {
  return request({
    url: `${fix}/System_GetUserPower`,
    method: 'get',
    params: params
  })
}

// 保存用户的数据权限
export function saveFuncUser(params) {
  return request({
    url: `${fix}/System_SaveFuncUser`,
    method: 'post',
    data: params
  })
}

// 数据限定保存
export function saveFuncUserShop(params) {
  return request({
    url: `${fix}/System_SaveFuncUserShop`,
    method: 'post',
    data: params
  })
}

// 用户权限导出
export function userPowerExport(params) {
  return request({
    url: `${fix}/UserPower_Export`,
    method: 'get',
    params: params
  })
}

// 修改密码
export function savePassword(params) {
  return request({
    url: `${fix}/SavePassword`,
    method: 'post',
    data: params
  })
}