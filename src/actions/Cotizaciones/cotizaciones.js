import Swal from 'sweetalert2';

import { fetchWithoutToken } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';

import {
  cotizacionAddNew,
  cotizacionDeleted,
  cotizacionUpdated,
  cotizacionesLoaded,
} from './cotizacionesActions';

export const cotizacionStartAddNew = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( 'cotizaciones', event, 'POST' );
      const body = await resp.json();

      if ( body.ok ) {

        dispatch( cotizacionAddNew( event ) );
        dispatch( cotizacionStartLoading() );

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

export const cotizacionStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithoutToken(`cotizaciones/${ event.id }`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {

        dispatch(cotizacionUpdated(event));
        dispatch(cotizacionStartLoading());
        
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

export const cotizacionStartDelete = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( `cotizaciones/${ event.id }`, {}, 'DELETE' );
      const body = await resp.json();

      if ( body.ok ) {
        dispatch( cotizacionDeleted( event ) );
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: body.message,
          showConfirmButton: true,
        });

        dispatch( cotizacionStartLoading() );
        
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

export const cotizacionStartLoading = () => {
  return async ( dispatch ) => {
    try {
      const resp = await fetchWithoutToken('cotizaciones');
      const body = await resp.json();

      const cotizaciones = prepareEvents( body.cotizacion );
      dispatch( cotizacionesLoaded( cotizaciones ) );

    } catch ( error ) {
      console.log( error )
    }

  }
}