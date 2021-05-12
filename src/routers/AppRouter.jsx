import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import CotizadorScreen from '../Components/cotizacion/CotizadorScreen';

const AppRouter = () => {

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={ CotizadorScreen }
          />

          <Route
            path="/articulos"
            component={ CotizadorScreen }
          />

          <Route
            path="/cotizaciones"
            component={ CotizadorScreen }
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
