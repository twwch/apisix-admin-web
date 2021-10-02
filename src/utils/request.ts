
import { extend } from 'umi-request';
import { message } from 'antd'
import { history } from 'umi';

const request = extend({
  timeout: 1000,
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use(
  (url, options) => {
    const token = window.localStorage.getItem("token");
    // 如果有登录用户信息，则统一设置 token
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: { ...options.headers, token: String(token) } },
    };
  },
  { global: true }
);


// 克隆响应对象做解析处理
request.interceptors.response.use(response => {
  response.clone().json().then(resp => {
    if (resp.code !== 0) {
      message.error(resp.message);
      if (resp.code === 29) {
        history.push('/login')
      }
    }
  })
  return response;
});

export { request }