/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-11-09 11:19:59
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \blog3.0\src\models\login.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */
import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';

export function getPageQuery() {
  return parse(globalThis.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    // *logout(_, { put }) {
    //   const { redirect } = getPageQuery(); // redirect
    //   if (globalThis.location.pathname !== '/user/login' && !redirect) {
    //     yield put(
    //       routerRedux.replace({
    //         pathname: '/user/login',
    //         search: stringify({
    //           redirect: globalThis.location.href,
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
