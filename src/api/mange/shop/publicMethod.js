import request from '@/request/axios';
const fix = "/Mapi/M_Client";
const fixmini = "/Mapi/MiniKdt";
const pro = "/Mapi/M_Product";
const order = "/Mapi/M_Order"

export function GetDropDownList(params) {
    return request({
        url: pro + '/Base_GetDropDownList',
        method: 'get',
        params: params
    })
}

export function GetClientLevel(params) {
    return request({
        url: order + '/OutPut_GetClientLevel',
        method: 'get',
        params: params
    })
}

export function levelLayout() {
    return request({
        url: fix + '/Level_GetLayout',
        method: 'get',
    })
}

export function levelGetList(params) {
    return request({
        url: fix + '/Level_GetList',
        method: 'post',
        data: params
    })
    
}