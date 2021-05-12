import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Modal from 'react-modal'

// Actions de las cotizaciones

import {
  cotizacionClearActive,
  cotizacionesCloseModal,
  cotizacionSetActive,
} from '../../../actions/Cotizaciones/cotizacionesActions'

import {
  cotizacionStartAddNew,
  cotizacionStartUpdate
} from '../../../actions/Cotizaciones/cotizaciones'

// FIN Actions de las cotizaciones

import { clienteStartLoading } from '../../../actions/Clientes/clientes'

// Actions del detalle

import {
  detallesOpenModal
} from '../../../actions/Detalles/detallesAction'

import { detalleStartDelete, detalleStartLoading } from '../../../actions/Detalles/detalles'

import DetalleModal from '../Detalles/DetalleModal';

import { detalleDataModal } from '../../../helpers/dataTables'

// FIN Actions del detalle

import useForm from '../../../hooks/useForm'

import { customStyles } from '../../../helpers/center-modal-styles'

import '../../../styles/components/_modal.css'
import '../../../styles/components/cotizaciones.css'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const CotizacionModal = ( props ) => {

  const dispatch = useDispatch();

  const { activeCotizacion, cotizaciones } = useSelector( state => state.cotizaciones )
  const { clientes } = useSelector( state => state.cliente )
  const { activeDetalle, detalles } = useSelector( state => state.detalles )

  const detalleSelector = useSelector( state => state.detalles )

  const lastID = cotizaciones.map( ( item ) => item.id ).pop()

  const lastCotizacion = cotizaciones.map( cotizacion => cotizacion ).pop()

  const {
    modalOpen,
    initState,
  } = props;

  const [
    formValues,
    handleInputChange,
    reset,
    setValues,
  ] = useForm( initState );

  let {
    id,
    cliente_id,
    descripcion,
    fecha_validez,
  } = formValues;

  if (cotizaciones.length === 0) {

  } else if ( cotizaciones.length > 0 && activeCotizacion === null ) {
    id = lastID + 1
  } else {
    id = activeCotizacion.id
  }

  const { articulos } = useSelector( state => state.articulos )

  useEffect(() => {

    dispatch( clienteStartLoading() );
    ( activeCotizacion ) ? setValues( activeCotizacion ) : setValues( initState )

  }, [ activeCotizacion, setValues, initState, dispatch ])

  const handleOpenModalDetalles = () => {
    dispatch( detallesOpenModal() )
  }

  const handleCloseModal = () => {
    reset()
    dispatch( cotizacionesCloseModal() )
    dispatch( cotizacionClearActive() )
  }

  const handleDelete = ( e ) => {
    dispatch( detalleStartDelete( e ) )
    dispatch( detalleStartLoading() )
  }

  const handleSubmitForm = ( e ) => {
    e.preventDefault();
    if ( activeCotizacion ) {
      dispatch( cotizacionStartUpdate({
        ...formValues,
      }) );
    } else if ( lastID ) {
      dispatch( cotizacionStartAddNew({
        ...formValues,
        id: lastID + 1
      }) );
      // dispatch( cotizacionSetActive( formValues ) )
    } else {
      dispatch( cotizacionStartAddNew({
        ...formValues,
      }) );
      // dispatch( cotizacionSetActive( formValues ) )
    }
    dispatch( cotizacionSetActive( lastCotizacion ) )
  }

  return (
    <>
      <Modal
        className="modal overflow-auto"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
        isOpen={ modalOpen }
        onRequestClose={ handleCloseModal }
        shouldCloseOnOverlayClick={ true }
        style={ customStyles }
      >
        <div className="row">
          <div className="col-md-12">
            <h3 className="auth__title">{ ( activeCotizacion ) ? `Editar Cotización`  : `Nueva Cotización` }</h3>
            <hr/>
            <form
              onSubmit={ handleSubmitForm }
              className="animate__animated animate__fadeIn animate__faster"
            >
              <div className="mb-2">
                <label htmlFor="id">Folio</label>
                <input
                  className="form-control"
                  id="id"
                  name="id"
                  readOnly
                  type="text"
                  defaultValue={ id }
                />
              </div>

              <div className="mb-2">
              <label htmlFor="cliente_id">Cliente</label>
                <select
                  className="form-control"
                  id="cliente_id"
                  name="cliente_id"
                  onChange={ handleInputChange }
                  defaultValue={ cliente_id }
                >
                <option defaultValue style={{ display: 'none' }}>
                  { ( activeCotizacion ) ? `${ activeCotizacion.descripcion }`  : `Selecciona el cliente` }
                </option>
                  {
                    clientes.map( ( item ) => (
                      <option
                        key={ item.id }
                        value={ item.id }
                      >
                        { item.nombre }
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="mb-2">
                <label htmlFor="descripcion">Descripción</label>
                  <input
                    className="form-control"
                    name="descripcion"
                    required
                    onChange={ handleInputChange }
                    placeholder="Descripción"
                    type="text"
                    value={ descripcion }
                  />
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="fecha_validez">Fecha Validez</label>
                  <input
                    className="form-control"
                    name="fecha_validez"
                    required
                    onChange={ handleInputChange }
                    placeholder="Fecha Validez"
                    type="Date"
                    value={ fecha_validez }
                  />
                </div>
              </div>

              <button
                  className="btn btn-info ml-2 mb-3"
                  onClick={ handleOpenModalDetalles }
                  // type="button"
                >
                  Agregar articulos
                  <i className="fas fa-plus ml-2"></i>
                </button>

              <div className="mb-3" id="tabla-articulos">
                {/* <label htmlFor="detalle" className="mb-3">Agregar articulos</label> */}
                
                <table className="table table-sm table-hover table-bordered">
                  <thead className="text-center">
                    <tr>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Articulo</th>
                      <th scope="col">Precio unitario</th>
                      <th scope="col">Importe</th>
                      <th scope="col">Opciones</th>
                    </tr>
                  </thead>

                  {
                    detalles.map( item => (
                      (item.cotizacion_id === id) ?
                      <tbody
                        className="text-center"
                        key={ item.id }
                      >
                        <tr>
                          <th>{ item.cantidad  }</th>
                          <td>{ articulos.filter( articulo => articulo.id === parseInt(item.articulo_id)).pop().nombre }</td>
                          <td>{ item.precio_unitario }</td>
                          <td>{ item.importe }</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={ () => handleDelete( item ) }
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Eliminar"

                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      :
                      null
                    ))
                  }
                    
                </table>
              </div>

              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-block btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <DetalleModal
        activeEvents={ activeDetalle }
        modalOpen={ detalleSelector.modalOpen }
        initState={ detalleDataModal }
      />
    </>
  )
}

export default CotizacionModal
