import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  cotizacionesOpenModal,
  cotizacionSetActive,
} from '../../../actions/Cotizaciones/cotizacionesActions';

import {
  cotizacionStartDelete,
  cotizacionStartLoading,
} from '../../../actions/Cotizaciones/cotizaciones';

import {
  cotizacionesColumns,
  cotizacionesDataModal
} from '../../../helpers/dataTables';

import Table from '../../../helpers/Table';

import CotizacionModal from './CotizacionModal';

import '../../../styles/components/_setup.css';
import { detalleStartDelete, detalleStartLoading } from '../../../actions/Detalles/detalles';

const CotizacionScreen = () => {

  const dispatch = useDispatch();

  const {
    cotizaciones,
    modalOpen,
    activeCotizacion
  } = useSelector( state => state.cotizaciones );

  const { detalles } = useSelector( state => state.detalles );

  console.log(detalles);


  useEffect(() => {
    dispatch( detalleStartLoading() );
    dispatch( cotizacionStartLoading() );
  }, [ dispatch ])

  const handleOpenModal = () => {
    dispatch( cotizacionesOpenModal() );
  }

  const handleOnSelectRow = ( e ) => {
    dispatch( cotizacionSetActive( e ) );
    dispatch( cotizacionesOpenModal() );
  }

  const handleDelete = ( e ) => {

      dispatch( detalleStartDelete( e ) );

    
    dispatch( cotizacionStartDelete( e ) );
  }

  return (
    <div className="setup__vista">
      <h1 className="text-center setup__h1-mb">Cotizaciones</h1>

      <div className="text-end setup__mb">
        <button
          className="btn btn-primary"
          onClick={ handleOpenModal }
        >
          Nueva
        </button>
      </div>

      <Table
        columnas={ cotizacionesColumns }
        filas={ cotizaciones }
        handleDelete={ handleDelete }
        handleOnSelectRow={ handleOnSelectRow }
      />

      <CotizacionModal
        activeEvents={ activeCotizacion }
        modalOpen={ modalOpen }
        initState={ cotizacionesDataModal }
      />

    </div>
  )
}

export default CotizacionScreen
