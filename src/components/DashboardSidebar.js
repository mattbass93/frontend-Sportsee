import React from 'react';
import YogaIcon from '../assets/icons/yoga-icon.png';
import SwimIcon from '../assets/icons/swim-icon.png';
import BikeIcon from '../assets/icons/bike-icon.png';
import GymIcon from '../assets/icons/gym-icon.png';
import './DashboardSidebar.css'; // Ajoutez un fichier CSS pour les styles

const DashboardSidebar = () => {
    return (
        <aside className="dashboard-sidebar">
            <ul>
                <li><img src={YogaIcon} alt="Yoga" /></li>
                <li><img src={SwimIcon} alt="Swim" /></li>
                <li><img src={BikeIcon} alt="Bike" /></li>
                <li><img src={GymIcon} alt="Gym" /></li>
            </ul>
            <footer>Copyright, SportSee 2020</footer>
        </aside>
    );
};

export default DashboardSidebar;
