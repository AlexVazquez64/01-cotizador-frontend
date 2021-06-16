import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  articulosOpenModal,
  articuloSetActive,
} from '../../../actions/Articulos/articulosAction';

import {
  articulosDataModal,
  articulosColumns
} from '../../../helpers/dataTables';

import {
  articuloStartDelete,
  articuloStartLoading
} from '../../../actions/Articulos/articulos';

import Table from '../../../helpers/Table';
import ArticulosModal from './ArticulosModal';
import { paths } from '../../../helpers/paths'

import '../../../styles/components/_setup.css';
import '../../../styles/loader/loader.css';

const ArticuloScreen = () => {

  const dispatch = useDispatch();

  const {
    articulos,
    modalOpen,
    activeArticulo,
    articulosLoaded
  } = useSelector( state => state.articulos );

  useEffect(() => {
    dispatch( articuloStartLoading() );
  }, [ dispatch ])

  const handleOpenModal = () => {
    dispatch( articulosOpenModal() );
  }

  const handleOnSelectRow = ( e ) => {
    dispatch( articuloSetActive( e ) );
    dispatch( articulosOpenModal() );
  }

  const handleDelete = ( e ) => {
    dispatch( articuloStartDelete( e ) );
  }

  return (
    <div className="setup__vista">
      <h1 className="text-center setup__h1-mb">Articulos</h1>
      <div className="text-end setup__mb">
        <button
          className="btn btn-primary"
          onClick={ handleOpenModal }
        >
          Nuevo
        </button>
      </div>
      {( articulosLoaded ) ? 

      <Table
        columnas={ articulosColumns }
        filas={ articulos }
        handleDelete={ handleDelete }
        handleOnSelectRow={ handleOnSelectRow }
        path={ paths.articulos }
      />
      :
      <div className="lds-dual-ring"></div>
      }
      <ArticulosModal
        activeEvents={ activeArticulo }
        modalOpen={ modalOpen }
        initState={ articulosDataModal }
      />

    </div>
  )
}

export default ArticuloScreen
