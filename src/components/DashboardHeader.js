import React from 'react';
import { Link } from 'react-router-dom';
import SportSeeLogo from '../assets/logos/sportseelogo.png';
import './DashboardHeader.css';

const DashboardHeader = () => {
    return (
        <header className="dashboard-header">
            <h1 className="main-logo">
                <img src={SportSeeLogo} alt="SportSee" />
            </h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/profile">Profil</Link></li>
                    <li><Link to="/settings">Réglage</Link></li>
                    <li><Link to="/community">Communauté</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default DashboardHeader;
