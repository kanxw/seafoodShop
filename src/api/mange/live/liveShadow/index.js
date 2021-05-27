import request from '@/request/axios'
const fix = "/Mapi/M_Live";
const fixmini = "/Mapi/MiniKdt";

// 获取讲解货品数据
/*
{
  guidecode: "string",
  currchatcontentid: number
}
*/
export function getGuideOrder(params) {
  return request({
    url: `${fix}/Shadow_GetGuideOrder`,
    method: "post",
    data: params
  });
}

// 获取倒计时配置
export function getCountDown(params) {
  return request({
    url: `${fix}/Shadow_GetCountDown`
  })
}

// 保存倒计时配置
export function saveCountDown(params) {
  return request({
    url: `${fix}/Shadow_SaveCountDown`,
    method: 'post',
    data: params
  })
}