import api from './axios';

export const projectsApi = {
    getOpenProjects: () => api.get('/projects'),
    getProject: (id) => api.get(`/projects/${id}`),
    createProject: (data) => api.post('/projects', data),
    updateProject: (id, data) => api.put(`/projects/${id}`, data),
    deleteProject: (id) => api.delete(`/projects/${id}`),
    assignFreelancer: (projectId, freelancerId) => api.put(`/projects/${projectId}/assign/${freelancerId}`),
    getAllProjects: () => api.get(`/projects/get-projects`),
    getAllProjectsFreelancer: () => api.get(`/projects/get-projects/freelancer`)
};