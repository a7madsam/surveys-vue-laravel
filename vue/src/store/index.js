import { createStore } from "vuex";
import Axios from "../axios";
const surveys = [
  {
    id: 536,
    image_url: null,
    title: "newone",
    slug: "newone",
    status: true,
    description: "qqwertyuio",
    created_at: "2022-09-17 07:39:59",
    updated_at: "2022-09-17 07:39:59",
    expire_date: "2022-09-19",
    questions: [
      {
        id: 575,
        type: "select",
        question: "hi",
        description: "jhkjh",
        data: {
          options: [
            {
              uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
              text: "1",
            },
            {
              uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
              text: "2",
            },
          ],
        },
      },
    ],
  },
  {
    id: 537,
    image_url: null,
    title: "wew",
    slug: "wew",
    status: true,
    description: "qwe",
    created_at: "2022-09-17 13:50:04",
    updated_at: "2022-09-17 13:50:04",
    expire_date: "2022-09-30",
    questions: [
      {
        id: 576,
        type: "text",
        question: "qweq",
        description: "qweqweqewqweqweqwe",
        data: [],
      },
    ],
  },
  {
    id: 536,
    image_url: null,
    title: "newone",
    slug: "newone",
    status: true,
    description: "qqwertyuio",
    created_at: "2022-09-17 07:39:59",
    updated_at: "2022-09-17 07:39:59",
    expire_date: "2022-09-19",
    questions: [
      {
        id: 575,
        type: "select",
        question: "hi",
        description: "jhkjh",
        data: {
          options: [
            {
              uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
              text: "1",
            },
            {
              uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
              text: "2",
            },
          ],
        },
      },
    ],
  },
  {
    id: 536,
    image_url: null,
    title: "newone",
    slug: "newone",
    status: true,
    description: "qqwertyuio",
    created_at: "2022-09-17 07:39:59",
    updated_at: "2022-09-17 07:39:59",
    expire_date: "2022-09-19",
    questions: [
      {
        id: 575,
        type: "select",
        question: "hi",
        description: "jhkjh",
        data: {
          options: [
            {
              uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
              text: "1",
            },
            {
              uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
              text: "2",
            },
          ],
        },
      },
    ],
  },
  {
    id: 536,
    image_url: null,
    title: "newone",
    slug: "newone",
    status: true,
    description: "qqwertyuio",
    created_at: "2022-09-17 07:39:59",
    updated_at: "2022-09-17 07:39:59",
    expire_date: "2022-09-19",
    questions: [
      {
        id: 575,
        type: "select",
        question: "hi",
        description: "jhkjh",
        data: {
          options: [
            {
              uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
              text: "1",
            },
            {
              uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
              text: "2",
            },
          ],
        },
      },
    ],
  },
  {
    id: 536,
    image_url: null,
    title: "newone",
    slug: "newone",
    status: true,
    description: "qqwertyuio",
    created_at: "2022-09-17 07:39:59",
    updated_at: "2022-09-17 07:39:59",
    expire_date: "2022-09-19",
    questions: [
      {
        id: 575,
        type: "select",
        question: "hi",
        description: "jhkjh",
        data: {
          options: [
            {
              uuid: "65833d40-cfda-462f-a643-0d3a7624b83a",
              text: "1",
            },
            {
              uuid: "48d9d353-955b-4314-b8ce-de5e465cc2e5",
              text: "2",
            },
          ],
        },
      },
    ],
  },
];
const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys,
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {
    getUser: function (state) {
      return JSON.parse(sessionStorage.getItem("USER"));
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
