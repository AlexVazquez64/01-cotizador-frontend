import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';

import {
  articulosClearActive,
  articulosCloseModal,
} from '../../../actions/Articulos/articulosAction';

import {
  articuloStartAddNew,
  articuloStartUpdate
} from '../../../actions/Articulos/articulos';

import useForm from '../../../hooks/useForm';

import { customStyles } from '../../../helpers/center-modal-styles';

import '../../../styles/components/_modal.css';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const ArticulosModal = ( props ) => {

  const dispatch = useDispatch();

  const { activeArticulo } = useSelector( state => state.articulos );

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

  const {
    nombre,
    descripcion,
    unidad_venta,
    tipo_articulo,
    precio_unitario,
    costo,
  } = formValues;

  useEffect(() => {

    ( activeArticulo ) ? setValues( activeArticulo ) : setValues( initState );

  }, [ activeArticulo, setValues, initState ])

  const handleCloseModal = () => {
    reset();
    dispatch( articulosCloseModal() );
    dispatch( articulosClearActive() );
  }

  const handleSubmitForm = ( e ) => {
    e.preventDefault();
    if ( activeArticulo ) {
      dispatch( articuloStartUpdate({
        ...formValues,
      }) );
    } else {
      console.log(formValues);
      dispatch( articuloStartAddNew({
        ...formValues,
        // id: new Date().getTime(),
      }) );
    }
    handleCloseModal();
  }

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
          <h3 className="auth__title">{ ( activeArticulo ) ? `Editar articulo`  : `Nuevo articulo` }</h3>
          <hr/>
          <form
            autoComplete="off"
            className="animate__animated animate__fadeIn animate__faster"
            onSubmit={ handleSubmitForm }
          >
            <div className="mb-2">
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                name="nombre"
                required
                onChange={ handleInputChange }
                placeholder="Nombre"
                type="text"
                value={ nombre }
              />
            </div>

            <div className="row mb-2">
              <div className="col-md-4 ">
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

              <div className="col-md-4 ">
                <label htmlFor="unidad_venta">Unidad de Venta</label>
                <select
                  className="form-control"
                  id="unidad_venta"
                  name="unidad_venta"
                  onChange={ handleInputChange }
                  defaultValue={ unidad_venta }
                >
                  <option defaultValue style={{ display: 'none' }}>
                    { `Selecciona la unidad de venta` }
                  </option>
                  <option value="each">each</option>
                  <option value="h">h</option>
                  <option value="kg">kg</option>
                  <option value="l">l</option>
                  <option value="m2">m2</option>
                  <option value="pzs">pzs</option>
                  
                </select>

              </div>

              <div className="col-md-4">
                <label htmlFor="tipo_articulo">Tipo de artículo</label>
                <select 
                  className="form-control"
                  id="tipo_articulo"
                  name="tipo_articulo"
                  onChange={ handleInputChange }
                  defaultValue={ tipo_articulo }
                >
                  <option defaultValue style={{ display: 'none' }}>
                    { `Selecciona el tipo de articulo` }
                  </option>
                  <option value="Trabajo">Trabajo</option>
                  <option value="Material">Material</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 mb-2">
                <label htmlFor="precio_unitario">Precio unitario</label>
                <input
                  className="form-control"
                  name="precio_unitario"
                  required
                  onChange={ handleInputChange }
                  placeholder="Precio unitario"
                  type="number"
                  value={ precio_unitario }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="costo">Costo</label>
                <input
                  className="form-control"
                  name="costo"
                  required
                  onChange={ handleInputChange }
                  placeholder="Costo"
                  type="number"
                  value={ costo }
                />
              </div>
            </div>

            <div className="d-grid gap-2 mt-3">
              <input
                type="submit"
                className="btn btn-block btn-primary"
                value="Guardar"
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default ArticulosModal
