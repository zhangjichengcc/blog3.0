import request from '@/utils/request';

// 获取文章列表
export async function queryArticalList(params = {}) {
  return request({
    url: '/api/artical/getArticalList',
    method: 'get',
    params,
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

// 文章详情
export async function getArtical(params = {}) {
  return request({
    url: '/api/artical/selectArtical',
    method: 'get',
    params,
  });
}

// 删除文章
export async function deleteArtical(params = {}) {
  return request({
    url: '/api/artical/deleteArtical',
    method: 'get',
    params,
  });
}
