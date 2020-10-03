/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-10-03 15:55:14
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \blog3.0\src\models\login.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    // *logout(_, { put }) {
    //   const { redirect } = getPageQuery(); // redirect
    //   if (window.location.pathname !== '/user/login' && !redirect) {
    //     yield put(
    //       routerRedux.replace({
    //         pathname: '/user/login',
    //         search: stringify({
    //           redirect: window.location.href,
    //         }),
    //       }),
    //     );
    //   }
    // },
  },
  reducers: {
    // changeLoginStatus(state, { payload }) {
    //   return { ...state, status: payload.status, type: payload.type };
    // },
  },
};
export default Model;
