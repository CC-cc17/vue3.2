import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isCollapse: true,
      email: ''
    };
  },
  mutations: {
    updateIsCollapse(state,payload) {
      state.isCollapse = !state.isCollapse;
    },
    setEmail(state, email) {
      state.email = email;
    }
  }
});