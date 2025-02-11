import axios from "axios";

// Create an axios instance with the base URL for the backend
const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",  // Make sure this is the correct URL for your backend
});

// Interceptor to add the Authorization header only when a token exists
API.interceptors.request.use((config) => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Add the token to the headers if it exists, otherwise don't include it
  if (token && config.url !== "/auth/register" && config.url !== "/auth/authenticate") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
