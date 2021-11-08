import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import PrivateRoute from '../routing/private.route';
import PublicRoute from '../routing/public.route';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <PrivateRoute path='/' exact>
          <Home/>
        </PrivateRoute>
        <PublicRoute path='/login'>
          <Login/>
        </PublicRoute>
        <PublicRoute path='/register'>
          <Register/>
        </PublicRoute>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
