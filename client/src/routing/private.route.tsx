import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from '../services/authentication.service';

function PrivateRoute({ children, ...rest }: any) {
    return (
        <Route
            { ...rest }
            render={ (props) => AuthenticationService.userLoggedIn()
                ? children
                : <Redirect to={ { pathname: '/login', state: { from: props.location } } }/> }
        />
    )
}

export default PrivateRoute
