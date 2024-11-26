import React, { useState, useEffect, useCallback } from 'react';
import ActivityChart from '../components/ActivityChart'; // Graphique d'activité
import AverageChart from '../components/AverageChart'; // Graphique pour la durée moyenne des sessions
import PerformanceRadarChart from '../components/PerformanceRadarChart'; // Radar Chart
import ScoreRadialChart from '../components/ScoreRadialChart';
import StatCard from '../components/StatCard'; // Cartes statistiques
import UserInfo from '../components/UserInfo'; // Informations utilisateur

import './UserDashboard.css'; // Fichier CSS dédié

import SportSeeLogo from '../assets/logos/sportseelogo.png';
import CaloriesIcon from '../assets/icons/calories-icon.png';
import ProteinIcon from '../assets/icons/protein-icon.png';
import CarbsIcon from '../assets/icons/carbs-icon.png';
import FatIcon from '../assets/icons/fat-icon.png';
import YogaIcon from '../assets/icons/yoga-icon.png';
import SwimIcon from '../assets/icons/swim-icon.png';
import BikeIcon from '../assets/icons/bike-icon.png';
import GymIcon from '../assets/icons/gym-icon.png';

const UserDashboard = () => {
    const [userData, setUserData] = useState([]); // Données utilisateur
    const [activityData, setActivityData] = useState([]); // Données d'activité
    const [averageSessions, setAverageSessions] = useState([]); // Données des sessions moyennes
    const [performanceData, setPerformanceData] = useState([]); // Données de performance

    // Fonction pour récupérer toutes les données
    const fetchData = useCallback(async () => {
        try {
            // Récupère les données utilisateur
            const userResponse = await fetch("http://localhost:3000/user/12");
            const userJson = await userResponse.json();
            setUserData(userJson.data);

            // Récupère les données d'activité
            const activityResponse = await fetch("http://localhost:3000/user/12/activity");
            const activityJson = await activityResponse.json();
            setActivityData(activityJson.data.sessions);

            // Récupère les données des sessions moyennes
            const averageSessionsResponse = await fetch("http://localhost:3000/user/12/average-sessions");
            const averageSessionsJson = await averageSessionsResponse.json();
            setAverageSessions(averageSessionsJson.data.sessions);

            // Récupère les données de performance
            const performanceResponse = await fetch("http://localhost:3000/user/12/performance");
            const performanceJson = await performanceResponse.json();
            const formattedPerformanceData = performanceJson.data.data.map((item) => ({
                ...item,
                kind: performanceJson.data.kind[item.kind], // Remplace l'ID par le nom
            }));
            setPerformanceData(formattedPerformanceData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    }, []);

    useEffect(() => {
        fetchData(); // Appel de la fonction asynchrone
    }, [fetchData]);

    // Affichage du message de chargement si les données ne sont pas encore prêtes
    if (!userData || !userData.keyData || !activityData.length || !averageSessions.length || !performanceData.length) {
        return <p>Chargement des données utilisateur...</p>;
    }

    const { keyData } = userData; // Destructuration de keyData pour simplifier l'accès

    return (
        <div className="dashboard-layout">
            {/* En-tête */}
            <header className="dashboard-header">
                <h1 className="main-logo">
                    <img src={SportSeeLogo} alt="SportSee" />
                </h1>
                <nav>
                    <ul className="nav-links">
                        <li>Accueil</li>
                        <li>Profil</li>
                        <li>Réglage</li>
                        <li>Communauté</li>
                    </ul>
                </nav>
            </header>

            {/* Barre latérale */}
            <aside className="dashboard-sidebar">
                <ul>
                    <li><img src={YogaIcon} alt="Yoga" /></li>
                    <li><img src={SwimIcon} alt="Swim" /></li>
                    <li><img src={BikeIcon} alt="Bike" /></li>
                    <li><img src={GymIcon} alt="Gym" /></li>
                </ul>
                <footer>Copyright, SportSee 2020</footer>
            </aside>

            {/* Contenu principal */}
            <main className="dashboard-main-content">
                {/* Bienvenue utilisateur */}
                <UserInfo user={userData} />

                {/* Contenu de la page */}
                <section className="dashboard-content">
                    {/* Graphique d'activité */}
                    <div className='activity-container'>
                        <div className="activity-chart">
                            <ActivityChart data={activityData} />
                        </div>

                        <div className='charts-container'>
                            {/* Graphique de la durée moyenne des sessions */}
                            <div className="average-chart">
                                <AverageChart data={averageSessions} />
                            </div>

                            {/* Radar Chart */}
                            <div className="performance-radar-chart">
                                <PerformanceRadarChart data={performanceData} />
                            </div>

                            <div className="score-radial-chart">
                                <ScoreRadialChart score={userData.todayScore || userData.score} />
                            </div>
                        </div>
                    </div>


                    {/* Cartes statistiques */}
                    <div className="stats-cards">
                        <StatCard
                            icon={CaloriesIcon}
                            value={`${keyData.calorieCount}kCal`}
                            label="Calories"
                        />
                        <StatCard
                            icon={ProteinIcon}
                            value={`${keyData.proteinCount}g`}
                            label="Protéines"
                        />
                        <StatCard
                            icon={CarbsIcon}
                            value={`${keyData.carbohydrateCount}g`}
                            label="Glucides"
                        />
                        <StatCard
                            icon={FatIcon}
                            value={`${keyData.lipidCount}g`}
                            label="Lipides"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
