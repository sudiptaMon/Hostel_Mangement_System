import axios from "axios";

const getBaseUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  }

  return "/api";
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export default api;
