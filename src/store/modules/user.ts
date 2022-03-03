import { stringify } from 'querystring';

export default {
  namespace: true,
  state: () => {
    return {
      user_date: {}
    };
  },
  mutations: {
    set_user_date(state: { user_date: any }, n: {}) {
      state.user_date = n || {};
    },
    update_user_date(state: { user_date: any }, n: {}) {
      state.user_date = n;
    }
  }
};
