import validator from 'validator';
import { showSwalError } from './showSwalError';

export const isRegisterFormValid = ( name, email, password, password2 ) => {
    
  if ( name.trim().length === 0 ) {
    // dispatch( setError( 'Name is required' ) );
    showSwalError( 'Name is required' );
    return false;
  } else if ( !validator.isEmail(email) ) {
    // dispatch( setError( 'Email is not valid' ) );
    showSwalError( 'Email is not valid' );
    return false;
  } else if ( password !== password2 || password.length < 5 ) {
    // dispatch( setError( 'Password should be at least 6 characters and match each other' ) );
    showSwalError( 'Password should be at least 6 characters and match each other' );
    return false;
  }

  return true;
}