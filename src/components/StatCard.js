import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, value, label }) => {
    return (

        <div className="stat-card">
            <img className='stat-card-icon' src={icon} alt={`${label} icon`} />
            <div>
                <p className='stat-card-value'>{value}</p>
                <p className='stat-card-label'>{label}</p>
            </div>
        </div>
    );
};

export default StatCard;
