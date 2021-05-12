import {
  types
} from '../types/types';

const initialState = {
  clientes: [
    // {
    //   id: 1,
    //   nombre: 'Usuario Ejemplo',
    //   rfc: 'Usuario Ejemplo',
    //   email: 'Usuario Ejemplo',
    //   telefono: 'Usuario Ejemplo',
    //   contacto: 'Usuario Ejemplo',
    //   direccion: 'Usuario Ejemplo',
    //   telefono_contacto: 'Usuario Ejemplo',
    //   descuento: 15
    // }
  ],
  activeCliente: null
};

export const clienteReducer = (state = initialState, action) => {

  switch ( action.type  ) {
    case types.clientesOpenModal:
      return {
        ...state,
        modalOpen: true
      }

    case types.clientesCloseModal:
      return {
        ...state,
        modalOpen: false
      }

    case types.clientesSetActive:
      return {
        ...state,
        activeCliente: action.payload
      }

    case types.clientesClearActive:
      return {
        ...state,
        activeCliente: null
      }

    case types.clienteAddNew:
      return {
        ...state,
        clientes: [
          ...state.clientes,
          action.payload
        ]
      }

    case types.clienteUpdated:
      return {
        ...state,
        clientes: state.clientes.map(
          p => ( p.id === action.payload.id ) ? action.payload : p
        )
      }

    case types.clienteDeleted:
      return {
        ...state,
        clientes: state.clientes.filter(
          p => ( p.id !== action.payload.id )
        )
      }

    case types.clientesLoaded:
      return {
        ...state,
        clientes: [ ...action.payload ]
      }
      
    default:
      return state;
  }

}