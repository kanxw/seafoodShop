// 这个是axios的配置
import axios from 'axios';
import store from '@/store';
import errCode from '@/resources/errCode';
import { message } from 'element-ui';
import route from '@/router';

axios.defaults.baseURL = '';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //console.log(localStorage, '测试请求')
  let token = store.state.user.access_token;
  //console.log(token, '这是token')

  const isToken = config.headers.isToken === false;
  if (token && !isToken) {
    config.headers["token"] = token;
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.status === 200 ? Promise.resolve(response) : Promise.reject(response);
}, function (error) {
  // 对响应错误做点什么
  const { response } = error;
  const {status} = response;
  if (response) {
    let err = errCode[status];
    if(status == '401'){
      route.push('/login');
      store.dispatch('logout');
    }else{
      message.error(err);
    }
    return Promise.reject(response.data);
  }
});
export default axios;