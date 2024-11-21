import axios from 'axios';

// Configuration de base pour l'API
const api = axios.create({
    baseURL: 'http://localhost:3000', // L'URL de votre backend
});

export const getUserData = (userId) => {
    return api.get(`/user/${userId}`);
};

export const getUserActivity = (userId) => {
    return api.get(`/user/${userId}/activity`);
};

export const getUserAverageSessions = (userId) => {
    return api.get(`/user/${userId}/average-sessions`);
};

export const getUserPerformance = (userId) => {
    return api.get(`/user/${userId}/performance`);
};
