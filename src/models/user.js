// import { login } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      // name: '游客',
      // avatar: '',
      // comment: '莫得感情的杀手',
      // authority: 'visitor',
    },
  },
  // effects: {
  //   *fetchCurrent(_, { call, put }) {
  //     const response = yield call(login);
  //     yield put({
  //       type: 'saveCurrentUser',
  //       payload: response,
  //     });
  //   },
  // },
  // reducers: {
  //   saveCurrentUser(state, action) {
  //     return { ...state, currentUser: action.payload || {} };
  //   },
  // },
};
export default UserModel;
