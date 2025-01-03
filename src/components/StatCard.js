import React from 'react';
import './StatCard.css';

// Liste des icônes
import CaloriesIcon from '../assets/icons/calories-icon.png';
import ProteinIcon from '../assets/icons/protein-icon.png';
import CarbsIcon from '../assets/icons/carbs-icon.png';
import FatIcon from '../assets/icons/fat-icon.png';

// Dictionnaire des icônes
const ICONS = {
    calories: CaloriesIcon,
    protein: ProteinIcon,
    carbs: CarbsIcon,
    fat: FatIcon,
};

const StatCard = ({ type, value, label }) => {

    const icon = ICONS[type] || ICONS['calories'];

    return (
        <div className="stat-card">
            <img className="stat-card-icon" src={icon} alt={`${label} icon`} />
            <div>
                <p className="stat-card-value">{value}</p>
                <p className="stat-card-label">{label}</p>
            </div>
        </div>
    );
};

export default StatCard;

