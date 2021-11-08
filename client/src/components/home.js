import React from 'react'

function Home(props) {
    const authService = require('../services/authentication.service');

    const logout = () => {
        authService.logout();
    };

    return (
        <div>
            Welcome
            <button onClick={ logout }>Log out</button>
        </div>
    )
}

export default Home
