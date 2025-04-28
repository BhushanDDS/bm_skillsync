import api from './axios';

export const milestoneApi = {
    getProjectMilestones: (projectId) => api.get(`projects/${projectId}/milestones`),
    createMilestone: (data) => api.post('milestones', data),
    updateMilestone: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
};