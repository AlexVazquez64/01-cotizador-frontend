import {
  types
} from '../types/types';

const initialState = {
  articulos: [
    // {
    //   id: 1,
    //   nombre: 'Articulo ejemplo',
    //   descripcion: 'Descripción ejemplo',
    //   unidad_venta: 'Unidad de venta ejemplo',
    //   tipo_articulo: 'Tipo de articulo ejemplo',
    //   descripcion_larga: 'Descripción larga ejemplo',
    //   precio_unitario: 60.00,
    //   costo: 45.00,

    // }
  ],
  activeArticulo: null,
  articulosLoaded: null
};

export const articulosReducer = (state = initialState, action) => {

  switch ( action.type  ) {
    case types.articulosOpenModal:
      return {
        ...state,
        modalOpen: true
      }

    case types.articulosCloseModal:
      return {
        ...state,
        modalOpen: false
      }

    case types.articulosSetActive:
      return {
        ...state,
        activeArticulo: action.payload
      }

    case types.articulosClearActive:
      return {
        ...state,
        activeArticulo: null
      }

    case types.articuloAddNew:
      return {
        ...state,
        articulos: [
          ...state.articulos,
          action.payload
        ]
      }

    case types.clienteUpdated:
      return {
        ...state,
        articulos: state.articulos.map(
          p => ( p.id === action.payload.id ) ? action.payload : p
        )
      }

    case types.articuloDeleted:
      return {
        ...state,
        articulos: state.articulos.filter(
          p => ( p.id !== action.payload.id )
        )
      }

    case types.articulosLoaded:
      return {
        ...state,
        articulos: [ ...action.payload ],
        articulosLoaded: true
      }
      
    default:
      return state;
  }

}