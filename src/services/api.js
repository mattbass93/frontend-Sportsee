const BASE_URL = 'http://localhost:3000';

// Récupérer les données principales de l'utilisateur
export const getUserData = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`); // Appel à l'API avec fetch
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Conversion des données en JSON
        console.log('Données utilisateur reçues :', data);
        return data;
    } catch (error) {
        console.error('Erreur dans getUserData :', error);
        throw error; // Propagation de l'erreur pour une gestion plus haut niveau
    }
};

// Récupérer l'activité quotidienne de l'utilisateur
export const getUserActivity = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/activity`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Données d\'activité reçues :', data);
        return data;
    } catch (error) {
        console.error('Erreur dans getUserActivity :', error);
        throw error;
    }
};

// Récupérer les sessions moyennes de l'utilisateur
export const getUserAverageSessions = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Données des sessions moyennes reçues :', data);
        return data;
    } catch (error) {
        console.error('Erreur dans getUserAverageSessions :', error);
        throw error;
    }
};

// Récupérer les performances de l'utilisateur
export const getUserPerformance = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/performance`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Données de performance reçues :', data);
        return data;
    } catch (error) {
        console.error('Erreur dans getUserPerformance :', error);
        throw error;
    }
};
