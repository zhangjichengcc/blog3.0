import request from '@/utils/request';

// 获取访客列表
export async function queryVisitorList() {
  return request('/api/visitor/getVisitorList');
}

// 插入访客数据

// 上传图片
export async function uploadImg(params = {}) {
  return request({
    url: '/api/image/uploadImage',
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
