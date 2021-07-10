import { useState } from 'react';

const useForm = ( initialState = {} ) => {

  const [ values, setValues ] = useState( initialState );

  const reset = () => {
    setValues( initialState );
  }

  const handeInputChange = ({ target }) => {


    console.log(target.value)
    // (target.name === 'cliente_id') ? console.log('Si es cliente_id') : console.log('no es cliente_id')

    setValues({
      ...values,
      [ target.name ]: target.value,
    });
  };

  return [ values, handeInputChange, reset, setValues ];

};

export default useForm