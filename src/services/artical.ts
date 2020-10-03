/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-10-03 16:55:34
 * @LastEditors: zhangjicheng
 * @Description: In User Settings Edit
 * @FilePath: \blog3.0\src\services\artical.ts
 */
import request from '@/utils/request';

/**
 * @description: 获取文章列表
 * @param {object} {pageSize, pageNum}
 * @return:
 */

interface queryArticalListProps {
  pageNum?: number; // def 1
  pageSize?: number; // def 10
  name?: string; // def ''
  tag?: string; // df ''
}
export async function queryArticalList(params: queryArticalListProps) {
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

// 文章更新
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
