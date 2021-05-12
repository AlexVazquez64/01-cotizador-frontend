import { combineReducers } from 'redux';

import { clienteReducer } from './clienteReducer';
import { articulosReducer } from './articulosReducer';
import { cotizacionesReducer } from './cotizacionesReducer';
import { detalleReducer } from './detalleReducer';

export const rootReducer = combineReducers({
  cliente: clienteReducer,
  articulos: articulosReducer,
  cotizaciones: cotizacionesReducer,
  detalles: detalleReducer,

  // TODO SETUP REDUCER
});