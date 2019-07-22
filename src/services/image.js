import request from '@/utils/request';

// 上传图片
export async function uploadImg(params = {}) {
  return request({
    url: '/api/image/uploadImage',
    method: 'post',
    body: params,
  });
}

// 删除图片
export async function deleteImg() {
  return request('/api/visitor/getVisitorList');
}


