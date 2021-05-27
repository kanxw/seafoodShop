import request from "@/request/axios";
const fix = "/Mapi/M_Struct";

export const getLayoutData = () => {
    return request({
      url: `${fix}/ProdChat_GetLayout`,
      method: 'get',
      params: {
      }
    })
  }
  
  export const getListData = (params) => {
    return request({
      url: `${fix}/ProdChat_GetList`,
      method: "post",
      data: params
    });
  }

  export const exportProdChat = (params) => {
    
  }
  