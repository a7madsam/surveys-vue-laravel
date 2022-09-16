import { createStore } from "vuex";
import Axios from "../axios";
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
      sessionStorage.removeItem("TOKEN");
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
      return Axios.post("/register", user).then(({ data }) => {
        context.commit("setUser", data);
        return data;
      });
    },
    login: function (context, credentials) {
      return Axios.post("/login", credentials).then(({ data }) => {
        context.commit("setUser", data);
        return data;
      });
    },
    logout: function (context) {
      return Axios.post("logout").then((response) => {
        context.commit("logout");
        return response;
      });
    },
  },
  modules: {},
});

export default store;
