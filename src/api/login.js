/**
 * article模块接口列表
 */
import request from '@/request/axios'; // 导入http中创建的axios实例

export function clientlogin(params){
    return request({
        url: '/Capi/login',
        method: "post",
        headers: {
            isToken: false
        },
        data: params
    })
}

export function mangelogin(params){
    return request({
        url: "/Mapi/M_Login/UserLogin",
        method: "post",
        headers: {
            isToken: false
        },
        data: params
    })
}
