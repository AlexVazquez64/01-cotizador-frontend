import {
  types
} from '../types/types';

const initialState = {
  cotizaciones: [
    // {
    //   id: 1,
    //   descripcion: 'Ejemplo',
    //   fecha_validez: 'Ejemplo',

    // }
  ],
  activeCotizacion: null
};

export const cotizacionesReducer = (state = initialState, action) => {

  switch ( action.type  ) {
    case types.cotizacionesOpenModal:
      return {
        ...state,
        modalOpen: true
      }

    case types.cotizacionesCloseModal:
      return {
        ...state,
        modalOpen: false
      }

    case types.cotizacionSetActive:
      return {
        ...state,
        activeCotizacion: action.payload
      }

    case types.cotizacionClearActive:
      return {
        ...state,
        activeCotizacion: null
      }

    case types.cotizacionAddNew:
      return {
        ...state,
        cotizaciones: [
          ...state.cotizaciones,
          action.payload
        ]
      }

    case types.cotizacionUpdated:
      return {
        ...state,
        cotizaciones: state.cotizaciones.map(
          p => ( p.id === action.payload.id ) ? action.payload : p
        )
      }

    case types.cotizacionDeleted:
      return {
        ...state,
        cotizaciones: state.cotizaciones.filter(
          p => ( p.id !== action.payload.id )
        )
      }

    case types.cotizacionesLoaded:
      return {
        ...state,
        cotizaciones: [ ...action.payload ]
      }
      
    default:
      return state;
  }

}