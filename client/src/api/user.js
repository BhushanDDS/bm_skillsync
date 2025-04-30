import api from "./axios";

export const userApi = {
    getProfile: async() => {
        const response = await api.get('auth/getUser');
        return response;
    },

    updateProfile: async(data) => {
        const response = await api.patch('auth/update-profile', data);
        return response;
    },

    updatePassword: async(oldPassword, newPassword) => {
        const response = await api.patch('auth/change-password', {
            oldPassword,
            newPassword
        });
        return response;
    },

    uploadProfile: async(formData) => {
        const response = await api.post('auth/upload-profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response;
    },
};