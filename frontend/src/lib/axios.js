import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This ensures cookies are sent with every request
})

export default api;