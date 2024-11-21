import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div>
            <h1>Bonjour, {user.userInfos.firstName}</h1>
            <p>Score aujourd'hui : {user.todayScore * 100}%</p>
            <p>Calories : {user.keyData.calorieCount}</p>
            <p>Protéines : {user.keyData.proteinCount}g</p>
            <p>Glucides : {user.keyData.carbohydrateCount}g</p>
            <p>Lipides : {user.keyData.lipidCount}g</p>
        </div>
    );
};

export default UserInfo;

