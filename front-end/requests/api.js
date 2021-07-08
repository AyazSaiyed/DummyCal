import axios from "./axios";
import server from '../config/server';

const api = axios.create({
    baseURL: `${server.HOST}api/v1/`,
});

// Add a request interceptor
api.interceptors.request.use(config => {
    document.body.classList.add('loading-indicator');
    const token = sessionStorage.getItem('token');
    console.log(token);
    config.headers.Authorization = token ? `Token ${token}` : '';
    return config;
});

// Add a response interceptor
api.interceptors.response.use(config => {
    document.body.classList.remove('loading-indicator');
    return config;
}, error => {
    if (error.response.status === 401) {
        sessionStorage.clear();
        // window.location.reload();
    }
    return Promise.reject(error);
});

export default api;
