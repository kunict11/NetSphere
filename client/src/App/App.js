import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import PrivateRoute from '../routing/private.route';

const authService = require('../services/authentication.service');

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <PrivateRoute path='/' exact isLoggedIn={ authService.userLoggedIn() } component={ Home }/>
        <Route path='/login' isLoggedIn={ authService.userLoggedIn() } component={ Login }/>
        <Route path='/register' isLoggedIn={ authService.userLoggedIn() } component={ Register }/>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
