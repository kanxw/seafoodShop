import request from '@/request/axios'
const fix = "/Mapi/M_Client";
const fixmini = "/Mapi/MiniKdt";



export function shopLayout(){
    return request({
        url: fix + '/Shop_GetLayout',
        method: "get",
    })
}

export function shopSearch(){
    return request({
        url: fix + '/Shop_GetLayout',
        method: "get",
    })
}

export function getShopList(params){
    return request({
        url: fix + '/Shop_GetList',
        method: "post",
        data: params
    })
}

export function setShoPoperation(params) {
    return request({
        url: fix + '/Shop_SaveIsEnable',
        method: 'post',
        data: params,
    })
}
export function getUserID(params) {
    return request({
        url: fix + '/Shop_GetEdit',
        method: 'get',
        params: params
    })
}

export function   getShopForbidden(params) {
    return request({
        url: fixmini + '/GetShopForbidden',
        method: 'get',
        params: params
    })
}
