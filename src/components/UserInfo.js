import React from 'react';

const UserInfo = ({ user }) => {

    if (!user || !user.userInfos) {
        return <p>Les données utilisateur ne sont pas disponibles.</p>;
    }

    return (
        <div className='welcome-username'>
            <h2>Bonjour
                <span> {user.userInfos.firstName}</span>
            </h2>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
};

export default UserInfo;



