// Cotizaciones Actions \--- *_* ---/

import { types } from "../../types/types";

export const cotizacionesOpenModal = () => ({
  type: types.cotizacionesOpenModal
});

export const cotizacionesCloseModal = () => ({
  type: types.cotizacionesCloseModal
});

export const cotizacionSetActive = ( Event ) => ({
  type: types.cotizacionSetActive,
  payload: Event
});

export const cotizacionClearActive = () => ({
  type: types.cotizacionClearActive
});

export const cotizacionAddNew = ( Event ) => ({
  type: types.cotizacionAddNew,
  payload: Event
});

export const cotizacionUpdated = ( Event ) => ({
  type: types.cotizacionUpdated,
  payload: Event
});

export const cotizacionesLoaded = (events) => ({
  type: types.cotizacionesLoaded,
  payload: events
})

export const cotizacionDeleted = ( Event ) => ({
  type: types.cotizacionDeleted,
  payload: Event
});

