const BASE_URL = 'http://localhost:3000';
const USE_MOCK = true; // Changez à `false` pour utiliser le backend

// Récupérer les données principales de l'utilisateur
export const getUserData = async (userId) => {
    try {
        if (USE_MOCK) {
            const response = await fetch('/mockData.json');
            const mockData = await response.json();
            if (mockData.user.id === parseInt(userId, 10)) {
                return { data: mockData.user };
            } else {
                throw new Error('Utilisateur introuvable dans les données mockées');
            }
        }

        const response = await fetch(`${BASE_URL}/user/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur dans getUserData :', error);
        throw error;
    }
};

// Récupérer l'activité quotidienne de l'utilisateur
export const getUserActivity = async (userId) => {
    try {
        if (USE_MOCK) {
            const response = await fetch('/mockData.json');
            const mockData = await response.json();
            if (mockData.user.id === parseInt(userId, 10)) {
                return { data: mockData.activity };
            } else {
                throw new Error('Activité introuvable dans les données mockées');
            }
        }

        const response = await fetch(`${BASE_URL}/user/${userId}/activity`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur dans getUserActivity :', error);
        throw error;
    }
};

// Récupérer les sessions moyennes de l'utilisateur
export const getUserAverageSessions = async (userId) => {
    try {
        if (USE_MOCK) {
            const response = await fetch('/mockData.json');
            const mockData = await response.json();
            if (mockData.user.id === parseInt(userId, 10)) {
                return { data: mockData.averageSessions };
            } else {
                throw new Error('Sessions moyennes introuvables dans les données mockées');
            }
        }

        const response = await fetch(`${BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur dans getUserAverageSessions :', error);
        throw error;
    }
};

// Récupérer les performances de l'utilisateur
export const getUserPerformance = async (userId) => {
    try {
        if (USE_MOCK) {
            const response = await fetch('/mockData.json');
            const mockData = await response.json();
            if (mockData.user.id === parseInt(userId, 10)) {
                return { data: mockData.performance };
            } else {
                throw new Error('Performance introuvable dans les données mockées');
            }
        }

        const response = await fetch(`${BASE_URL}/user/${userId}/performance`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur dans getUserPerformance :', error);
        throw error;
    }
};
