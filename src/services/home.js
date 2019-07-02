import request from '@/utils/request';

export async function queryVisitorList() {
  return request('/api/getVisitorList');
}

export async function insertVisitor() {
  return request('/api/getVisitorList');
}
