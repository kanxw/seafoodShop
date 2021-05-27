import request from '@/request/axios'
const fix = "/Mapi/M_Product";
const fixmini = "/Mapi/MiniKdt";

// 样式
export function getLayoutData(obj) {
  return request({
    url: `${fix}/Base_GetLayout`,
    method: "get",
    data: obj
  });
}

// 数据
export function getListData(obj) {
  return request({
    url: `${fix}/Base_GetList`,
    method: "post",
    data: obj
  });
}

// 图片上传
export function uploadImage(obj, onUploadProgress) {
  return request({
    url: `${fix}/Base_UploadImage`,
    onUploadProgress: onUploadProgress,
    method: "post",
    data: obj
  });
}

// 图片发布
export function releaseImage() {
  return request({
    url: `${fix}/Base_ReleaseImage`,
    method: "post"
  });
}

/** 
 * 导出图片
 * @Date: 2020-10-13 09:18:48 
 * @Desc:  0小图 1大图
 */
export function getExporProdPic(obj) {
  return request({
    url: `${fix}/Base_DownloadImage`,
    method: "post",
    data: obj
  });
}

// 获取货品资料新增或修改信息
export function getEdit(obj) {
  return request({
    url: `${fix}/Base_GetEdit`,
    method: "get",
    params: obj
  });
}

// 保存货品资料数据
export function saveEdit(obj) {
  return request({
    url: `${fix}/Base_SaveEdit`,
    method: "post",
    data: obj
  });
}

// 删除货品资料数据
export function deleteProd(obj) {
  return request({
    url: `${fix}/Base_Delete`,
    method: "post",
    data: obj
  });
}
/**获取该款所有款色版
 {
   prodcode: 'string'
 }
 */
export function getSkuByProdCode(params) {
  return request({
    url: `${fix}/Base_GetSkuByProdCode`,
    method: "get",
    params
  });
}

/**获取商品资料下拉框
 * obj: brand,class,category ...
 */
export function getDropDownList(params) {
  return request({
    url: `${fix}/Base_GetDropDownList`,
    method: "get",
    params
  });
}

/**  修改货品款号、颜色、版型
{
  "oriprodcode": "string",      旧款号      必填
  "curprodcode": "string",      新款号      operationtype：0 必填
  "data": [                     颜色数据    operationtype：1 必填
            {
            "ProdGUID":2,
            "ColorCode":"2233",
            "Color": "黑色",
            "Pattern": “版型”
            }
          ],
  "isupdate": 0,                 0查询，1更新
  "operationtype": 0             0修改款号，1修改颜色
}
 */
export function prodInfoEdit(obj) {
  return request({
    url: `${fix}/Base_ProdInfoEdit`,
    method: "post",
    data: obj
  });
}

/**获取多图
 * prodcode: string, // 款号
 */
export function getMutiPicture(params) {
  return request({
    url: `${fix}/Bsse_GetMutiPicture`,
    method: "get",
    params
  });
}

/**删除图片
 * picturecode: string, //图片编号
 */
export function deleteMutiPicture(params) {
  return request({
    url: `${fix}/Bsse_DeleteMutiPicture`,
    method: "post",
    data: params
  });
}

/**
 * 获取上传视频地址
 */
export function getVideoUrl(params) {
  return request({
    url: `${fix}/Base_GetVideoUrl`,
    method: "get",
    params
  });
}


/**
 * 上传视频
 * @param {Object} params 请求数据
 * @param {Function} cbProgress 进度条方法
 * @param {String} meetingcode 场次号
 * @param {String} uploadUrl 上传地址
 */
export function uploadVideo(params, cbProgress, meetingcode, uploadUrl) {
  return request({
    url: `${uploadUrl}api/file/upload`,
    method: "post",
    headers: {
      "Content-Type": "charset=utf-8;multipart/form-data;",
      "filePath": `MiniProgramVideo\\${meetingcode}`
    },
    data: params,
    timeout: 60000,
    onUploadProgress: progressEvent => {
      let complete =
        (((progressEvent.loaded / progressEvent.total) * 100) | 0);

      if (typeof cbProgress === 'function') {
        cbProgress(complete);
      }
    }
  });
}

/**
 * 视频发布
 * @param {Object} params 
 * "videonames": Array
 */
export function releaseVideo(params) {
  return request({
    url: "/api/M_Aliyun/Base_CNDRefreshObjectCaches",
    method: "post",
    data: params
  });
}

/**设置图片编号
 * "flag": 0,
 * "sign": "string",
 * "whereproduct": "object"
 */
export function setPictureCode(params) {
  return request({
    url: `${fix}/Base_SetPictureCode`,
    method: "post",
    data: params
  })
}


/**获取视频
 * prodcode: string, // 款号
 */
export function getProductVideo(params) {
  return request({
    url: `${fix}/Base_GetProductVideo`,
    method: "get",
    params
  });
}

/**删除图片
 * VideoName: string //视频名称
 */
export function deleteProductVideo(params) {
  return request({
    url: `${fix}/Base_DeleteProductVideoAsync`,
    method: "post",
    params: params
  });
}

// 店铺起订量样式
export function getMinimumOrderLayoutData(obj) {
  return request({
    url: `${fix}/MinimumOrder_GetLayout`,
    method: "get",
    data: obj
  });
}

// 店铺起订量数据
export function getMinimumOrderListData(obj) {
  return request({
    url: `${fix}/MinimumOrder_GetList`,
    method: "post",
    data: obj
  });
}


// 批量更改资料-界面样式
export function getBulkUpdateProduct_LayoutData(obj) {
  return request({
    url: `${fix}/BulkUpdateProduct_GetLayout`,
    method: "get",
    data: obj
  });
}

// 批量更改资料-保存/修改
// {
//   "type": 0, 0预览，1保存
//   "whereproduct": {"Class":["裤子"]},
//   "chioceprocattr": "class-nvarchar",
//   "updatenewvalue": "裤子"
// }
export function saveBulkUpdateProduct_Data(obj) {
  return request({
    url: `${fix}/BulkUpdateProduct_Save`,
    method: "post",
    data: obj
  });
}

//修改价格
export function updateProductPrice(obj) {
  return request({
    url: `${fix}/Base_SaveUnitPrice`,
    method: "post",
    data: obj
  });
}