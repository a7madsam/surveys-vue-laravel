import { createStore } from "vuex";
import Axios from "../axios";
import Swal from "sweetalert2";
const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: {
      isLoading: false,
      links: [],
      data: [],
    },
    currentSurvey: {
      isLoading: false,
      data: {},
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {
    getUser: function (state) {
      return JSON.parse(sessionStorage.getItem("USER"));
    },
    getCurrentSurvey: function (state) {
      return state.currentSurvey.data;
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem(
        "USER",
        JSON.stringify({ name: userData.user.name, email: userData.user.email })
      );
      sessionStorage.setItem("TOKEN", userData.token);
    },
    setCurrentSurveyLoading: function (state, _isLoading) {
      state.currentSurvey.isLoading = _isLoading;
    },
    setSurveys: function (state, surveys) {
      state.surveys.data = surveys.data;
      state.surveys.links = surveys.meta.links;
    },
    setSurveysLoading: function (state, _isLoading) {
      state.surveys.isLoading = _isLoading;
    },
    setCurrentSurvey: function (state, survey) {
      state.currentSurvey.data = survey.data;
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
    saveSurvey: function (context, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = Axios.put(`/survey/${survey.id}`, survey).then((result) => {
          context.commit("setCurrentSurvey", result.data);
          return result.data;
        });
      } else {
        response = Axios.post(`/survey`, survey).then((result) => {
          context.commit("setCurrentSurvey", result.data);
          return result;
        });
      }
      return response;
    },
    getSurvey: function (context, id) {
      context.commit("setCurrentSurveyLoading", true);
      return Axios.get(`/survey/${id}`).then((result) => {
        context.commit("setCurrentSurvey", result.data);
        context.commit("setCurrentSurveyLoading", false);
        return result.data.data;
      });
    },
    deleteSurvey(context, id) {
      return Axios.delete(`/survey/${id}`);
    },
    getSurveys: function (context, { url = null } = {}) {
      url = url || "/survey";
      context.commit("setSurveysLoading", true);
      return Axios.get(url).then((res) => {
        context.commit("setSurveysLoading", false);
        context.commit("setSurveys", res.data);
        return res;
      });
    },
    showNotification: function (context, { type, message }) {
      return Swal.fire({
        title: type === "error" ? "Error" : "",
        html: `<ul>${message}</ul>`,
        icon: type,
        backdrop: true,
        allowOutsideClick: () => !Swal.isLoading(),
      });
    },
    getSurveyBySlug: function ({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return Axios.get(`/survey-by-slug/${slug}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurveyAnswers: function ({ commit }, { surveyId, answers }) {
      return Axios.post(`/survey/${surveyId}/answer`, { answers });
    },
  },
  modules: {},
});

export default store;
