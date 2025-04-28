// client/src/services/milestoneService.js
import api from '../api/axios';

export const MilestoneService = {
  
  // In MilestoneService.jsx
getProjectMilestones: async (projectId) => {
  try {
    const response = await api.get(`/api/projects/${projectId}/milestones`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
},

createMilestone: async (milestoneData) => {
  try {
    const response = await api.post('/api/milestones', milestoneData);
    return response.data;
  } catch (error) {
    throw error;
  }
},

updateMilestone: async (milestoneId, updateData) => {
  try {
    const response = await api.patch(`/api/milestones/${milestoneId}`, updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
};