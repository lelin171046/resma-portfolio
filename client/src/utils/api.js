import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

export const publicApi = {
  getAll: () => api.get('/public/all'),
  getProfile: () => api.get('/public/profile'),
  getExperience: () => api.get('/public/experience'),
  getTraining: () => api.get('/public/training'),
  getSkills: () => api.get('/public/skills'),
  getEducation: () => api.get('/public/education'),
  getLanguages: () => api.get('/public/languages'),
  getReferences: () => api.get('/public/references'),
  getSocialLinks: () => api.get('/public/social-links'),
  sendContact: (data) => api.post('/contact', data)
};

export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  updateProfile: (data) => api.put('/admin/profile', data),
  
  createExperience: (data) => api.post('/admin/experience', data),
  updateExperience: (id, data) => api.put(`/admin/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/admin/experience/${id}`),
  
  createTraining: (data) => api.post('/admin/training', data),
  updateTraining: (id, data) => api.put(`/admin/training/${id}`, data),
  deleteTraining: (id) => api.delete(`/admin/training/${id}`),
  
  createSkill: (data) => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),
  
  createEducation: (data) => api.post('/admin/education', data),
  updateEducation: (id, data) => api.put(`/admin/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/admin/education/${id}`),
  
  createLanguage: (data) => api.post('/admin/languages', data),
  updateLanguage: (id, data) => api.put(`/admin/languages/${id}`, data),
  deleteLanguage: (id) => api.delete(`/admin/languages/${id}`),
  
  createReference: (data) => api.post('/admin/references', data),
  updateReference: (id, data) => api.put(`/admin/references/${id}`, data),
  deleteReference: (id) => api.delete(`/admin/references/${id}`),
  
  createSocialLink: (data) => api.post('/admin/social-links', data),
  updateSocialLink: (id, data) => api.put(`/admin/social-links/${id}`, data),
  deleteSocialLink: (id) => api.delete(`/admin/social-links/${id}`),
  
  getMessages: () => api.get('/admin/messages'),
  markMessageRead: (id) => api.put(`/admin/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/admin/messages/${id}`),
  
  reorder: (collection, items) => api.put('/admin/reorder/:collection'.replace(':collection', collection), { items }),
  
  uploadImage: (formData) => api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadResume: (formData) => api.post('/upload/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteImage: (publicId) => api.delete(`/upload/image/${publicId}`),
  deleteResume: (publicId) => api.delete(`/upload/resume/${publicId}`)
};

export default api;