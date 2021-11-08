import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    const authService = require('../services/authentication.service');
    return (
        <Route
            { ...rest }
            render={ (props) => authService.userLoggedIn()
                ? children
                : <Redirect to={ { pathname: '/login', state: { from: props.location } } }/> }
        />
    )
}

export default PrivateRoute
