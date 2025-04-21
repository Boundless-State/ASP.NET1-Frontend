import api from '../api/axios';

export const getStatuses = () => api.get('/status');