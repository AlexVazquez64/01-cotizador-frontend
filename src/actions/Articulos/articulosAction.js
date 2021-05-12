// Articulos Actions \--- *_* ---/

import { types } from "../../types/types";

export const articulosOpenModal = () => ({
  type: types.articulosOpenModal
});

export const articulosCloseModal = () => ({
  type: types.articulosCloseModal
});

export const articuloSetActive = ( Event ) => ({
  type: types.articulosSetActive,
  payload: Event
});

export const articulosClearActive = () => ({
  type: types.articulosClearActive
});

export const articuloAddNew = ( Event ) => ({
  type: types.articuloAddNew,
  payload: Event
});

export const articuloUpdated = ( Event ) => ({
  type: types.articuloUpdated,
  payload: Event
});

export const articulosLoaded = (events) => ({
  type: types.articulosLoaded,
  payload: events
})

export const articuloDeleted = ( Event ) => ({
  type: types.articuloDeleted,
  payload: Event
});

