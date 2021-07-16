import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import CotizadorScreen from '../Components/cotizacion/CotizadorScreen';
import LoginScreen from '../Components/auth/LoginScreen'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {

  const { isAutenticated } = useSelector( state => state.auth );

  return (
    <Router>
      <div>
          <PublicRoute
            exact
            path="/login"
            component={ LoginScreen }
            isAuthenticated={ !!isAutenticated }
          />

          <PrivateRoute
            exact
            path="/"
            component={ CotizadorScreen }
            isAuthenticated={ isAutenticated }
          />

          <PrivateRoute
            exact
            path="/articulos"
            component={ CotizadorScreen }
            isAuthenticated={ isAutenticated }
          />
          
          <PrivateRoute
            exact
            path="/cotizaciones"
            component={ CotizadorScreen }
            isAuthenticated={ isAutenticated }
          />

          <Redirect to="/login" />
      </div>
    </Router>
  )
}

export default AppRouter
