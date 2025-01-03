const BASE_URL = 'http://localhost:3000';
const MOCK_URL = '/mockData.json';
const USE_MOCK = false;

const getMockDataByUserId = async (userId) => {
    const mockData = await fetchData(MOCK_URL);
    if (mockData.user.id !== parseInt(userId, 10)) {
        throw new Error('Utilisateur introuvable dans les données mockées');
    }
    return mockData;
};




const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de l'appel à ${url} :`, error);
        throw error;
    }
};


export const getUserData = async (userId) => {
    if (USE_MOCK) {
        const mockData = await getMockDataByUserId(userId);
        return { data: mockData.user };
    }
    return fetchData(`${BASE_URL}/user/${userId}`);
};


export const getUserActivity = async (userId) => {
    if (USE_MOCK) {
        const mockData = await getMockDataByUserId(userId);
        return { data: mockData.activity };
    }
    return fetchData(`${BASE_URL}/user/${userId}/activity`);
};


export const getUserAverageSessions = async (userId) => {
    if (USE_MOCK) {
        const mockData = await getMockDataByUserId(userId);
        return { data: mockData.averageSessions };
    }
    return fetchData(`${BASE_URL}/user/${userId}/average-sessions`);
};


export const getUserPerformance = async (userId) => {
    if (USE_MOCK) {
        const mockData = await getMockDataByUserId(userId);
        return { data: mockData.performance };
    }
    return fetchData(`${BASE_URL}/user/${userId}/performance`);
};
