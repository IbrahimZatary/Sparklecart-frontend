/* eslint-disable no-unused-vars */
import axios from "axios";

//axios instace
const URL = import.meta.env.VITE_API_URL || "https://localhost:7161/api" // for fallback 
 let apiClient =   axios.create({

baseURL : URL ,
headers : 
{
    "Content-Type" : 'application/json'
},
timeout: 1000,

});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
    (error) => {
    return Promise.reject(error);
  }
);

// middleware for requests/responses

apiClient.interceptors.response.use(
(response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      //more handling 
    }
});

export default apiClient;
