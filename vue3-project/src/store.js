import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isCollapse: true,
      email: '',
      currentMenu: null,
      tabsList: [
      {
        path:'/console',
        name: 'home',
        label: '首页',
        icon:'home'
      }
    ]
    };
  },
  mutations: {
    updateIsCollapse(state,payload) {
      state.isCollapse = !state.isCollapse;
    },
    setEmail(state, email) {
      state.email = email;
    },
    selectMenu(state, val) {
      //判断
      if(val.name == 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result == -1 ? state.tabsList.push(val) : ''
      }
    },
    closeTab(state,val) {
      let res = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(res, 1)
    }
  }
});