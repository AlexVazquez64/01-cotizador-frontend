import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import CotizadorScreen from '../Components/cotizacion/CotizadorScreen';
import LoginScreen from '../Components/auth/LoginScreen'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Sidebar from '../Components/Sidebar/Sidebar';


const AppRouter = () => {

  const dispatch = useDispatch();
  const { isAutenticated } = useSelector( state => state.auth );
  // const uid = useSelector( state => state.auth );


  console.log(isAutenticated);

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/login"
            component={ LoginScreen }
            isAuthenticated={ !!isAutenticated }
          />

          <Route
            exact
            path="/"
            component={ CotizadorScreen }
            isAuthenticated={ isAutenticated }
          />

          <Route
            exact
            path="/articulos"
            component={ CotizadorScreen }
            isAuthenticated={ isAutenticated }
          />
          
          <Route
            exact
            path="/cotizaciones"
            component={ CotizadorScreen }
            isAuthenticated={ isAutenticated }
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
