import api from './axios';



export const bidsApi = {
    createBid: (projectId, data) => api.post(`bids/${projectId}`, data),
    getAllBidsByProjectId: (projectId) => api.get(`/bids/project/${projectId}`),
    getBid: (id) => api.get(`/bids/single/${id}`),
    withdrawBid: (id) => api.delete(`/bids/withdraw/${id}`),

};