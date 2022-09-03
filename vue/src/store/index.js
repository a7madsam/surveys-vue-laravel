import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  },
  getters: {
    getUser: function (state) {
      return state.user.data;
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      console.log(userData);
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  actions: {
    register: function (context, user) {
      return axios
        .post("http://127.0.0.1:8000/api/register", user)
        .then((response) => {
          context.commit("setUser", response.data);
          return response.data;
        });
    },
  },
  modules: {},
});

export default store;
