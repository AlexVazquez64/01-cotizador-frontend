import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clientesOpenModal,
  clientesSetActive,
} from '../../../actions/Clientes/clientesActions';

import {
  clienteStartDelete,
  clienteStartLoading
} from '../../../actions/Clientes/clientes';

import {
  clientesDataModal,
  clientesColumn
} from '../../../helpers/dataTables';

import Table from '../../../helpers/Table';
import ClienteModal from './ClienteModal';
import { paths } from '../../../helpers/paths'

import '../../../styles/components/_setup.css';

const ClienteScreen = () => {

  const dispatch = useDispatch();

  const {
    clientes,
    modalOpen,
    activeCliente
  } = useSelector( state => state.cliente );

  // const cli = useSelector( state => state.cliente );

  useEffect(() => {
    dispatch( clienteStartLoading() );
  }, [ dispatch ])
  
  const handleOpenModal = () => {
    dispatch( clientesOpenModal() );
  }

  const handleOnSelectRow = ( e ) => {
    dispatch( clientesSetActive( e ) );
    dispatch( clientesOpenModal() );
  }

  const handleDelete = ( e ) => {
    dispatch( clienteStartDelete( e ) );
  }

  return (
    <div className="setup__vista">
      <h1 className="text-center setup__h1-mb">Clientes</h1>

      <div className="text-end setup__mb">
        <button
          className="btn btn-primary"
          onClick={ handleOpenModal }
        >
          Nuevo
        </button>
      </div>

      <Table
        columnas={ clientesColumn }
        filas={ clientes }
        handleDelete={ handleDelete }
        handleOnSelectRow={ handleOnSelectRow }
        path={ paths.clientes }
      />

      <ClienteModal
        activeEvents={ activeCliente }
        modalOpen={ modalOpen }
        initState={ clientesDataModal }
      />

    </div>
  )
}

export default ClienteScreen
