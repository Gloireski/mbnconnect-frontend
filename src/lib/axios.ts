// Axios instance
import axios from 'axios';
// import { useAuthStore } from '@/store/authStore';

export const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // },
  timeout: 10000,
  withCredentials: true //cookie pour auth
});

// Interceptor: Ajouter token
// no need, on utilise session cookie pour auth
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // recupérer le token
//     // const token = useAuthStore.getState().token;
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Interceptor: Gérer erreurs 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // suppression du token
      // localStorage.removeItem('token');
      localStorage.removeItem('auth-storage');
      // useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;