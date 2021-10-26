const path = require('path');
const rghxmangeurl = "http://10.0.1.251:9999";
//const rghxmangeurl = "http://10.0.1.109:2008";//萝莉
//const rghxmangeurl = "https://test.lenxdt.com/";//测试接口
//const rghxclienturl = 'http://api.linjingrong.cn/webapi';  
const rghxclienturl = 'http://10.0.1.157:9000';  


function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets',resolve('src/assets'))
      .set('small',resolve('ProductImages/PictureSmaller'))
      .set('larger',resolve('ProductImages/PictureSmaller'))
      .set('img',resolve('public/img'))
      .set('view', resolve('src/view'))

      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  },

    // 配置转发代理
    devServer: {
      disableHostCheck: true,
      port: 8088,
      hot:true,
      open : true,
      host : "0.0.0.0",
      proxy: {
        "/Mapi": {
          target: rghxmangeurl,
          ws: true,
          pathRewrite: {
            "^/Mapi": "/api"
          }
        },
        "/Capi": {
          target: rghxclienturl,
          ws: true,
          pathRewrite: {
            "^/Capi": "/webapi"
          }
        },
      }
    }
};
