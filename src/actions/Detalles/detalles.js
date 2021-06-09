import Swal from 'sweetalert2';

import { fetchWithoutToken } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';

import {
  detalleAddNew,
  detalleDeleted,
  detalleUpdated,
  detalleLoaded,
} from './detallesAction';

export const detalleStartAddNew = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( 'detalles', event, 'POST' );
      const body = await resp.json();

      if ( body.ok ) {

        dispatch( detalleAddNew( event ) );
        dispatch( detalleStartLoading() );

        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   text: body.message,
        //   showConfirmButton: true,
        // });

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

export const detalleStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithoutToken(`detalles/${ event.id }`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {

        dispatch(detalleUpdated(event));
        dispatch(detalleStartLoading());
        
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

    } catch ( error ) {
      Swal.fire('Error', error, 'error');
    }
  }
}

export const detalleStartDelete = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( `detalles/${ event.id }`, {}, 'DELETE' );
      const body = await resp.json();

      if ( body.ok ) {
        dispatch( detalleDeleted( event ) );
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: body.message,
          showConfirmButton: true,
        });

        dispatch( detalleStartLoading() );
        
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

export const detalleStartLoading = () => {
  return async ( dispatch ) => {
    try {
      const resp = await fetchWithoutToken('detalles');
      const body = await resp.json();
      const detalles = prepareEvents( body.Detalles );
      
      dispatch( detalleLoaded( detalles ) );

    } catch ( error ) {
      console.error( error )
    }

  }
}