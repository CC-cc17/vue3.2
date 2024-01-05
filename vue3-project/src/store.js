import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      email: ''
    };
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    }
  }
});