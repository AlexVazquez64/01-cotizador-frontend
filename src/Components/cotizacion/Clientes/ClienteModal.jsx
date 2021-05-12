import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';

import {
  clientesClearActive,
  clientesCloseModal,
} from '../../../actions/Clientes/clientesActions';

import { customStyles } from '../../../helpers/center-modal-styles';
import useForm from '../../../hooks/useForm';

import '../../../styles/components/_modal.css';

import {
  clienteStartAddNew,
  clienteStartUpdate
} from '../../../actions/Clientes/clientes';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const ClienteModal = ( props ) => {

  const dispatch = useDispatch();

  const { activeCliente } = useSelector( state => state.cliente );

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
    rfc,
    email,
    telefono,
    contacto,
    direccion,
    telefono_contacto,
    descuento,
  } = formValues;

  useEffect(() => {

    ( activeCliente ) ? setValues( activeCliente ) : setValues( initState );

  }, [ activeCliente, setValues, initState ])

  const handleCloseModal = () => {
    reset();
    dispatch( clientesCloseModal() );
    dispatch( clientesClearActive() );
  }

  const handleSubmitForm = ( e ) => {
    e.preventDefault();

      if ( activeCliente ) {
        dispatch( clienteStartUpdate({
          ...formValues,
        }) );
      } else {
        dispatch( clienteStartAddNew({
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
          <h3 className="auth__title">{ ( activeCliente ) ? `Editar Cliente`  : `Nuevo Cliente` }</h3>
          <hr/>
          <form
            onSubmit={ handleSubmitForm }
            className="animate__animated animate__fadeIn animate__faster"
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
                <label htmlFor="rfc">RFC</label>
                <input
                  className="form-control"
                  name="rfc"
                  required
                  onChange={ handleInputChange }
                  placeholder="RFC"
                  type="text"
                  value={ rfc }
                />
              </div>

              <div className="col-md-4 ">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  name="email"
                  required
                  onChange={ handleInputChange }
                  placeholder="Email"
                  type="email"
                  value={ email }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  className="form-control"
                  name="telefono"
                  required
                  onChange={ handleInputChange }
                  placeholder="Teléfono"
                  type="phone"
                  value={ telefono }
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="direccion">Dirección</label>
              <input
                className="form-control"
                name="direccion"
                required
                onChange={ handleInputChange }
                placeholder="Dirección"
                type="text"
                value={ direccion }
              />
            </div>

            <div className="row mb-2">
              <div className="col-md-4 mb-2">
                <label htmlFor="contacto">Contacto</label>
                <input
                  className="form-control"
                  name="contacto"
                  required
                  onChange={ handleInputChange }
                  placeholder="Contacto"
                  type="text"
                  value={ contacto }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="telefonoContacto">Teléfono Contacto</label>
                <input
                  className="form-control"
                  name="telefono_contacto"
                  required
                  onChange={ handleInputChange }
                  placeholder="Teléfono Contacto"
                  type="phone"
                  value={ telefono_contacto }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="descuento">Descuento</label>
                <input
                  className="form-control"
                  name="descuento"
                  required
                  onChange={ handleInputChange }
                  placeholder="Descuento"
                  type="number"
                  
                  value={ descuento }
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

export default ClienteModal
