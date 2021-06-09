import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';

// Actions de las cotizaciones

import {
  cotizacionClearActive,
  cotizacionesCloseModal,
} from '../../../actions/Cotizaciones/cotizacionesActions'

import {
  cotizacionStartAddNew,
  cotizacionStartUpdate,
  sendMailPDFStart
} from '../../../actions/Cotizaciones/cotizaciones'

// FIN Actions de las cotizaciones

import { clienteStartLoading } from '../../../actions/Clientes/clientes'

// Actions del detalle

import { detallesOpenModal } from '../../../actions/Detalles/detallesAction'

import {
  detalleStartDelete,
  detalleStartLoading
} from '../../../actions/Detalles/detalles'

import DetalleModal from '../Detalles/DetalleModal'

import { clientesDataModal, detalleDataModal } from '../../../helpers/dataTables'

// FIN Actions del detalle

import useForm from '../../../hooks/useForm'

import { customStyles } from '../../../helpers/center-modal-styles'

import '../../../styles/components/_modal.css'
import '../../../styles/components/cotizaciones.css'
import { showSwalSuccess } from '../../../helpers/showSwalSuccess'

import { clientesOpenModal } from '../../../actions/Clientes/clientesActions'
import ClienteModal from '../Clientes/ClienteModal'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const CotizacionModal = ( props ) => {

  const dispatch = useDispatch();

  const {
    activeCotizacion,
    cotizaciones
  } = useSelector( state => state.cotizaciones )

  let {
    clientes,
    modalOpenCliente,
    activeCliente
  } = useSelector( state => state.cliente )

  const {
    activeDetalle,
    detalles
  } = useSelector( state => state.detalles )

  const detalleSelector = useSelector( ( state ) => state.detalles )

  const lastFolio = cotizaciones.map( ( item ) => item.folio ).pop()

  const folioRef = useRef();

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
    folio,
    cliente_id,
    descripcion,
    fecha_validez,
  } = formValues;

  const clienteId = useRef(null);

  console.log(formValues);

  if (cotizaciones.length === 0) {
    folio += 1;
  } else if ( cotizaciones.length > 0 && activeCotizacion === null ) {
    folio = lastFolio + 1
  } else {
    folio = activeCotizacion.folio
  }

  const { articulos } = useSelector( state => state.articulos )
  console.log(clientes);

  const cliente = clientes.map((item, index) => item.nombre);
  console.log(cliente);

  const clienteNombreActive = clientes.filter(cli => cli.id === cliente_id )

  console.log(clienteNombreActive);

  const clienteNombre = clienteNombreActive.map( item => item.nombre  )
  console.log(clienteNombre);

  useEffect(() => {
    dispatch( clienteStartLoading() );
    ( activeCotizacion ) ? setValues( activeCotizacion ) : setValues( initState );
  }, [ activeCotizacion, setValues, initState, dispatch ])

  const handleOpenModalDetalles = () => {
    dispatch( detallesOpenModal() )
    console.log('Entro a openModalDetalles')
  }

  const handleOpenModalClientes = () => {
    dispatch( clientesOpenModal() )
  }

  const handleSendMailPDF = ( e ) => {
    dispatch( sendMailPDFStart( e ) );
  }

  const handleInputChangeCliente = () => {
    cliente_id = clienteId.current.id;
    formValues.cliente_id = clienteId.current.id
    // console.log(clienteId.current.id);
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
      
    } else if ( lastFolio ) {
      dispatch( cotizacionStartAddNew({
        ...formValues,
        folio: lastFolio + 1
      }) );
    } else {
      dispatch( cotizacionStartAddNew({
        ...formValues,
        folio
      }) );
    }
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
              autoComplete='off'
              className="animate__animated animate__fadeIn animate__faster"
              onSubmit={ handleSubmitForm }
            >
              <div className="mb-2">
                <label htmlFor="folio">Folio</label>
                <input
                  className="form-control"
                  id="folio"
                  name="folio"
                  readOnly
                  ref={ folioRef }
                  type="text"
                  onChange={ () => handleInputChange }
                  value={ folio }
                />
              </div>

              <div className="mb-2">
                <label htmlFor="cliente_id">Cliente</label>
                <button
                  className="btn btn-sm btn-success ml-3"
                  onClick={ handleOpenModalClientes }
                  type='button'
                >
                  Nuevo Cliente
                  <i className="fas fa-plus ml-2"></i>
                </button>

                {/* <select
                  className="form-control"
                  id="cliente_id"
                  name="cliente_id"
                  onChange={ handleInputChange }
                  defaultValue={ cliente_id }
                  disabled={ ( activeCotizacion ) ? true : false }
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
                </select> */}

                <input
                  // defaultValue={ cliente_id }
                  disabled={ ( activeCotizacion ) ? true : false }
                  className="form-control"
                  list="cliente_id"
                  name="cliente_id"
                  onChange={ handleInputChangeCliente }
                  placeholder='Selecciona la empresa'
                  value={ clienteNombre }
                />
                
                <datalist id="cliente_id">
                  <option defaultValue style={{ display: 'none' }}>
                    { ( activeCotizacion ) ? `${ clienteNombre.nombre }`  : `Selecciona el cliente` }
                  </option>
                  {
                    
                    clientes.map( ( item ) => (
                      <option
                        key={ item.id }
                        ref={ clienteId }
                        value={item.nombre}
                        id={ item.id }
                      >
                        { item.nombre }
                      </option>
                    ))
                  }
                </datalist>
                
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
              >
                Agregar articulos
                <i className="fas fa-plus ml-2"></i>
              </button>

              <div className="mb-3" id="tabla-articulos">
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
                      ( item.cotizacion_id === activeCotizacion?.id ) ?
                      <tbody
                        className="text-center"
                        key={ item.id }
                      >
                        <tr>
                          <th>{ item.cantidad }</th>
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

              <div className="row">
                <div className="col-3">
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                      disabled={ ( activeCotizacion ) ? false : true }
                      onClick={() => {
                        showSwalSuccess( 'Se ha guardado correctamente' );
                        handleCloseModal();
                      }}
                    >
                      Guardar
                    </button>
                  </div>
                </div>

                <div className="col-3">
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-dark"
                      disabled={ ( activeCotizacion ) ? false : true }
                      onClick={() => {
                        showSwalSuccess( 'Se ha guardado correctamente' );
                        handleCloseModal();
                        handleSendMailPDF(formValues)
                      }}
                    >
                      Guardar y enviar
                    </button>
                  </div>
                </div>

                <div className="col-3"></div>

                <div className="col-3">
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-block btn-danger"
                      onClick={ handleCloseModal }
                    >
                      Salir
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <ClienteModal
        activeEvents={ activeCliente }
        modalOpen={ modalOpenCliente }
        initState={ clientesDataModal }
      />

      <DetalleModal
        activeEvents={ activeDetalle }
        modalOpen={ detalleSelector.modalOpen }
        initState={ detalleDataModal }
      />
    </>
  )
}

export default CotizacionModal
