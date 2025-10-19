import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:4000/api",
  withCredentials: true, // important for cookies (login)
});

export default api;
