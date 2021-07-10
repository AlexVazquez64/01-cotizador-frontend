import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchWithoutToken } from '../helpers/fetch';

export const startLogin = (email, password) => {
  return async (dispatch) => {

    const resp = await fetchWithoutToken('auth', {
      email,
      password
    }, 'POST');
    const body = await resp.json();

    if (body.ok) {

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      Swal.fire('Error', body.msg, 'error');
    }

  }
}

export const startRegister = (nombre, email, password) => {
  return async (dispatch) => {

    const resp = await fetchWithoutToken('auth/new', {
      nombre,
      email,
      password,
    }, 'POST');
    const body = await resp.json();

    if (body.ok) {

      console.log(body)

      dispatch(login({
        uid: body.id,
        nombre: body.nombre
      }))
    } else {
      Swal.fire('Error', body.msg, 'error');
    }

  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
});


export const startLogout = () => {
  return (dispatch) => {

    dispatch(logout());
  }
}

const logout = () => ({
  type: types.authLogout
})