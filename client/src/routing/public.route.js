import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ children, isLoggedIn, ...rest }) {
    const authService = require('../services/authentication.service');
    return (
        <Route
            { ...rest }
            render={ (props) => !authService.userLoggedIn()
                ? children
                : <Redirect to={ { pathname:'/', state: { from: props.location } } } /> }
        />
    )
}

export default PublicRoute
