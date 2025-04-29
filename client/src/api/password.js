import api from './axios';

export const passwWordApi = {
    forgotPassword: (email) => api.post('/auth/forgot', { email }),
    resetPassword: ({ token, newPassword }) => api.post('/auth/reset', { token, newPassword }),
};