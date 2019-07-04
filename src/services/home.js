import request from '@/utils/request';

// 获取访客列表
export async function queryVisitorList() {
  return request('/api/visitor/getVisitorList');
}

// 插入访客数据
export async function insertVisitor() {
  return request('/api/visitor/getVisitorList');
}

// 获取文章列表
export async function queryArticalList(params = {}) {
  return request({
    url: '/api/artical/getArticalList',
    method: 'get',
    params,
  });
}
