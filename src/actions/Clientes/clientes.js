import Swal from 'sweetalert2';

import { fetchWithoutToken } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';
import {
  clienteDeleted,
  clienteAddNew,
  clienteUpdated,
  clientesLoaded
} from '../Clientes/clientesActions';

export const clienteStartAddNew = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( 'clientes', event, 'POST' );
      const body = await resp.json();

      if ( body.ok ) {

        dispatch( clienteAddNew( event ) );
        dispatch( clienteStartLoading() );

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
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: error,
        showConfirmButton: true,
      });
    }
  }
}

export const clienteStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithoutToken(`clientes/${ event.id }`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {

        dispatch(clienteUpdated(event));
        dispatch(clienteStartLoading());
        
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

export const clienteStartDelete = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithoutToken(`clientes/${ event.id }`, {}, 'DELETE');
      const body = await resp.json();

      if ( body.ok ) {

        dispatch(clienteDeleted(event));
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: body.message,
          showConfirmButton: true,
        });

        dispatch(clienteStartLoading());
        
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

export const clienteStartLoading = () => {
  return async (dispatch) => {
    try {

      const resp = await fetchWithoutToken('clientes');
      const body = await resp.json();

      const clientes = prepareEvents( body.clientes );
      dispatch( clientesLoaded( clientes ) );

    } catch (error) {
      console.log(error)
    }

  }
}
