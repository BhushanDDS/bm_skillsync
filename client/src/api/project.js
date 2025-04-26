import api from './axios';

export const projectsApi = {
    getOpenProjects: () => api.get('/projects'),
    getProject: (id) => axios.get(`/projects/${id}`),
    createProject: (data) => api.post('/projects', data),
    updateProject: (id, data) => axios.put(`/projects/${id}`, data),
    deleteProject: (id) => api.delete(`/projects/${id}`),
    assignFreelancer: (projectId, freelancerId) => axios.post(`/projects/${projectId}/assign`, { freelancerId }),
    getAllProjects: () => api.get(`/projects/get-projects`),
};