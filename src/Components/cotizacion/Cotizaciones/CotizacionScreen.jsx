import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  cotizacionesOpenModal,
  cotizacionSetActive,
} from '../../../actions/Cotizaciones/cotizacionesActions';

import {
  cotizacionStartDelete,
  cotizacionStartLoading,
  cotizacionStartPDF,
  sendMailPDFStart,
} from '../../../actions/Cotizaciones/cotizaciones';

import {
  cotizacionesColumns,
  cotizacionesDataModal
} from '../../../helpers/dataTables';

import Table from '../../../helpers/Table';

import CotizacionModal from './CotizacionModal';

import { detalleStartDelete, detalleStartLoading } from '../../../actions/Detalles/detalles';

import { clienteStartLoading } from '../../../actions/Clientes/clientes';
import { articuloStartLoading } from '../../../actions/Articulos/articulos';

import '../../../styles/components/_setup.css';
import '../../../styles/loader/loader.css';

const CotizacionScreen = ( props ) => {

  const dispatch = useDispatch();
  

  const {
    cotizaciones,
    modalOpen,
    activeCotizacion,
    cotizacionesLoaded
  } = useSelector( state => state.cotizaciones );

  useEffect(() => {
    dispatch( detalleStartLoading() );
    dispatch( cotizacionStartLoading() );
    dispatch( clienteStartLoading() );
    dispatch( articuloStartLoading() );
  }, [ dispatch ])

  const handleOpenModal = () => {
    dispatch( cotizacionesOpenModal() );
  }

  const handleOnSelectRow = ( e ) => {
    dispatch( cotizacionSetActive( e ) );
    dispatch( cotizacionesOpenModal() );
  }

  const handleOpenPDF = ( e ) => {
    dispatch( cotizacionStartPDF( e ) );
  }

  const handleSendMailPDF = ( e ) => {
    dispatch( sendMailPDFStart( e ) );
  }

  const handleDelete = ( e ) => {
    dispatch( detalleStartDelete( e ) );
    dispatch( cotizacionStartDelete( e ) );
  }

  return (
    <div className="setup__vista">
      <h1 className="text-center setup__h1-mb">Cotizaciones</h1>

      <div className="setup__mb">
        <button
          className="btn btn-primary"
          onClick={ handleOpenModal }
        >
          Nueva
        </button>
      </div>

      {( cotizacionesLoaded ) ? 

      <Table
        columnas={ cotizacionesColumns }
        filas={ cotizaciones }
        handleDelete={ handleDelete }
        handleOnSelectRow={ handleOnSelectRow }
        handleOpenPDF={ handleOpenPDF }
        handleSendMailPDF={ handleSendMailPDF }
        pathname={ props.pathname }
      />
      :
      <div className="lds-dual-ring"></div>}

      <CotizacionModal
        activeEvents={ activeCotizacion }
        modalOpen={ modalOpen }
        initState={ cotizacionesDataModal }
      />

    </div>
  )
}

export default CotizacionScreen
