import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1717/",
});

export default api;
