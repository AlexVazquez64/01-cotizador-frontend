import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';

import {
  detalleClearActive,
  detallesCloseModal,
} from '../../../actions/Detalles/detallesAction';

import { cotizacionSetActive } from '../../../actions/Cotizaciones/cotizacionesActions';

import {
  detalleStartAddNew,
  detalleStartUpdate
} from '../../../actions/Detalles/detalles';

import { customStyles } from '../../../helpers/center-modal-styles';

import useForm from '../../../hooks/useForm';

import '../../../styles/components/_modal.css';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const DetalleModal = ( props ) => {

  const dispatch = useDispatch();

  const {
    detalles,
    activeDetalle
  } = useSelector( state => state.detalles );

  const { activeCotizacion, cotizaciones } = useSelector( state => state.cotizaciones );
  
  let lastCotizacion = cotizaciones.map( ( item ) => item ).pop()

  const { articulos } = useSelector( state => state.articulos );

  const lastID = detalles.map( ( item ) => item.id ).pop();

  const {
    modalOpen,
    initState
  } = props;

  const [
    formValues,
    handleInputChange,
    reset,
    setValues
  ] = useForm( initState );

  let {
    cotizacion_id,
    articulo_id,
    cantidad,
    precio_unitario,
    importe,
  } = formValues;

  if ( activeCotizacion ) {
    cotizacion_id = activeCotizacion?.id
    lastCotizacion = cotizaciones.filter( item => item.id === parseInt(activeCotizacion?.id)).pop()
  } else {
    cotizacion_id = lastCotizacion?.id
  }

  const detalleArticulo = articulos.filter( item => item.id === parseInt(articulo_id)).pop()

  if( detalleArticulo ) {
    precio_unitario = detalleArticulo.precio_unitario;
    importe = detalleArticulo.precio_unitario * cantidad;
  }

  useEffect(() => {

    // dispatch( articuloStartLoading() );
    // dispatch( cotizacionSetActive( lastCotizacion ) );
    // dispatch ( detalleStartLoading() );
    ( activeDetalle ) ? setValues( activeDetalle ) : setValues( initState );

  }, [ activeDetalle, setValues, initState, dispatch ])

  const handleCloseModal = () => {
    reset();
    dispatch( detallesCloseModal() );
    dispatch( detalleClearActive() );
  }

  const handleSubmitForm = ( e ) => {
    e.preventDefault();
    
    
    if ( activeDetalle ) {
      dispatch( detalleStartUpdate({
        ...formValues,
      }) );
    } else {
      dispatch( detalleStartAddNew({
        ...formValues,
        id: lastID + 1,
        cotizacion_id,
        cantidad,
        precio_unitario,
        importe
      }) );
    }

    dispatch( cotizacionSetActive( lastCotizacion ) );

    

    handleCloseModal();
  }

  // const handleOnClickGuardar = () => {
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     text: 'Se ha guardado con éxito',
  //     showConfirmButton: true,
  //   });
  // }
  

  return (
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
          <h3 className="auth__title">{ ( activeDetalle ) ? `Editar articulos`  : `Agregar articulos` }</h3>
          <hr/>
          <form
            onSubmit={ handleSubmitForm }
            className="animate__animated animate__fadeIn animate__faster"
          >

            <div className="mb-2">
              <label htmlFor="articulo_id">Articulo</label>
              <select
                className="form-control"
                defaultValue={ articulo_id }
                id="articulo_id"
                name="articulo_id"
                onChange={ handleInputChange }
                type="number"
              >
                <option defaultValue style={{ display: 'none' }}>
                { ( activeDetalle ) ? `${ activeDetalle.articulo }`  : `Selecciona el articulo` }
                </option>

                {
                  articulos.map( ( item ) => (
                    
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

            <div className="row mb-2">
              <div className="col-md-4">
              <label htmlFor="cantidad">Cantidad</label>
                <input
                  className="form-control"
                  name="cantidad"
                  required
                  onChange={ handleInputChange }
                  placeholder="Cantidad"
                  type="number"
                  value={ cantidad }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="precio_unitario">Precio unitario</label>
                <input
                  className="form-control"
                  id="articulo"
                  name="articulo"
                  readOnly
                  value={ precio_unitario }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="importe">Importe</label>
                <input
                  className="form-control"
                  name="importe"
                  onChange={ handleInputChange }
                  type="Number"
                  value={ importe }
                  readOnly
                />
              </div>
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
  )
}

export default DetalleModal
