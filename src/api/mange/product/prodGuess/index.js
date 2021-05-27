import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";


// 样式
export function getLayoutData(params) {
  return request({
    url: `${fix}/Guess_GetLayout`,
    method: "get",
    data: params
  });
}

// 数据
export function getListData(params) {
  return request({
    url: `${fix}/Guess_GetList`,
    method: "post",
    data: params
  });
}

// 保存数据
export function saveGuess(params) {
  return request({
    url: `${fix}/Guess_Save`,
    method: "post",
    data: params
  });
}

// 查询搭配
export function searchShowCode(params) {
  return request({
    url: `${fix}/Guess_SearchShowCode`,
    method: "get",
    params
  });
}
