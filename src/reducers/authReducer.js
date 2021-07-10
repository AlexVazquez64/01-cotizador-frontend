import { types } from "../types/types";


const initialState = {
  checking: true,
  isAutenticated: false,
  // name: null
}

export const authReducer = ( state = initialState, action ) => {

  switch ( action.type ) {

    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
        isAutenticated: true
      }

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false
      }

    case types.authLogout:
      return {
        checking: false,
        isAutenticated: false
      }

    default:
      return state;
  }

}