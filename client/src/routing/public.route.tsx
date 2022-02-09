import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import AuthenticationService from '../services/authentication.service';

function PublicRoute({ children, ...rest }: any) {
    return (
        <Route
            { ...rest }
            render={ (props: RouteComponentProps) => !AuthenticationService.userLoggedIn()
                ? children
                : <Redirect to={ { pathname:'/', state: { from: props.location } } } /> }
        />
    )
}

export default PublicRoute
