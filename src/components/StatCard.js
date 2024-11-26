import React from 'react';

const StatCard = ({ icon, value, label }) => {
    return (

        <div className="stat-card">
            <img src={icon} alt={`${label} icon`} />
            <div>
                <p>{value}</p>
                <p>{label}</p>
            </div>
        </div>
    );
};

export default StatCard;
