import request from '@/utils/request';

// 获取访客列表
export async function queryVisitorList() {
  return request('/api/visitor/getVisitorList');
}

// 插入访客数据

// 获取文章列表
export async function uploadImg(params = {}) {
  return request({
    url: '/api/image/uploadImage',
    method: 'post',
    body: params,
  });
}
