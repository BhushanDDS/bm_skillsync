import api from "../api/axios";

export const messageService = {
  getProjectMessages: async (projectId) => {
    const response = await api.get(`/messages/project/${projectId}`);
    return response.data;
  },
  
  sendMessage: async (content, projectId, attachment) => {
    const response = await api.post('/messages', {
      content,
      projectId: Number(projectId),
      attachment,
    });
    return response.data;
  },
};