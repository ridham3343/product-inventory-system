import axios from 'axios';

const api = axios.create({
  baseURL: '/api/products',
  timeout: 10000
});

export const productAPI = {
  getAll: () => api.get('/'),
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`)
};

export default api;