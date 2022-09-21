import { createStore } from "vuex";
import Axios from "../axios";
// const surveys = [
//   {
//     id: 536,
//     image_url: null,
//     title: "newone",
//     slug: "newone",
//     status: true,
//     description: "qqwertyuio",
//     created_at: "2022-09-17 07:39:59",
//     updated_at: "2022-09-17 07:39:59",
//     expire_date: "2022-09-19",
//     questions: [
//       {
//         id: 575,
//         type: "select",
//         question: "hi",
//         description: "jhkjh",
//         data: {
//           options: [
//             {
//               uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
//               text: "1",
//             },
//             {
//               uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
//               text: "2",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   {
//     id: 537,
//     image_url: null,
//     title: "wew",
//     slug: "wew",
//     status: true,
//     description: "qwe",
//     created_at: "2022-09-17 13:50:04",
//     updated_at: "2022-09-17 13:50:04",
//     expire_date: "2022-09-30",
//     questions: [
//       {
//         id: 576,
//         type: "text",
//         question: "qweq",
//         description: "qweqweqewqweqweqwe",
//         data: [],
//       },
//     ],
//   },
//   {
//     id: 536,
//     image_url: null,
//     title: "newone",
//     slug: "newone",
//     status: true,
//     description: "qqwertyuio",
//     created_at: "2022-09-17 07:39:59",
//     updated_at: "2022-09-17 07:39:59",
//     expire_date: "2022-09-19",
//     questions: [
//       {
//         id: 575,
//         type: "select",
//         question: "hi",
//         description: "jhkjh",
//         data: {
//           options: [
//             {
//               uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
//               text: "1",
//             },
//             {
//               uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
//               text: "2",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   {
//     id: 536,
//     image_url: null,
//     title: "newone",
//     slug: "newone",
//     status: true,
//     description: "qqwertyuio",
//     created_at: "2022-09-17 07:39:59",
//     updated_at: "2022-09-17 07:39:59",
//     expire_date: "2022-09-19",
//     questions: [
//       {
//         id: 575,
//         type: "select",
//         question: "hi",
//         description: "jhkjh",
//         data: {
//           options: [
//             {
//               uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
//               text: "1",
//             },
//             {
//               uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
//               text: "2",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   {
//     id: 536,
//     image_url: null,
//     title: "newone",
//     slug: "newone",
//     status: true,
//     description: "qqwertyuio",
//     created_at: "2022-09-17 07:39:59",
//     updated_at: "2022-09-17 07:39:59",
//     expire_date: "2022-09-19",
//     questions: [
//       {
//         id: 575,
//         type: "select",
//         question: "hi",
//         description: "jhkjh",
//         data: {
//           options: [
//             {
//               uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
//               text: "1",
//             },
//             {
//               uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
//               text: "2",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   {
//     id: 536,
//     image_url: null,
//     title: "newone",
//     slug: "newone",
//     status: true,
//     description: "qqwertyuio",
//     created_at: "2022-09-17 07:39:59",
//     updated_at: "2022-09-17 07:39:59",
//     expire_date: "2022-09-19",
//     questions: [
//       {
//         id: 575,
//         type: "select",
//         question: "hi",
//         description: "jhkjh",
//         data: {
//           options: [
//             {
//               uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
//               text: "1",
//             },
//             {
//               uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
//               text: "2",
//             },
//           ],
//         },
//       },
//     ],
//   },
// ];
const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [],
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
  },
  modules: {},
});

export default store;
