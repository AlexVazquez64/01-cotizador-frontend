import { combineReducers } from 'redux';

import { clienteReducer } from './clienteReducer';
import { articulosReducer } from './articulosReducer';
import { cotizacionesReducer } from './cotizacionesReducer';
import { detalleReducer } from './detalleReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  cliente: clienteReducer,
  articulos: articulosReducer,
  cotizaciones: cotizacionesReducer,
  detalles: detalleReducer,
  auth: authReducer,

  // TODO SETUP REDUCER
});