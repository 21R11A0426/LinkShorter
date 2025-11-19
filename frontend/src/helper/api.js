import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/';

const api = axios.create({
  baseURL: API_URL
});

export const getLinks = () => api.get('/links');
export const createLink = (data) => api.post('/links', data);
export const deleteLink = (code) => api.delete(`/links/${code}`);
export const getLinkStats = (code) => api.get(`/links/${code}`);

export default api;