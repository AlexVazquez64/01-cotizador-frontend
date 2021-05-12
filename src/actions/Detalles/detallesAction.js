// Detalles Actions \--- *_* ---/

import { types } from "../../types/types";

export const detallesOpenModal = () => ({
  type: types.detallesOpenModal
});

export const detallesCloseModal = () => ({
  type: types.detallesCloseModal
});

export const detalleSetActive = ( Event ) => ({
  type: types.detalleSetActive,
  payload: Event
});

export const detalleClearActive = () => ({
  type: types.detalleClearActive
});

export const detalleAddNew = ( Event ) => ({
  type: types.detalleAddNew,
  payload: Event
});

export const detalleUpdated = ( Event ) => ({
  type: types.detalleUpdated,
  payload: Event
});

export const detalleLoaded = (events) => ({
  type: types.detalleLoaded,
  payload: events
})

export const detalleDeleted = ( Event ) => ({
  type: types.detalleDeleted,
  payload: Event
});

