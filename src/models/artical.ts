/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-10-03 18:39:23
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \blog3.0\src\models\artical.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */
import { Effect, Reducer } from 'umi';
import { queryArticalList } from '@/services/artical';

export interface articalModelStateProps {
  articalList: [];
}

export interface articalModelProps {
  namespace: 'artical';
  state: articalModelStateProps;
  effects: {
    fetchArticalSearchList: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<articalModelStateProps>;
    changeNotifyCount: Reducer<articalModelStateProps>;
  };
}

const ArticalModel: articalModelProps = {
  namespace: 'artical',
  state: {
    articalList: [],
  },
  effects: {
    *fetchArticalSearchList({ payload }, { call, put }) {
      const response = yield call(queryArticalList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default ArticalModel;
