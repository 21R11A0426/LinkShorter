import axios from 'axios';
export const APP_URL = import.meta.env.MODE === 'production'
  ? window.location.origin 
  : 'http://localhost:8080';


const API_BASE = import.meta.env.MODE === 'production' ? '/' : 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE
});

export const getLinks = () => api.get('/links');
export const createLink = (data) => api.post('/links', data);
export const deleteLink = (code) => api.delete(`/links/${code}`);
export const getLinkStats = (code) => api.get(`/links/${code}`);

export default api;