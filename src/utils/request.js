/* eslint-disable camelcase */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// import { extend } from 'umi-request';
import { stringify } from 'qs';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response, message } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  const res = {
    code: -1,
    msg: message,
  };
  return res;
};

// 检验状态码， 200 表示请求成功
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.status = response.status;
  error.response = response;
  throw error;
};

export default function request(option) {
  let { url } = option;
  // Authorization 需要改成登录后获取
  const defaultOptions = {
    credentials: 'include',
    // headers: {
    //   Authorization: getAuthorization() || '',
    // },
  };
  const newOptions = {
    ...defaultOptions,
    ...option,
  };

  // 设置 Content-Type
  if (!(newOptions.body instanceof FormData)) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    // newOptions.body is FormData
    newOptions.headers = {
      Accept: 'application/json',
      ...newOptions.headers,
    };
  }

  // 转换 params 的参数
  if (newOptions.params) {
    url = `${url}?${stringify(newOptions.params)}`;
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      const { code, msg } = response;
      // code 为 0 并且 data 存在的时候才返回数据，其他的均抛出异常，该异常属于业务异常
      if (code === 0) {
        return response;
      }

      // 抛出错误并捕捉
      const error = new Error(msg);
      error.response = response;
      error.code = -1;
      error.name = 'serviceError';
      throw error;
    })
    .catch(errorHandler);
}
