import Swal from 'sweetalert2';

import { fetchWithoutToken } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';
import {
  articuloAddNew,
  articuloDeleted,
  articuloUpdated,
  articulosLoaded
} from './articulosAction';

export const articuloStartAddNew = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( 'articulos', event, 'POST' );
      const body = await resp.json();

      if ( body.ok ) {

        dispatch( articuloAddNew( event ) );
        dispatch( articuloStartLoading() );

        Swal.fire({
          position: 'center',
          icon: 'success',
          text: body.message,
          showConfirmButton: true,
        });

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: body.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  }
}

export const articuloStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithoutToken(`articulos/${ event.id }`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {

        dispatch(articuloUpdated(event));
        dispatch(articuloStartLoading());
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha actualizado con éxito',
          showConfirmButton: true,
        });

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: body.message,
          showConfirmButton: true,
        });
      }

    } catch ( error ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: error,
        showConfirmButton: true,
      });
    }
  }
}

export const articuloStartDelete = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( `articulos/${ event.id }`, {}, 'DELETE' );
      const body = await resp.json();

      if ( body.ok ) {
        dispatch( articuloDeleted( event ) );
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha eliminado con éxito',
          showConfirmButton: true,
        });

        dispatch( articuloStartLoading( ) );
        
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: body.message,
          showConfirmButton: true,
        });
      }

    } catch ( error ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: error,
        showConfirmButton: true,
      });
    }
  }
}

export const articuloStartLoading = () => {
  return async (dispatch) => {

    try {

      const resp = await fetchWithoutToken('articulos');
      const body = await resp.json();

      const articulos = prepareEvents( body.articulo );
      
      dispatch( articulosLoaded( articulos ) );

    } catch (error) {
      console.log(error)
    }

  }
}