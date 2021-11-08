import { Route, Redirect } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';

function PrivateRoute({ component, isLoggedIn, ...rest }) {
    return (
        <Route
            { ...rest }
            render={ (props) => isLoggedIn
                ? <Home {...props}/> 
                : <Redirect to={ { pathname: '/login', state: { from: props.location } } }/> }
        />
    )
}

export default PrivateRoute
