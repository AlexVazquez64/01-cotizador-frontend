import React from 'react';
import { useDispatch } from 'react-redux';

import useForm from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';
import { isLoginFormValid } from '../../helpers/isLoginFormValid';
import { isRegisterFormValid } from '../../helpers/isRegisterFormValid';

import './login.css';

const LoginScreen = () => {

  const dispatch = useDispatch();

  const [ formLoginValues, handleLoginInputChange ] = useForm({
    lEmail: 'ricardo@outlook.com',
    lPassword: '123456'
  });

  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = ( e ) => {
    e.preventDefault();

    isLoginFormValid( lEmail, lPassword ) && 
      dispatch( startLogin( lEmail, lPassword ) );
  }

  const [ formRegisterValues, handleRegisterInputChange ] = useForm({
    rName: 'Ricardo',
    rEmail: 'ricardo@outlook.com',
    rPassword1: '123456',
    rPassword2: '123456',
    
  });

  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleRgister = ( e ) => {
    e.preventDefault();

    isRegisterFormValid( rName, rEmail, rPassword1, rPassword2 ) && 
      dispatch( startRegister( rName, rEmail, rPassword1 ) );
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={ handleLogin }>
            <div className="mb-3">
              <input
                className="form-control"
                name="lEmail"
                required
                onChange={ handleLoginInputChange }
                placeholder="Correo"
                type="email"
                value={ lEmail }
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="lPassword"
                required
                onChange={ handleLoginInputChange }
                placeholder="Contraseña"
                type="password"
                value={ lPassword }
              />
            </div>
            <div className="mb-3">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={ handleRgister }>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                onChange={ handleRegisterInputChange }
                value={ rName }
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                onChange={ handleRegisterInputChange }
                value={ rEmail }
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword1"
                onChange={ handleRegisterInputChange }
                value={ rPassword1 }
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                onChange={ handleRegisterInputChange }
                value={ rPassword2 }
              />
            </div>

            <div className="mb-3">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen