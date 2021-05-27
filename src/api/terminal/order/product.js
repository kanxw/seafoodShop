import request from "@/request/axios"

export function productList() {
    return request({
        url: '/Capi/productsbyclient',
        method: "get",
    })
}
