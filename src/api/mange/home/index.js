import request from "@/request/axios";
const fix = "/Mapi/M_Index";

export const getOrderTotal = () => {
    return request({
    url: fix + "/GetOrderTotal",
    method: "get",
    params: {}
  });
};

export const getOrderTop10 = () => {
  return request({
    url: fix + "/GetOrderTop10",
    method: "get",
    params: {}
  });
};

export const getOrderStruct = columname => {
  return request({
    url: fix + "/GetOrderStruct",
    method: "get",
    params: {
      columname
    }
  });
};

export const getSystemCheck = columname => {
  return request({
    url: fix + "/SystemCheck",
    method: "post"
  });
};
