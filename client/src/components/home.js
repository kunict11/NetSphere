import { Button } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

function Home(props) {
    const authService = require('../services/authentication.service');
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const logout = () => {
        authService.logout();
        setRedirectToLogin(true);
    };

    if(redirectToLogin) {
        return <Redirect to={ '/login' }/>
    }

    return (
        <div>
            Welcome
            <Button onClick={ logout }>Log out</Button>
        </div>
    )
}

export default Home
