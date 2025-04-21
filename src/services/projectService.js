import api from '../api/axios';

export const getProjects = () => api.get('/project');
export const createProject = (data) => api.post('/project', data);
export const updateProject = (id, data) => api.put(`/project/${id}`, data);
export const deleteProject = (id) => api.delete(`/project/${id}`);