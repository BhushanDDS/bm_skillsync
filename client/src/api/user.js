import api from "./axios";

export const userApi = {
    getProfile: () => api.get('auth/getUser'),
    updateProfile: (data) => api.patch('auth/update-profile', data),
    updatePassword: (oldPassword, newPassword) =>
        api.patch('auth/change-password', { oldPassword, newPassword }),
    uploadProfile: (formData) =>
        api.post('auth/upload-profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
};