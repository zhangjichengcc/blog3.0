/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2019-12-05 19:46:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog3.0\src\services\artical.js
 */
import request from '@/utils/request';

/**
 * @description: 获取文章列表
 * @param {object} {pageSize, pageNum}
 * @return:
 */
export async function queryArticalList(params = {}) {
  return request({
    url: '/api/artical/getArticalList',
    method: 'get',
    params,
  });
}

// 文章提交
export async function insertArtical(params = {}) {
  return request({
    url: '/api/artical/insertArtical',
    method: 'post',
    body: params,
  });
}

// 文章提交
export async function updateArtical(params = {}) {
  return request({
    url: '/api/artical/updateArtical',
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
