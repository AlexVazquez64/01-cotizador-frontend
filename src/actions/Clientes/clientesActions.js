// Clientes Actions \--- *_* ---/

import { types } from "../../types/types";

export const clientesOpenModal = () => ({
  type: types.clientesOpenModal
});

export const clientesCloseModal = () => ({
  type: types.clientesCloseModal
});

export const clientesSetActive = ( Event ) => ({
  type: types.clientesSetActive,
  payload: Event
});

export const clientesClearActive = () => ({
  type: types.clientesClearActive
});

export const clienteAddNew = ( Event ) => ({
  type: types.clienteAddNew,
  payload: Event
});

export const clienteUpdated = ( Event ) => ({
  type: types.clienteUpdated,
  payload: Event
});

export const clientesLoaded = ( Event ) => ({
  type: types.clientesLoaded,
  payload: Event
})

export const clienteDeleted = ( Event ) => ({
  type: types.clienteDeleted,
  payload: Event
});

