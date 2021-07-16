import Swal from 'sweetalert2';

import moment from 'moment';
import { fetchWithoutToken } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';

import {
  cotizacionAddNew,
  cotizacionDeleted,
  cotizacionUpdated,
  cotizacionesLoaded,
  cotizacionOpenPDF,
  cotizacionSendMailPDF,
} from './cotizacionesActions';

moment().format();

export const cotizacionStartPDF = ( event ) => {
  return async ( dispatch ) => {
    try {

      const resp = await fetchWithoutToken( `cotizaciones/cotizacion-${ event.id }-${ moment( event.createdAt ).format( 'DD[-]MMM[-]YY' ) }.pdf`, event, 'GET' );

      if ( resp.ok ) {

        dispatch( cotizacionOpenPDF( resp ) );

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Error al entrar a cotizacionStartPDF',
          showConfirmButton: true,
        });
      }

    } catch ( error ) {
      // Swal.fire('Error', error, 'error');
      console.log('Hablar con el administrador: 1', error)
    }
  }
}

export const sendMailPDFStart = ( event ) => {
  return async ( dispatch ) => {
    try {

      const resp = await fetchWithoutToken( `sendMail/cotizaciones/${ event.id }`, event, 'GET' );

      if ( resp.ok ) {

        dispatch( cotizacionSendMailPDF(resp) );
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Se ha enviado con éxito',
          showConfirmButton: true,
        });

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Error al entrar a sendMailPDFStart',
          showConfirmButton: true,
        });
      }

    } catch ( error ) {
      console.log('Hablar con el administrador: 2', error)
    }
  }
}

export const cotizacionStartAddNew = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      const resp = await fetchWithoutToken( 'cotizaciones', event, 'POST' );
      const body = await resp.json();

      if ( body.ok ) {

        dispatch( cotizacionAddNew( event ) );
        dispatch( cotizacionStartLoading() );

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