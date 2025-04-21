import api from '../api/axios';

export const getClients = () => api.get('/client');