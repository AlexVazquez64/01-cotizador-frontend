import {
  types
} from '../types/types';

const initialState = {
  detalles: [
    // {
    //   id: 1,
    //   descripcion: 'Ejemplo',
    //   fecha_validez: 'Ejemplo',

    // }
  ],
  activeDetalle: null
};

export const detalleReducer = (state = initialState, action) => {

  switch ( action.type  ) {
    case types.detallesOpenModal:
      return {
        ...state,
        modalOpen: true
      }

    case types.detallesCloseModal:
      return {
        ...state,
        modalOpen: false
      }

    case types.detalleSetActive:
      return {
        ...state,
        activeDetalle: action.payload
      }

    case types.detalleClearActive:
      return {
        ...state,
        activeDetalle: null
      }

    case types.detalleAddNew:
      return {
        ...state,
        detalles: [
          ...state.detalles,
          action.payload
        ]
      }

    case types.detalleUpdated:
      return {
        ...state,
        detalles: state.detalles.map(
          p => ( p.id === action.payload.id ) ? action.payload : p
        )
      }

    case types.detalleDeleted:
      return {
        ...state,
        detalles: state.detalles.filter(
          p => ( p.id !== action.payload.id )
        )
      }

    case types.detalleLoaded:
      return {
        ...state,
        detalles: [ ...action.payload ]
      }
      
    default:
      return state;
  }

}