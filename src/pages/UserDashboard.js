import React, { useState, useEffect } from 'react'; // React et hooks
import {
    getUserData,
    getUserActivity,
    getUserAverageSessions,
    getUserPerformance
} from '../services/api'; // Services API
import ActivityChart from '../components/ActivityChart'; // Graphique
import UserInfo from '../components/UserInfo'; // Informations utilisateur
import StatCard from '../components/StatCard'; // Cartes statistiques
import './UserDashboard.css'; // Fichier CSS dédié

import SportSeeLogo from '../assets/logos/sportseelogo.png'
import CaloriesIcon from '../assets/icons/calories-icon.png';
import ProteinIcon from '../assets/icons/protein-icon.png';
import CarbsIcon from '../assets/icons/carbs-icon.png';
import FatIcon from '../assets/icons/fat-icon.png';
import YogaIcon from '../assets/icons/yoga-icon.png';
import SwimIcon from '../assets/icons/swim-icon.png';
import BikeIcon from '../assets/icons/bike-icon.png';
import GymIcon from '../assets/icons/gym-icon.png';




const UserDashboard = () => {
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
                <header>
                    <h1>
                        Bonjour <span>Thomas</span>
                    </h1>
                    <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                </header>

                <section className="dashboard-content">
                    <div className="activity-chart">
                        {/* Ajoutez ici le graphique de l'activité */}
                    </div>
                    <div className="stats-cards">
                        <StatCard icon={CaloriesIcon} value="1,930kCal" label="Calories" />
                        <StatCard icon={ProteinIcon} value="155g" label="Protéines" />
                        <StatCard icon={CarbsIcon} value="290g" label="Glucides" />
                        <StatCard icon={FatIcon} value="50g" label="Lipides" />
                    </div>
                </section>
            </main>
        </div>


    );
};

export default UserDashboard;

