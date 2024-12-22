import React from 'react';
import { Link } from 'react-router-dom'; // Import du Link pour la navigation
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import './NotFound.css';

const NotFound = () => {
    return (

        <div className='dashboard-layout'>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='not-found-main-content'>
                <h1>404</h1>
                <p>Page non trouvée</p>
                <Link to="/user/12">
                    Retourner à votre tableau de bord
                </Link>
            </div>

        </div>
    );
};

export default NotFound;

