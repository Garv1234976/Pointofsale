import axios from "axios";

// ✅ Helper: read csrf_token from cookies
const getCsrfToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_token="))
    ?.split("=")[1];
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if(config.skipCsrf){
      return config
    }


    
    const csrfToken = getCsrfToken();

    // Only attach CSRF header for unsafe HTTP methods
    const needsCsrf =
      ["post", "put", "patch", "delete"].includes(config.method);

    if (needsCsrf && csrfToken) {
      config.headers["csrf_token"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
