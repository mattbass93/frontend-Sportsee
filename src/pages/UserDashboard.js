import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import du hook useParams
import ActivityChart from '../components/ActivityChart';
import AverageChart from '../components/AverageChart';
import PerformanceRadarChart from '../components/PerformanceRadarChart';
import ScoreRadialChart from '../components/ScoreRadialChart';
import StatCard from '../components/StatCard';
import UserInfo from '../components/UserInfo';

import './UserDashboard.css';

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
    const { id } = useParams(); // Récupère l'ID utilisateur depuis l'URL
    const [userData, setUserData] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const [averageSessions, setAverageSessions] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            // Récupère les données utilisateur
            const userResponse = await fetch(`http://localhost:3000/user/${id}`);
            const userJson = await userResponse.json();
            setUserData(userJson.data);

            // Récupère les données d'activité
            const activityResponse = await fetch(`http://localhost:3000/user/${id}/activity`);
            const activityJson = await activityResponse.json();
            setActivityData(activityJson.data.sessions);

            // Récupère les données des sessions moyennes
            const averageSessionsResponse = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
            const averageSessionsJson = await averageSessionsResponse.json();
            setAverageSessions(averageSessionsJson.data.sessions);

            // Récupère les données de performance
            const performanceResponse = await fetch(`http://localhost:3000/user/${id}/performance`);
            const performanceJson = await performanceResponse.json();
            const formattedPerformanceData = performanceJson.data.data.map((item) => ({
                ...item,
                kind: performanceJson.data.kind[item.kind],
            }));
            setPerformanceData(formattedPerformanceData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!userData || !userData.keyData || !activityData.length || !averageSessions.length || !performanceData.length) {
        return <p>Chargement des données utilisateur...</p>;
    }

    const { keyData } = userData;

    return (
        <div className="dashboard-layout">
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
            <aside className="dashboard-sidebar">
                <ul>
                    <li><img src={YogaIcon} alt="Yoga" /></li>
                    <li><img src={SwimIcon} alt="Swim" /></li>
                    <li><img src={BikeIcon} alt="Bike" /></li>
                    <li><img src={GymIcon} alt="Gym" /></li>
                </ul>
                <footer>Copyright, SportSee 2020</footer>
            </aside>
            <main className="dashboard-main-content">
                <UserInfo user={userData} />
                <section className="dashboard-content">
                    <div className="activity-container">
                        <ActivityChart data={activityData} />
                        <div className="charts-container">
                            <AverageChart data={averageSessions} />
                            <PerformanceRadarChart data={performanceData} />
                            <ScoreRadialChart score={userData.todayScore || userData.score} />
                        </div>
                    </div>
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
