import request from '@/utils/request';

// 获取文章列表
export async function login(params = {}) {
  return request({
    url: '/api/user/login',
    method: 'post',
    body: params,
  });
}

// 文章提交
export async function uploadArtical(params = {}) {
  return request({
    url: '/api/artical/insertArtical',
    method: 'post',
    body: params,
  });
}
