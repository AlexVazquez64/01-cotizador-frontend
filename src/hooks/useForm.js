import { useState } from 'react';

const useForm = ( initialState = {} ) => {

  const [ values, setValues ] = useState( initialState );

  const reset = () => {
    setValues( initialState );
  }

  const handeInputChange = ({ target }) => {

    setValues({
      ...values,
      [ target.name ]: target.value,
      
    });

    console.log(values)
  };

  return [ values, handeInputChange, reset, setValues ];

};

export default useForm