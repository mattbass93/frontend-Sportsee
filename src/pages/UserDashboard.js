import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    getUserData,
    getUserActivity,
    getUserAverageSessions,
    getUserPerformance,
} from '../services/api';
import ActivityChart from '../components/ActivityChart';
import AverageChart from '../components/AverageChart';
import PerformanceRadarChart from '../components/PerformanceRadarChart';
import ScoreRadialChart from '../components/ScoreRadialChart';
import StatCard from '../components/StatCard';
import UserInfo from '../components/UserInfo';

import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';

import './UserDashboard.css';

const UserDashboard = () => {
    const { id } = useParams(); // Récupère l'ID utilisateur depuis l'URL
    const [userData, setUserData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [averageSessions, setAverageSessions] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);
    const [error, setError] = useState(false); // État d'erreur pour afficher le message

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [user, activity, average, performance] = await Promise.allSettled([
                    getUserData(id),
                    getUserActivity(id),
                    getUserAverageSessions(id),
                    getUserPerformance(id),
                ]);

                if (user.status === 'fulfilled' && user.value?.data) {
                    setUserData(user.value.data);
                } else {
                    throw new Error(`Utilisateur avec l'ID ${id} introuvable`);
                }

                if (activity.status === 'fulfilled') setActivityData(activity.value.data.sessions || []);
                if (average.status === 'fulfilled') setAverageSessions(average.value.data.sessions || []);
                if (performance.status === 'fulfilled') {
                    setPerformanceData(
                        (performance.value.data.data || []).map((item) => ({
                            ...item,
                            kind: performance.value.data.kind[item.kind],
                        }))
                    );
                }
            } catch (err) {
                console.error(err.message);
                setError(true); // Active l'état d'erreur
            }
        };

        fetchAllData();
    }, [id]);

    if (error) {
        return (
            <div className="dashboard-layout">
                <DashboardHeader />
                <DashboardSidebar />
                <main className="dashboard-main-content">
                    <p className="error-message">
                        L'utilisateur avec l'ID <strong>{id}</strong> est introuvable.
                    </p>
                    <p>Données indisponibles.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <DashboardHeader />
            <DashboardSidebar />
            <main className="dashboard-main-content">
                {userData && <UserInfo user={userData} />}
                <section className="dashboard-content">
                    <div className="activity-container">
                        <ActivityChart data={activityData || []} />
                        {averageSessions && averageSessions.length > 0 && performanceData ? (
                            <div className="charts-container">
                                <AverageChart data={averageSessions} />
                                <PerformanceRadarChart data={performanceData} />
                                <ScoreRadialChart score={userData?.todayScore || userData?.score || 0} />
                            </div>
                        ) : (
                            <p className="no-data-message">Données des graphiques non disponibles</p>
                        )}
                    </div>
                    <div className="stats-cards">
                        <StatCard
                            type="calories"
                            value={`${userData?.keyData?.calorieCount || 0}kCal`}
                            label="Calories"
                        />
                        <StatCard
                            type="protein"
                            value={`${userData?.keyData?.proteinCount || 0}g`}
                            label="Protéines"
                        />
                        <StatCard
                            type="carbs"
                            value={`${userData?.keyData?.carbohydrateCount || 0}g`}
                            label="Glucides"
                        />
                        <StatCard
                            type="fat"
                            value={`${userData?.keyData?.lipidCount || 0}g`}
                            label="Lipides"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
