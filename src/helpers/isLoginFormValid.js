import validator from 'validator';

export const isLoginFormValid = ( email, password ) => {
    
  if ( !validator.isEmail(email) ) {
    // dispatch( setError( 'Email is not valid' ) );
    console.log('Email is not valid');
    return false;
  } else if ( password.length < 5 ) {
    // dispatch( setError( 'Password should be at least 6 characters and match each other' ) );
    return false;
  }

  return true;
}