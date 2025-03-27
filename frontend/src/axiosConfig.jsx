import axios from 'axios';

const BASE_URL = 'http://localhost:5001'; // local
//const BASE_URL = 'http://3.26.96.188:5001', // live
const HEADERS = { 'Content-Type': 'application/json' };

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

axiosAuthInstance.interceptors.request.use(
  function (config) {
    // Get the token from localStorage
    const user = sessionStorage.getItem('user');
    const { token } = user ? JSON.parse(user) : {};

    // If token exists, add it to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosAuthInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // Unauthorized, remove the user from localStorage
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
)

export { axiosInstance, axiosAuthInstance };
