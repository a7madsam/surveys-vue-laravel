import axios from "axios";

//for authraization [interceptor]
import store from "./store";

const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
Axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`;
  return config;
});

export default Axios;
