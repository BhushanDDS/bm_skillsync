import api from "../api/axios";

// client/src/services/cloudinaryService.js

export const CloudinaryService = {
  uploadFile: async (milestoneId, fileType, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await api.post(
        `/api/milestones/${milestoneId}/upload/${fileType}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};