import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7114/api',
  headers: {
    'x-api-key': 'super-hemlig-nyckel',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;