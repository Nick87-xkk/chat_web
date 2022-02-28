import { createStore } from 'vuex';
import user from './modules/user';

export type State = {
  count: number;
};

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    commitCount(state, n) {
      state.count += n;
    }
  },
  modules: {
    user
  }
});
